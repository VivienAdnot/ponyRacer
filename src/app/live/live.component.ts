import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/bufferToggle';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';

import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import { PonyModel } from '../models/pony.model';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {
    raceModel: RaceModel;
    poniesWithPosition: Array<PonyWithPositionModel> = [];
    positionSubscription: Subscription;
    error = false;
    winners: Array<PonyWithPositionModel>;
    betWon: boolean;
    clickSubject: Subject<PonyWithPositionModel>;

  constructor(private raceService: RaceService, private route: ActivatedRoute) {
      this.clickSubject = new Subject<PonyWithPositionModel>();
  }

  ngOnInit() {
      const raceId = this.route.snapshot.paramMap.get('raceId');
      this.positionSubscription = this.raceService.get(raceId)
        .do(race => this.raceModel = race)
        .filter(race => race.status !== 'FINISHED')
        .switchMap(race => this.raceService.live(race.id))
        .subscribe(
            (poniesWithPosition: Array<PonyWithPositionModel>) => {
                this.poniesWithPosition = poniesWithPosition;
                this.raceModel.status = 'RUNNING';
            },
            () => this.error = true,
            () => {
                this.raceModel.status = 'FINISHED';
                this.winners = this.poniesWithPosition.filter(pony => pony.position >= 100);
                this.betWon = this.winners.some(pony => pony.id === this.raceModel.betPonyId);
            }
        );

        this.clickSubject
          .groupBy(pony => pony.id, pony => pony.id)
          .mergeMap(obs => obs.bufferToggle(obs, () => Observable.interval(1000)))
          .filter(array => array.length >= 5)
          .throttleTime(1000)
          .map(array => array[0])
          .switchMap(ponyId => this.raceService.boost(this.raceModel.id, ponyId).catch(() => Observable.empty()))
          .subscribe(() => {});
  }

  ngOnDestroy() {
      if (this.positionSubscription) {
          this.positionSubscription.unsubscribe();
      }
  }

  onClick(pony: PonyWithPositionModel) {
      this.clickSubject.next(pony);
  }

  ponyById(index: number, pony: PonyWithPositionModel): number {
      return pony.id;
  }

}
