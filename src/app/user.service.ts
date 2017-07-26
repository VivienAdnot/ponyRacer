import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }

  register(login, password, birthYear): Observable<any> {
    const body = {login, password, birthYear};
    return this.httpClient.post('http://ponyracer.ninja-squad.com/api/users', body);
  }
}
