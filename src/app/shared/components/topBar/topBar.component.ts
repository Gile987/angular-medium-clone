import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentUserInterface } from '../../types/currentUser.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-top-bar',
  templateUrl: './topBar.component.html',
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class TopBarComponent {
  data$!: Observable<{
    currentUser: CurrentUserInterface | null;
  }>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData(): void {
    this.data$ = combineLatest({
      currentUser: this.store.select(selectCurrentUser),
    }).pipe(
      map(({ currentUser }) => ({
        currentUser: currentUser ?? null,
      }))
    );
  }
}
