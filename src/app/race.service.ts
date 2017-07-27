import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../environments/environment';
import { RaceModel } from './models/race.model';

@Injectable()
export class RaceService {
  constructor(private httpClient: HttpClient) { }

  list(): Observable<Array<RaceModel>> {
    const params = new HttpParams().set('status', 'PENDING');
    return this.httpClient.get<Array<RaceModel>>(`${environment.baseUrl}/api/races`, { params });
  }
}
