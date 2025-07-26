import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('stlMarketToken');
  let headers = req.headers;

  if (token) {
    headers = headers.set('Authorization', `Token ${token}`);
  }

  const authReq = req.clone({ headers });

  return next(authReq);
};
