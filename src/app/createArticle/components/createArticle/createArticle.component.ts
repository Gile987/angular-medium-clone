import { Component } from '@angular/core';
import { ArticleFormValuesInterface } from '../../../shared/components/articleForm/types/articleFormValues.interface';
import { ArticleFormComponent } from '../../../shared/components/articleForm/articleForm.component';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import {
  selectValidationErrors,
  selectIsSubmitting,
} from '../../store/reducers';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { ArticleRequestInterface } from '../../../shared/types/articleRequest.interface';
import { createArticleActions } from '../../store/actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-create-article',
  templateUrl: './createArticle.component.html',
  standalone: true,
  imports: [ArticleFormComponent, CommonModule],
})
export class CreateArticleComponent {
  initialValues: ArticleFormValuesInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  data$: Observable<{
    isSubmitting: boolean;
    backendErrors: BackendErrorsInterface | null;
  }>;

  constructor(private store: Store) {
    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    });
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    };
    this.store.dispatch(
      createArticleActions.createArticle({ request: request })
    );
  }
}
