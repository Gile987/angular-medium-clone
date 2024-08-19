import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { articleActions } from '../store/actions';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, filter, map, Observable } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectArticleData,
} from '../store/reducers';
import { selectCurrentUser } from '../../auth/store/reducers';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ErrorMessageComponent } from '../../shared/components/errorMessage/errorMessage.component';
import { TagListComponent } from '../../shared/components/tagList/tagList.component';
@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
    RouterLink,
  ],
})
export class ArticleComponent implements OnInit {
  slug: string;
  isAuthor$: Observable<boolean>;
  data$: Observable<{
    isLoading: boolean;
    error: any;
    article: any;
    isAuthor: boolean;
  }>;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.isAuthor$ = combineLatest({
      article: this.store.select(selectArticleData),
      currentUser: this.store
        .select(selectCurrentUser)
        .pipe(
          filter(
            (currentUser): currentUser is CurrentUserInterface | null =>
              currentUser !== undefined
          )
        ),
    }).pipe(
      map(({ article, currentUser }) => {
        if (!article || !currentUser) {
          return false;
        }
        return article.author.username === currentUser.username;
      })
    );

    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      article: this.store.select(selectArticleData),
      isAuthor: this.isAuthor$,
    });
  }

  ngOnInit() {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
    this.data$.subscribe((data) => {});
  }
}
