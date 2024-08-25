import { inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AddToFavoritesService } from '../services/addToFavorites.service';
import { addToFavoritesActions } from './actions';
import { ArticleInterface } from '../../../types/article.interface';

export const addToFavoritesEffect = createEffect(
  (
    actions$ = inject(Actions),
    addToFavoritesService = inject(AddToFavoritesService)
  ) => {
    return actions$.pipe(
      ofType(addToFavoritesActions.addToFavorites),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? addToFavoritesService.removeFromFavorites(slug)
          : addToFavoritesService.addToFavorites(slug);
        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesActions.addToFavoritesSuccess({ article });
          }),
          catchError(() => {
            return of(addToFavoritesActions.addToFavoritesFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
