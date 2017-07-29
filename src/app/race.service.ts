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

  bet(raceId: number, ponyId: number) {
      return this.httpClient.post<RaceModel>(`${environment.baseUrl}/api/races/${raceId}/bets`, { ponyId });
  }

  get(raceId) {
      return this.httpClient.get<RaceModel>(`${environment.baseUrl}/api/races/${raceId}`);
  }

  cancelBet(raceId) {
      return this.httpClient.delete(`${environment.baseUrl}/api/races/${raceId}/bets`);
  }
}
