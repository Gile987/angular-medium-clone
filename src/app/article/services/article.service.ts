import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  deleteArticle(slug: string): Observable<void> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;
    return this.http.delete<void>(fullUrl);
  }
}
