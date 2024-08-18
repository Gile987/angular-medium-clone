import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { Observable } from 'rxjs';
import { CurrentUserInterface } from '../../types/currentUser.interface';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feedToggler.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class FeedTogglerComponent {
  @Input() tagName?: string | null = null;

  currentUser$: Observable<CurrentUserInterface | null | undefined>;

  constructor(private store: Store) {
    this.currentUser$ = this.store.select(selectCurrentUser);
  }
}
