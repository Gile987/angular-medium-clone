import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { combineLatest, Observable } from 'rxjs';
import { selectFeedData, selectIsLoading, selectError } from './store/reducer';
import { GetFeedResponseInterface } from './types/getFeedResponse.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../errorMessage/errorMessage.component';
import { LoadingComponent } from '../loading/loading.component';
import { environment } from '../../../../environments/environment.development';
import { PaginationComponent } from '../pagination/pagination.component';
import queryString from 'query-string';
@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
  ],
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string = '';
  limit: number = environment.limit;
  baseUrl: string;
  currentPage: number = 0;

  data$: Observable<{
    isLoading: boolean;
    error: string | null;
    feed: GetFeedResponseInterface | null;
  }>;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      feed: this.store.select(selectFeedData),
    });
    this.baseUrl = this.router.url.split('?')[0];
  }

  ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({ url: this.apiUrl }));
    this.route.queryParams.subscribe((params) => {
      this.currentPage = Number(params['page'] || '1');
      this.fetchFeed();
    });
  }

  fetchFeed(): void {
    const offset: number = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(feedActions.getFeed({ url: apiUrlWithParams }));
  }
}
