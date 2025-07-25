import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("stlMarketToken");

  let headers: { [header: string]: string } = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }

  const authReq = req.clone({
    setHeaders: headers
  });

  return next(authReq);
};