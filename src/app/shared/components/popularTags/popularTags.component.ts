import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { popularTagsActions } from './store/actions';
import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from './store/reducers';
import { combineLatest, Observable } from 'rxjs';
import { PopularTagType } from '../../types/popularTag.type';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorMessageComponent } from '../errorMessage/errorMessage.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink],
})
export class PopularTagsComponent implements OnInit {
  data$!: Observable<{
    popularTags: PopularTagType[] | null;
    isLoading: boolean;
    error: string | null;
  }>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags());
    this, this.initializeData();
  }

  private initializeData(): void {
    this.data$ = combineLatest({
      popularTags: this.store.select(selectPopularTagsData),
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
    });
  }
}
