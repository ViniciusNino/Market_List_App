import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  private API_URL = 'https://localhost:5001/'
  constructor(public http: Http) { }
  post(data, url) {
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL + url, data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }
}
