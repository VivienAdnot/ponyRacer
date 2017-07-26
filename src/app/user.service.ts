import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

import { UserModel } from './models/user.model';

@Injectable()
export class UserService {
  public userEvents = new BehaviorSubject<UserModel>(undefined);

  constructor(private httpClient: HttpClient) { }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = {login, password, birthYear};
    return this.httpClient.post<UserModel>('http://ponyracer.ninja-squad.com/api/users', body);
  }

  authenticate(credentials: {login: string; password: string}): Observable<UserModel> {
      return this.httpClient.post<UserModel>('http://ponyracer.ninja-squad.com/api/users/authentication', credentials)
        .do((user: UserModel) => this.userEvents.next(user));
  }
}
