import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ValidationPageComponent} from './validation-page.component';

describe('ValidationPageComponent', () => {
    let component: ValidationPageComponent;
    let fixture: ComponentFixture<ValidationPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ValidationPageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ValidationPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
