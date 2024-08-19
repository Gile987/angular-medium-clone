import { Route } from '@angular/router';
import { ArticleComponent } from './components/article.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as articleEffects from './store/effects';
import { articleFeatureKey, articleReducer } from './store/reducers';

export const routes: Route[] = [
  {
    path: '',
    component: ArticleComponent,
    providers: [
      provideEffects(articleEffects),
      provideState(articleFeatureKey, articleReducer),
    ],
  },
];
