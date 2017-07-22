import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RaceService {
  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get('http://ponyracer.ninja-squad.com/api/races?status=PENDING');
  }
}
