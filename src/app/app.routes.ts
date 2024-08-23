import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./globalFeed/globalFeed.routes').then((m) => m.routes),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('./yourFeed/yourFeed.routes').then((m) => m.routes),
  },
  {
    path: 'tags/:slug',
    loadChildren: () =>
      import('./tagFeed/tagFeed.routes').then((m) => m.routes),
  },
  {
    path: 'articles/new',
    loadChildren: () =>
      import('./createArticle/createArticle.routes').then((m) => m.routes),
  },
  {
    path: 'articles/:slug',
    loadChildren: () =>
      import('./article/article.routes').then((m) => m.routes),
  },
  {
    path: 'articles/:slug/edit',
    loadChildren: () =>
      import('./editArticle/editArticle.routes').then((m) => m.routes),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.routes').then((m) => m.routes),
  },
];
