import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { combineLatest, Observable } from 'rxjs';
import { selectFeedData, selectIsLoading, selectError } from './store/reducers';
import { GetFeedResponseInterface } from './types/getFeedResponse.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../errorMessage/errorMessage.component';
import { LoadingComponent } from '../loading/loading.component';
import { environment } from '../../../../environments/environment.development';
import { PaginationComponent } from '../pagination/pagination.component';
import queryString from 'query-string';
import { TagListComponent } from '../tagList/tagList.component';
import { AddToFavoritesComponent } from '../addToFavorites/addToFavorites.component';
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
    TagListComponent,
    AddToFavoritesComponent,
  ],
})
export class FeedComponent implements OnInit, OnChanges {
  @Input() apiUrl: string = '';
  limit: number = environment.limit;
  baseUrl: string = '';
  currentPage: number = 0;

  data$!: Observable<{
    isLoading: boolean;
    error: string | null;
    feed: GetFeedResponseInterface | null;
  }>;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeData();
    this.route.queryParams.subscribe((params) => {
      this.currentPage = Number(params['page'] || '1');
      this.fetchFeed();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['apiUrl'] && !changes['apiUrl'].firstChange) {
      this.fetchFeed();
    }
  }

  private initializeData(): void {
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      feed: this.store.select(selectFeedData),
    });
    this.baseUrl = this.router.url.split('?')[0];
  }

  fetchFeed(): void {
    const offset: number = this.currentPage * this.limit - this.limit;
    const parsedUrl: { url: string; query: { [key: string]: any } } =
      queryString.parseUrl(this.apiUrl);
    const stringifiedParams: string = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams: string = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(feedActions.getFeed({ url: apiUrlWithParams }));
  }
}
