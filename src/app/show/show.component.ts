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
        transition(':leave', [
          style({ opacity: 1 }),
          animate('300ms', style({ opacity: 0 })),
        ])
      ]
    )
  ]
})
export class ShowComponent implements OnInit {
  setting: any;
  data = {
    twitchName: '',
    time: '2017/09/09 12:33:44',
    openTime: 0, // 開台時間
    openTimeMin: 0, // 開台多久
    game: '',
  };
  clock = 0;
  constructor(
    private route: ActivatedRoute,
    private twitch: TwitchService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(t => {
        this.setting = JSON.parse(atob(t['params'].token));
        this.data.twitchName = this.setting.name;
      });
    this.getTime();
    this.getGame();
  }
  getTime(): void {
    const now = new Date();
    this.data.time = `${now.toLocaleDateString()} ${now.toTimeString().split(' ')[0]}`;
    this.data.openTimeMin = Math.floor(((new Date()).getTime() - this.data.openTime) / 1000 / 60);
    if (this.clock >= 100) {
      this.clock = 0;
    } else {
      this.clock += 1;
    }
    setTimeout(this.getTime.bind(this), 1000);
  }
  async getGame() {
    const stream = await this.twitch.getStreamDetail(this.setting);
    if (stream == null) {
      this.data.game = '尚未直播';
    } else {
      this.data.game = stream.game;
      this.data.openTime = await this.twitch.getOpenTime(this.setting);
    }
    setTimeout(this.getGame.bind(this), 1000 * 60 * 5);
  }
}
