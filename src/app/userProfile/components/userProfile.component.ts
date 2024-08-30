import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { userProfileActions } from '../store/actions';
import {
  combineLatest,
  filter,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectUserProfileData,
} from '../store/reducers';
import { selectCurrentUser } from '../../auth/store/reducers';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { UserProfileInterface } from '../types/userProfile.interface';
import { CommonModule } from '@angular/common';
import { FeedComponent } from '../../shared/components/feed/feed.component';
import { ExtendedUserProfileStateInterface } from '../types/extendedUserProfileStateInterface';

@Component({
  selector: 'mc-user-profile',
  templateUrl: './userProfile.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FeedComponent],
})
export class UserProfileComponent implements OnInit {
  slug: string = '';
  data$: Observable<ExtendedUserProfileStateInterface> | undefined;
  isCurrentUserProfile$: Observable<boolean> | undefined;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeDataStreams();
    this.subscribeToRouteParams();
  }

  initializeDataStreams(): void {
    this.isCurrentUserProfile$ = combineLatest([
      this.store.pipe(
        select(selectCurrentUser),
        filter(
          (currentUser): currentUser is CurrentUserInterface | null =>
            currentUser !== undefined
        )
      ),
      this.store.pipe(
        select(selectUserProfileData),
        filter((userProfile): userProfile is UserProfileInterface =>
          Boolean(userProfile)
        )
      ),
    ]).pipe(
      map(
        ([currentUser, userProfile]: [
          CurrentUserInterface | null,
          UserProfileInterface
        ]) => {
          return currentUser?.username === userProfile.username;
        }
      )
    );

    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      userProfile: this.store.select(selectUserProfileData),
      isCurrentUserProfile: this.isCurrentUserProfile$,
    });
  }

  private subscribeToRouteParams(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.slug = params['slug'];
        this.fetchUserProfile();
      });
  }

  fetchUserProfile(): void {
    this.store.dispatch(userProfileActions.getUserProfile({ slug: this.slug }));
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
