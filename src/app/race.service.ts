import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

@Injectable()
export class RaceService {
  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get(environment.baseUrl + 'api/races?status=PENDING');
  }
}
