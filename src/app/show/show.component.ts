import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ti-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass']
})
export class ShowComponent implements OnInit {
  setting: any;
  data = {
    twitchName: '',
    time: '2017/09/09 12:33:44'
  };
  constructor(private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(t => {
        this.setting = JSON.parse(atob(t['params'].token));
        this.data.twitchName = this.setting.name;
      });
    this.getTime();
  }
  getTime(): void {
    const now = new Date();
    this.data.time = `${now.toLocaleDateString()} ${now.toTimeString().split(' ')[0]}`;
    setTimeout(this.getTime.bind(this), 1000);
  }
}
