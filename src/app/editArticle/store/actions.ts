import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { ArticleInterface } from '../../shared/types/article.interface';
import { ArticleRequestInterface } from '../../shared/types/articleRequest.interface';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';

export const editArticleActions = createActionGroup({
  source: 'create article',
  events: {
    'Get Article': props<{ slug: string }>(),
    'Get Article Success': props<{ article: ArticleInterface }>(),
    'Get Article Failure': emptyProps(),

    'Update Article': props<{
      request: ArticleRequestInterface;
      slug: string;
    }>(),
    'Update Article Success': props<{ article: ArticleInterface }>(),
    'Update Article Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
