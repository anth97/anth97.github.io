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
    return this.http.post('https://back.anth97.com/send/', object, {
      headers:{
        'Access-Control-Allow-Origin': '*',
      }
    })
  }

}
