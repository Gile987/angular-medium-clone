import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { combineLatest, Observable } from 'rxjs';
import { selectFeedData, selectIsLoading, selectError } from './store/reducer';
import { GetFeedResponseInterface } from './types/getFeedResponse.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../errorMessage/errorMessage.component';
@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, ErrorMessageComponent],
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string = '';

  data$: Observable<{
    isLoading: boolean;
    error: string | null;
    feed: GetFeedResponseInterface | null;
  }>;

  constructor(private store: Store) {
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      feed: this.store.select(selectFeedData),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({ url: this.apiUrl }));
  }
}
