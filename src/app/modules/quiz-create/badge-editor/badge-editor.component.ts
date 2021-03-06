import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {merge, Observable, Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {QuizService} from '../../core/_services/quiz/quiz.service';
import {TagCatg} from '../../core/_models/tagcateg';
import {Tag} from '../../core/_models/tag';
import {Category} from '../../core/_models/category';

@Component({
    selector: 'app-badge-editor',
    templateUrl: './badge-editor.component.html',
    styleUrls: ['./badge-editor.component.css']
})
export class BadgeEditorComponent implements OnInit, OnDestroy {

    @Input()
    label: string;

    @Input()
    tagCateg: TagCatg[];

    @Input()
    available: boolean;

    model: TagCatg;

    allObjects: TagCatg[];

    subscriptions: Subscription = new Subscription();

    constructor(private quizService: QuizService) {
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    ngOnInit(): void {
        this.allObjects = [];
        if (this.isTag()) {
            this.mapAllTagsOrCategs(this.quizService.getTagsList());
        } else {
            this.mapAllTagsOrCategs(this.quizService.getCategoriesList());
        }
    }

    mapAllTagsOrCategs(result) {
        this.subscriptions.add(result.subscribe(
            ans => ans.forEach((element) => {
                this.allObjects.push(element);
            })));
    }

    remove(i) {
        this.tagCateg.splice(i, 1);
    }

    add() {
        const index = this.tagCateg.findIndex(el => el.id === this.model.id);

        if (this.model !== undefined && index === -1) {
            if (this.isTag()) {
                this.tagCateg.push(new Tag(this.model.id, this.model.description));
            } else {
                this.tagCateg.push(new Category(this.model.id, this.model.description));
            }
            this.model = undefined;
        }
    }

    isTag() {
        return this.label === 'Tags';
    }

    selectedItem(selectedItem){
        selectedItem.preventDefault();
        this.model = this.isTag() ?
            new Tag(selectedItem.item.id, selectedItem.item.description) : 
            new Category(selectedItem.item.id, selectedItem.item.description);

        this.add();
    }

    formatter = (object: any) => object.description;

    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$).pipe(
            map(term => (term === '' ? this.allObjects
                : this.allObjects.filter(v => v.description.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
    };


}
