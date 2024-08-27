import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleRequestInterface } from '../../shared/types/articleRequest.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ArticleResponseInterface } from '../../shared/types/articleResponse.interface';
import { ArticleInterface } from '../../shared/types/article.interface';

@Injectable()
export class CreateArticleService {
  constructor(private http: HttpClient) {}

  createArticle(
    articleRequest: ArticleRequestInterface
  ): Observable<ArticleInterface> {
    const fullUrl: string = environment.apiUrl + '/articles';
    return this.http
      .post<ArticleResponseInterface>(fullUrl, articleRequest)
      .pipe(
        map((response) => response.article),
        catchError((error) => {
          console.error('Error creating article:', error);
          return throwError(() => new Error(error));
        })
      );
  }
}
