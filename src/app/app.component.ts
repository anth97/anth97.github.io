import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { saveAs } from 'file-saver';
import { MailServiceService } from './services/mail-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public translate: TranslateService,
    private http: HttpClient,
    private mailServiceService: MailServiceService,
    private formBuilder: FormBuilder,
  ) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
    translate.use('es');
  }

  public form = this.formBuilder.group({
    from: ['', Validators.required], //alias name
    subject: ['', Validators.required], //alias subject
    text: ['', [Validators.required, Validators.email]], //alias email
    html: ['', Validators.required],  //alias message
    captcha: ['']
  })

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

  sendMail() {
    if (this.form.invalid) {
      if (this.translate.currentLang == 'en') {
        alert('Please fill all the fields correctly');
        return
      }
      alert('Por favor llene todos los campos correctamente');
      return;
    }

    if (this.form.controls.captcha.value == '') {
      if (this.translate.currentLang == 'en') {
        alert('Please verify that you are not a robot');
        return
      }
      alert('Por favor verifique que no es un robot');
      return;
    }
    const data = {
      from: this.form.controls.from.value,
      subject: this.form.controls.subject.value,
      text: this.form.controls.text.value,
      html: `<p>From: ${this.form.controls.from.value}</p>
      <p>Email: ${this.form.controls.text.value}</p>
      <p>Message: ${this.form.controls.html.value}</p>`,
      captcha: this.form.controls.captcha.value
    }
    this.mailServiceService.sendMail(data).subscribe(() => {
      this.form.reset();
      if (this.translate.currentLang == 'en') {
        alert('Mail sent successfully');
        return
      }
      alert('Correo enviado exitosamente');
    });
  }

  resolved(captchaResponse: string) {
    return this.form.controls.captcha.setValue(captchaResponse);
  }


}
