import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';

import { environment } from '../environments/environment';
import { RaceModel } from './models/race.model';
import { PonyWithPositionModel } from './models/pony.model';
import { WsService } from './ws.service';

@Injectable()
export class RaceService {
  constructor(private httpClient: HttpClient, private wsService: WsService) { }

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
      return this.wsService.connect(`/race/${raceId}`)
      .takeWhile((liveRace: RaceModel) => liveRace.status !== 'FINISHED')
      .map((liveRace) => liveRace.ponies);
  }

  boost(raceId, ponyId) {
      return this.httpClient.post(`${environment.baseUrl}/api/races/${raceId}/boosts`, { ponyId });
  }
}
