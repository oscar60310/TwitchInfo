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
    url: ''
  };
  constructor(private twitch: TwitchService) { }

  ngOnInit() {
  }
  async onSubmit() {
    try {
      const id = await this.twitch.nameToId(this.data.name, this.data.twitchId);
      this.data.url = id;
    } catch (e) {

    }

  }

}
