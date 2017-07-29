import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {
    raceModel: RaceModel;
    poniesWithPosition: Array<PonyWithPositionModel>;
    positionSubscription: Subscription;

  constructor(private raceService: RaceService, private route: ActivatedRoute) { }

  ngOnInit() {
      const raceId = this.route.snapshot.paramMap.get('raceId');
      this.raceService.get(raceId).subscribe(race => this.raceModel = race);

      this.positionSubscription = this.raceService.live(raceId).subscribe(
          (poniesWithPosition: Array<PonyWithPositionModel>) => this.poniesWithPosition = poniesWithPosition
      );
  }

  ngOnDestroy() {
      if (this.positionSubscription) {
          this.positionSubscription.unsubscribe();
      }
  }

}
