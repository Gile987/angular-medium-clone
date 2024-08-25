import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleInterface } from '../../../types/article.interface';

export const addToFavoritesActions = createActionGroup({
  source: 'Add To Favorites',
  events: {
    'Add to favorites': props<{ isFavorited: boolean; slug: string }>(),
    'Add to favorites success': props<{ article: ArticleInterface }>(),
    'Add to favorites failure': emptyProps(),
  },
});
