import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators/map';
import {ExtendedQuizPreview} from '../../_models/extendedquiz-preview';
import { catchError } from 'rxjs/operators';
import { HandleErrorsService } from '../utils/handle-errors.service';

@Injectable({
    providedIn: 'root'
})
export class SuggestionService {

    private baseUrl = `${environment.apiUrl}quizzes/suggestions-list`;

    constructor(private http: HttpClient, private sanitizer: DomSanitizer,
        private handleErrorsService: HandleErrorsService) {
    }

    getSuggestionList(): Observable<ExtendedQuizPreview[]> {
        return this.http.get<ExtendedQuizPreview[]>(this.baseUrl)
            .pipe(map(data => data.map(x => {
                return new ExtendedQuizPreview().deserialize(x, this.sanitizer);
            }), catchError(this.handleErrorsService.handleError<ExtendedQuizPreview[]>('getSuggestionList', []))));
    }
}
