import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable()
export class TwitchService {
  /** API endpoint */
  private ap = 'https://api.twitch.tv/helix';
  constructor(private http: HttpClient) { }
  getProfileByName(name: string, app: string): Promise<any> {
    return new Promise<string>((resolve, reject) => {
      this.http.get(`${this.ap}/users`, {
        params: new HttpParams().set('login', name),
        headers: new HttpHeaders().set('Client-ID', app),
      }).subscribe(d => {
        resolve(d['data'][0]);
      });
    });
  }
}
