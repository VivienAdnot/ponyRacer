import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  navbarCollapsed: boolean;
  user: UserModel;
  userEventsSubscription: Subscription;

  constructor(private userService: UserService) {
    this.navbarCollapsed = true;
  }

  ngOnInit() {
      this.userEventsSubscription = this.userService.userEvents.subscribe(
          (user: UserModel) => this.user = user
      );
  }

  ngOnDestroy() {
      if (this.userEventsSubscription) {
          this.userEventsSubscription.unsubscribe();
      }
  }

  public toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
}
