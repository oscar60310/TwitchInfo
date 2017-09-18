import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { JsonpModule, Jsonp, Response } from '@angular/http';

@Injectable()
export class WeatherService {
  private cityList = [{
    Name: '臺中',
    Code: '1668399'
  }, {
    Name: '高雄',
    Code: '1673820'
  }, {
    Name: '臺北',
    Code: '1668341'
  }, {
    Name: '桃園',
    Code: '6696918'
  }, {
    Name: '臺南',
    Code: '1668352'
  }, {
    Name: '彰化',
    Code: '1672557'
  }, {
    Name: '屏東',
    Code: '1670479'
  }, {
    Name: '雲林',
    Code: '1665194'
  }, {
    Name: '苗栗',
    Code: '1671971'
  }, {
    Name: '新竹',
    Code: '1675107'
  }, {
    Name: '嘉義',
    Code: '1678836'
  }, {
    Name: '南投',
    Code: '1671564'
  }, {
    Name: '宜蘭',
    Code: '1674199'
  }, {
    Name: '基隆',
    Code: '6724654'
  }, {
    Name: '花蓮',
    Code: '1674502'
  }];
  constructor(private jsonp: Jsonp) { }
  getWeather(key: string) {
    return new Promise<any>((resolve, reject) => {
      let ids = '';
      this.cityList.forEach(c => ids += c.Code + ',');
      ids = ids.slice(0, ids.length - 1);
      this.jsonp.get(`https://api.openweathermap.org/data/2.5/group?lang=zh_tw&id=${ids}&appid=${key}&units=metric&callback=JSONP_CALLBACK`)
        .subscribe(d => {
          resolve(this.recordToData(d['_body']));
        });
    });
  }
  private recordToData(record) {
    const d = record.list;
    const c = [];
    d.forEach(w => {
      const temp = { city: '', des: '', wcode: '0', humidity: 0, temp: 0 };
      temp.city = this.cityList[this.cityList.findIndex(x => x.Code === w.id.toString())].Name;
      temp.temp = Math.floor(w.main.temp);
      temp.humidity = w.main.humidity;
      temp.des = w.weather[0].description;
      temp.wcode = this.weathicon(w.weather[0].icon);
      c.push(temp);
    });
    return c;
  }
  private weathicon(id) {
    switch (id) {
      case '01d': return 'day';
      case '01n': return 'night';
      case '02d': return 'cloudy-day-1';
      case '02n': return 'cloudy-night-1';
      case '03d': return 'cloudy-day-1';
      case '03n': return 'cloudy-night-1';
      case '04d': return 'cloudy';
      case '04n': return 'cloudy';
      case '09d': return 'rainy-1';
      case '09n': return 'rainy-1';
      case '10d': return 'rainy-4';
      case '10n': return 'rainy-4';
      case '11d': return 'thunder';
      case '11n': return 'thunder';
    }
    return 'day';
  }
}
