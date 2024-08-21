import { Route } from '@angular/router';
import { CreateArticleComponent } from './components/createArticle/createArticle.component';
import { CreateArticleService } from './services/createArticle.service';
import * as createArticleEffects from './store/effects';
import { provideEffects } from '@ngrx/effects';
import {
  createArticleFeatureKey,
  createArticleReducer,
} from './store/reducers';
import { provideState } from '@ngrx/store';

export const routes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
    providers: [
      CreateArticleService,
      provideEffects(createArticleEffects),
      provideState(createArticleFeatureKey, createArticleReducer),
    ],
  },
];
