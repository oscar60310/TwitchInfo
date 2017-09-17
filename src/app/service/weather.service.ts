import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) { }
  getWeather(key: string) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`, {
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
