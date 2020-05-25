import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TrueFalseComponent} from './true-false.component';

describe('TrueFalseComponent', () => {
    let component: TrueFalseComponent;
    let fixture: ComponentFixture<TrueFalseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrueFalseComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrueFalseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
