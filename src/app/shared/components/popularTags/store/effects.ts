import { createEffect, ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { inject } from '@angular/core';
import { PopularTagService } from '../services/popularTag.service';
import { popularTagsActions } from './actions';
import { PopularTagType } from '../../../types/popularTag.type';

export const getPopularTags = createEffect(
  (
    actions$ = inject(Actions),
    popularTagsService = inject(PopularTagService)
  ) => {
    return actions$.pipe(
      ofType(popularTagsActions.getPopularTags),
      switchMap(() => {
        return popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return popularTagsActions.getPopularTagsSuccess({ popularTags });
          }),
          catchError(() => {
            return of(popularTagsActions.getPopularTagsFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
