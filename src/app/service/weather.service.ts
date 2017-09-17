import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) { }
  getWeather(key: string) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001`, {
        headers: new HttpHeaders().set('Authorization', key)
      }).subscribe(d => {
        if (d['success']) {
          resolve(this.recordToData(d['records']));
        } else {
          reject();
        }
      });
    });
  }
  private recordToData(record) {
    const d = record.location;
    const c = [];
    d.forEach(w => {
      const temp = { city: '', des: '', wcode: '0', rain: 0, temp: 0 };
      temp.city = w.locationName;
      w.weatherElement.forEach(ele => {
        if (ele.elementName === 'Wx') {
          temp.des = ele.time[0].parameter.parameterName;
          temp.wcode = ele.time[0].parameter.parameterValue;
        } else if (ele.elementName === 'PoP') {
          temp.rain = ele.time[0].parameter.parameterName;
        } else if (ele.elementName === 'MinT' || ele.elementName === 'MaxT') {
          temp.temp += ele.time[0].parameter.parameterName / 2;
        }
      });
      c.push(temp);
    });
    return c;
  }
}
