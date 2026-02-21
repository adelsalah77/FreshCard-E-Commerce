import { inject } from '@angular/core';
import { CheckPlateFormService } from './../../../shared/services/checkPlateForm/check-plate-form.service';
import { HttpInterceptorFn } from '@angular/common/http';

export const setheadersInterceptor: HttpInterceptorFn = (req, next) => {
  const checkPlateFormService: CheckPlateFormService = inject(CheckPlateFormService);

  if (checkPlateFormService.checkIsPlateFormBrowser()) {
    req = req.clone({
      headers: req.headers.set('token', localStorage.getItem('userToken') || ''),
    });
  }

  return next(req);
};
