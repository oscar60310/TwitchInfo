import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { TwitchService } from '../service/twitch.service';
import { WeatherService } from '../service/weather.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ti-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass'],
  animations: [
    trigger(
      'moveInOut', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('300ms', style({ opacity: 1 })),
        ]),
      ]
    ),
    trigger(
      'moveRight', [
        transition(':enter', [
          style({ transform: 'translateX(-50%)' }),
          animate(300)
        ]),
      ]
    )
  ]
})
export class ShowComponent implements OnInit {
  setting: any;
  info = 2;
  data = {
    id: '',
    twitchName: '',
    time: '2017/09/09 12:33:44',
    openTime: 0, // 開台時間
    openTimeMin: 0, // 開台多久
    game: '',
    title: '',
    followers: 0,
    viewers: 0,
    lastFollow: '',
    weather: {
      deg: 0,
      humidity: 0,
      city: '',
      des: '',
      type: 'sun'
    },
    cwb: '',
  };
  weathers;
  weatherShow = false;
  streaming = false;
  clock = 0;
  constructor(
    private route: ActivatedRoute,
    private twitch: TwitchService,
    private weather: WeatherService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(t => {
        this.setting = JSON.parse(atob(t['params'].token));
        this.data.twitchName = this.setting.name;
        this.data.cwb = this.setting.CWB;
        this.data.id = this.setting.id;
      });
    this.getTime();
    this.getGame();
    this.getWeather();
  }
  getTime(): void {
    const now = new Date();
    this.data.time = `${now.toLocaleDateString()} ${now.toTimeString().split(' ')[0]}`;
    this.data.openTimeMin = Math.floor(((new Date()).getTime() - this.data.openTime) / 1000 / 60);
    if (this.streaming) {
      if (this.clock >= 100) {
        this.clock = 0;
      } else {
        this.clock += 1;
      }
    } else {
      this.clock = 0;
    }


    const tick = this.clock % 20;
    if (tick < 5) {
      this.info = 0;
    } else if (tick < 10) {
      this.info = 1;
    } else if (tick < 15) {
      this.info = 2;
    } else if (tick < 20) {
      this.info = 3;
    }
    setTimeout(this.getTime.bind(this), 1000);
  }
  async getGame() {
    const stream = await this.twitch.getStreamDetail(this.setting);
    if (stream == null) {
      this.data.game = '尚未直播';
      this.streaming = false;
    } else {
      this.streaming = true;
      this.data.followers = stream.channel.followers;
      this.data.title = stream.channel.status;
      this.data.viewers = stream.viewers;
      this.data.game = stream.game;
      this.data.openTime = await this.twitch.getOpenTime(this.setting);
      this.data.lastFollow = await this.twitch.getLastFollow(this.setting);
    }
    setTimeout(this.getGame.bind(this), 1000 * 60 * 5);
  }
  async getWeather() {
    this.weathers = await this.weather.getWeather(this.data.cwb);
    if (this.weathers.length > 0) {
      this.changeWeather(0);
    }

  }
  changeWeather(n) {
    this.weatherShow = false;
    setTimeout(() => {
      this.data.weather.city = this.weathers[n].city;
      this.data.weather.deg = this.weathers[n].temp;
      this.data.weather.des = this.weathers[n].des;
      this.data.weather.humidity = this.weathers[n].humidity;
      this.data.weather.type = this.weathers[n].wcode;

      this.weatherShow = true;
      if (n + 1 < this.weathers.length) {
        setTimeout(this.changeWeather.bind(this), 5000, ++n);
      } else {
        setTimeout(this.changeWeather.bind(this), 5000, 0);
      }
    }, 0);

  }
}
