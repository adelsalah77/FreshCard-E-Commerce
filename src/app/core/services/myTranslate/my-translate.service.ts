import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  translateService: TranslateService = inject(TranslateService);

  constructor() {
    let defaultLang: string = 'en';
    if (localStorage.getItem('lang')) {
      defaultLang = localStorage.getItem('lang')!;
    }
    this.translateService.setFallbackLang('en');
    this.translateService.use(defaultLang);
    this.changeDirection(defaultLang);
  }

  changeLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.translateService.setFallbackLang('en');
    this.translateService.use(lang);
    this.changeDirection(lang);
  }

  changeDirection(lang: string) {
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
