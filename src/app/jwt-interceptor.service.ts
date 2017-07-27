import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  private token: string;

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (this.token) {
          const clone = req.clone({ setHeaders: { 'Authorization': `Bearer ${this.token}` } });
          return next.handle(clone);
      }

      return next.handle(req);
  }

  setJwtToken(token: string) {
      this.token = token;
  }

  removeJwtToken() {
      this.token = null;
  }
}
