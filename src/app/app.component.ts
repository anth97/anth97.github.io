import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public translate: TranslateService,
    private http: HttpClient
  ) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
    translate.use('en');
    console.log(translate.currentLang);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  downloadFile() {
    console.log(this.translate.currentLang == 'en');
    if (this.translate.currentLang == 'en') {
      this.downloadFileEn();
      return;
    }
    this.downloadFileEs();
  }

  downloadFileEn() {
    this.http.get('assets/Resume-En.pdf', { responseType: 'blob' })
      .subscribe(res => {
        saveAs(res, 'Resume-En.pdf');
      });
  }

  downloadFileEs() {
    this.http.get('assets/Resume-Es.pdf', { responseType: 'blob' })
      .subscribe(res => {
        saveAs(res, 'Resume-Es.pdf');
      });
  }
}



/* <!-- <nav class="navbar navbar-dark bg-primary">
  <div class="container">
    <a class="navbar-brand">
      {{'Sitetitle' | translate }}
    </a>
    <span class="form-inline">
      <select class="form-control" #selectedLang (change)="switchLang(selectedLang.value)">
        <option *ngFor="let language of translate.getLangs()" [value]="language"
          [selected]="language === translate.currentLang">
          {{ language }}
        </option>
      </select>
    </span>
  </div>
</nav>

<div class="container">
  <form>

    <div class="form-group">
      <label>{{'Name' | translate}}</label>
      <input type="text" class="form-control">
      <small class="text-danger">{{'NameError' | translate}}</small>
    </div>

    <div class="form-group">
      <label>{{'Email' | translate}}</label>
      <input type="email" class="form-control">
    </div>

    <div class="form-group">
      <label>{{'PhoneNo' | translate}}</label>
      <input type="tel" class="form-control">
    </div>

    <div class="form-group">
      <label>{{'Password' | translate}}</label>
      <input type="password" class="form-control">
    </div>

    <div class="form-group">
      <label>{{'Bio' | translate}}</label>
      <textarea rows="3" class="form-control"></textarea>
    </div>

    <div class="form-group form-check">
      <input type="checkbox" class="form-check-input">
      <label class="form-check-label">{{'TermsConditions' | translate}}</label>
    </div>

    <button type="submit" class="btn btn-block btn-danger">{{'Submit' | translate}}</button>
  </form>
</div> --> */
