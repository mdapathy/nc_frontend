import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Quiz } from '../_models/quiz';
import { User } from '../_models/user';
import { OneToFour } from '../_models/question/onetofour';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  url = `https://qznetbc.herokuapp.com/api/quiz/`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userToken')));
    this.currentUser = this.currentUserSubject.asObservable();
    
  }

  public currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  

  createQuiz(quiz: Quiz){
    // const quizInfo = {
    //   title: quiz.title,
    //   creatorId: this.currentUserSubject.value.id,
    //   language: quiz.quizLanguage,
    //   description: quiz.description,
    //   imageRef: quiz.imageReference,
    //   tagList: quiz.tags,
    //   categoryList: quiz.category
    // };
    // return this.http.post<Quiz>(this.url + 'create', JSON.stringify(quizInfo), this.httpOptions).pipe(
    //   catchError(this.handleError<Quiz>('quizcreate'))
    // );
  }

  editQuiz(quiz: Quiz){
    // const quizInfo = {
    //   newTitle: quiz.title,
    //   quizId: quiz.id,
    //   creatorId: this.currentUserSubject.value.id,
    //   newLanguage: quiz.quizLanguage,
    //   newDescription: quiz.description,
    //   newImageRef: quiz.imageReference,
    //   newTagList: quiz.tags,
    //   newCategoryList: quiz.category
    // };
    // return this.http.post<Quiz>(this.url + 'edit', JSON.stringify(quizInfo), this.httpOptions).pipe(
    //   catchError(this.handleError<Quiz>('quizedit'))
    // );
  }


  markAsFavorite(id: string){
    // const favoriteInfo = {
    //   quizId: id,
    //   userId: this.currentUserSubject.value.id,
    // };
    // return this.http.post<Quiz>(this.url + 'markasfavourite', JSON.stringify(favoriteInfo), this.httpOptions).pipe(
    //   catchError(this.handleError<Quiz>('markasfavorite'))
    // );
  }


  // 1st type quest:
  // {
  //   "quizId":"8",
  //   "title":"title",
  //   "content":"cnt",
  //   "points":"100",
  //   "typeId": "1",
  //   "rightOptions": [
  //     "answ0",
  //     "answ1"
  //   ],
  //   "otherOptions": [
  //     "answ2",
  //     "answ3"
  //   ]
  // }
  

  firstType(question: OneToFour, quizId: string){
    // const quizInfo = {
    //   title: question.title,
    //   quizId: quizId,
    //   content: question.content, //TODO: CONTENT
    //   points: question.points,  //TODO: POINTS
    //   typeId: 1,
    //   newImageRef: quiz.imageReference,
    //   typeId: quiz.tags,
    //   otherOptions: quiz.category
    // };
    // return this.http.post<Quiz>(this.url + 'create', JSON.stringify(quizInfo), this.httpOptions).pipe(
    //   catchError(this.handleError<Quiz>('quizedit'))
    // );
  }









  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      return of(result as T);
    };
  }
}
