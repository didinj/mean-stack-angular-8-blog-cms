import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Category } from './category/category';
import { Post } from './post/post';

const apiUrl = 'http://localhost:3000/api/public/';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(apiUrl + 'category')
      .pipe(
        tap(_ => this.log('fetched Categories')),
        catchError(this.handleError('getCategories', []))
      );
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(apiUrl + 'post')
      .pipe(
        tap(_ => this.log('fetched Posts')),
        catchError(this.handleError('getPosts', []))
      );
  }

  getPostsByCategory(id: any): Observable<Post[]> {
    return this.http.get<Post[]>(apiUrl + 'bycategory/' + id)
      .pipe(
        tap(_ => this.log('fetched Posts')),
        catchError(this.handleError('getPosts', []))
      );
  }

  getPost(id: any): Observable<Post> {
    return this.http.get<Post>(apiUrl + 'post/' + id).pipe(
      tap(_ => console.log(`fetched post by id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
