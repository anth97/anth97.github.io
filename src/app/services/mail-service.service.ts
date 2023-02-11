import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailServiceService {

  constructor(
    private http: HttpClient
  ) { }

  public sendMail(object: any) {
    return this.http.post('http://44.204.110.255/send/', object, {
      headers:{
        'Access-Control-Allow-Origin': '*',
      }
    })
  }

}
