import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';
import { QuizPreview } from '../_models/quiz-preview';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class QuizListService {
  private baseUrl = 'https://qznetbc.herokuapp.com/api/quizzes/';
  private quizListUrl = 'quiz-list/page/';
  private totalSizeUrl = 'totalsize';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
   }

  getQuizzesByPage(pageToSend: number): Observable<QuizPreview[]> {
    return this.http.
      get<QuizPreview[]>(this.baseUrl + this.quizListUrl + pageToSend).pipe(
        catchError(this.handleError<QuizPreview[]>('getQuizzesByPage', []))
      );
  }

  getTotalSize(): Observable<number>{
    return this.http.get<number>(this.baseUrl + this.totalSizeUrl, this.httpOptions)
        .pipe(catchError(this.handleError<number>('getTotalSize', 0)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      return of(result as T);
    };
  }
}
