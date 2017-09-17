import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable()
export class TwitchService {
  /** API endpoint */
  private ap = 'https://api.twitch.tv/kraken';
  constructor(private http: HttpClient) { }
  getTwitchId(setting: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`https://api.twitch.tv/helix/users`, {
        params: new HttpParams().set('login', setting.name.toLocaleLowerCase()),
        headers: new HttpHeaders().set('Client-ID', setting.twitchId),
      }).subscribe(d => {
        if (d['data'].length === 0) {
          reject();
        } else {
          resolve(d['data'][0]['id']);
        }
      });
    });
  }
  getStreamDetail(setting: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${this.ap}/streams/${setting.name.toLocaleLowerCase()}`, {
        headers: new HttpHeaders().set('Client-ID', setting.twitchId),
      }).subscribe(d => {
        resolve(d['stream']);
      });
    });
  }
  getOpenTime(setting: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`https://api.twitch.tv/helix/streams`, {
        params: new HttpParams().set('user_login', setting.name.toLocaleLowerCase()),
        headers: new HttpHeaders().set('Client-ID', setting.twitchId),
      }).subscribe(d => {
        if (d['data'] == null) {
          resolve(0);
        } else {
          const openTime = new Date(d['data'][0]['started_at']);
          resolve(openTime.getTime());
        }
      });
    });
  }
  getLastFollow(setting: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`https://api.twitch.tv/helix/users/follows`, {
        params: new HttpParams()
          .set('to_id', setting.id)
          .set('first', '1'),
        headers: new HttpHeaders().set('Client-ID', setting.twitchId),
      }).subscribe(d => {
        if (d['data'] == null) {
          resolve('');
        } else {
          resolve(this.getUserName(d['data'][0]['from_id'], setting));
        }
      });
    });
  }
  getUserName(id: string, setting: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`https://api.twitch.tv/helix/users`, {
        params: new HttpParams().set('id', id),
        headers: new HttpHeaders().set('Client-ID', setting.twitchId),
      }).subscribe(d => {
        if (d['data'] == null) {
          resolve('');
        } else {
          resolve(d['data'][0]['display_name']);
        }
      });
    });
  }
}
