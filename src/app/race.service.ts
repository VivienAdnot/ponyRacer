import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';
import { RaceModel } from './models/race.model';
import { PonyWithPositionModel } from './models/pony.model';

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

  live(raceId): Observable<Array<PonyWithPositionModel>> {
      return Observable.interval(1000).take(101).map(position => {
          return [{
              id: 1,
              name: 'Superb Runner',
              color: 'BLUE',
              position
            }, {
              id: 2,
              name: 'Awesome Fridge',
              color: 'GREEN',
              position
            }, {
              id: 3,
              name: 'Great Bottle',
              color: 'ORANGE',
              position
            }, {
              id: 4,
              name: 'Little Flower',
              color: 'YELLOW',
              position
            }, {
              id: 5,
              name: 'Nice Rock',
              color: 'PURPLE',
              position
            }
        ]
    });
  }
}
