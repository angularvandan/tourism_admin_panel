import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiService } from '../api/api.service';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const api=inject(ApiService);
  let token =api.currentUser.token;
  console.log(token);
  const customClone = req.clone({
    setHeaders: {
      Authorization: `${token}`
    }
  })
  return next(customClone);
};
