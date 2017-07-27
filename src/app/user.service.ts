import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

import { UserModel } from './models/user.model';
import { environment } from '../environments/environment';
import { JwtInterceptorService } from './jwt-interceptor.service';

@Injectable()
export class UserService {
  public userEvents = new BehaviorSubject<UserModel>(undefined);
  private storageKey = 'rememberMe';

  constructor(private httpClient: HttpClient, private jwtInterceptorService: JwtInterceptorService) {
      this.retrieveUser();
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = {login, password, birthYear};
    return this.httpClient.post<UserModel>(`${environment.baseUrl}/api/users`, body);
  }

  authenticate(credentials: {login: string; password: string}): Observable<UserModel> {
      return this.httpClient.post<UserModel>(`${environment.baseUrl}/api/users/authentication`, credentials)
        .do((user: UserModel) => this.storeLoggedInUser(user));
  }

  storeLoggedInUser(user: UserModel) {
      window.localStorage.setItem(this.storageKey, JSON.stringify(user));
      this.jwtInterceptorService.setJwtToken(user.token);
      this.userEvents.next(user);
  }

  retrieveUser() {
      const userStringified = window.localStorage.getItem(this.storageKey);
      if (userStringified) {
          const user = JSON.parse(userStringified);
          this.jwtInterceptorService.setJwtToken(user.token);
          this.userEvents.next(user);
      }
  }

  logout() {
      this.userEvents.next(null);
      window.localStorage.removeItem(this.storageKey);
      this.jwtInterceptorService.removeJwtToken();
  }
}
