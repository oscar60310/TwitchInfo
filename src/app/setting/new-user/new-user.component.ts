import { Component, OnInit } from '@angular/core';
import { TwitchService } from '../../service/twitch.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.sass']
})
export class NewUserComponent implements OnInit {
  /** user input */
  data = {
    name: '',
    twitchId: 'bfntqd4o0odvq9c4inycycoy4ku4kaf',
    CWB: '',
    id: '',
  };
  url = '';
  constructor(private twitch: TwitchService) { }

  ngOnInit() {
  }
  async onSubmit() {
    try {
      this.data.id = await this.twitch.getTwitchId(this.data);
      console.log(this.data);
      const b64 = btoa(JSON.stringify(this.data));
      this.url = `${window.location.protocol}//${window.location.host}${window.location.pathname}#/show/${b64}`;
    } catch (e) {

    }

  }

}
