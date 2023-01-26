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
    return this.http.post('http://localhost:3000/send', object)
  }

}
