import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTcwOTIwMDcwMX0.N-dPfDSYDttMSGbh4Q7N1cBm7g2G0haQ1s6U0nCl3X8'
  const customClone = req.clone({
    setHeaders: {
      Authorization: `${token}`
    }
  })
  return next(customClone);
};
