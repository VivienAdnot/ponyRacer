import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

import { UserModel } from './models/user.model';

@Injectable()
export class UserService {
  public userEvents = new BehaviorSubject<UserModel>(undefined);
  private storageKey = 'rememberMe';

  constructor(private httpClient: HttpClient) {
      this.retrieveUser();
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = {login, password, birthYear};
    return this.httpClient.post<UserModel>('http://ponyracer.ninja-squad.com/api/users', body);
  }

  authenticate(credentials: {login: string; password: string}): Observable<UserModel> {
      return this.httpClient.post<UserModel>('http://ponyracer.ninja-squad.com/api/users/authentication', credentials)
        .do((user: UserModel) => this.storeLoggedInUser(user));
  }

  logout() {
      this.userEvents.next(null);
      window.localStorage.removeItem(this.storageKey);
  }

  storeLoggedInUser(user: UserModel) {
      window.localStorage.setItem(this.storageKey, JSON.stringify(user));
      this.userEvents.next(user);
  }

  retrieveUser() {
      const userStringified = window.localStorage.getItem(this.storageKey);
      if (userStringified) {
          const user = JSON.parse(userStringified);
          this.userEvents.next(user);
      }
  }
}
