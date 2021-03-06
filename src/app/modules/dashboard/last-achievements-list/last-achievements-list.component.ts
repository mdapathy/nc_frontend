import {Component, OnInit, OnDestroy} from '@angular/core';
import {ProfileService} from '../../core/_services/profile/profile.service';
import {Achievement} from '../../core/_models/achievement';
import {Subscription} from 'rxjs';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../core/_services/authentication/authentication.service';
import { ToastsService } from '../../core/_services/utils/toasts.service';
import { LocaleService } from '../../core/_services/utils/locale.service';

@Component({
    selector: 'app-last-achievements-list',
    templateUrl: './last-achievements-list.component.html',
    styleUrls: ['./last-achievements-list.component.css']
})
export class LastAchievementsListComponent implements OnInit, OnDestroy {
    subscriptions: Subscription = new Subscription();

    mockImgUrl = '../../assets/img/achievement.png';
    achievements: Achievement[];
    isEmpty: boolean;
    isLoading: boolean;
    faSpinner = faSpinner;
    currentUsername: string;

    constructor(private profileService: ProfileService,
                private authenticationService: AuthenticationService,
                public toastsService: ToastsService,
                private localeService: LocaleService) {
        this.isEmpty = false;
        this.isLoading = true;
        this.currentUsername = authenticationService.currentUserValue.username;
    }

    ngOnInit(): void {
        this.subscriptions.add(this.profileService.getLastAchievements().subscribe(v => {
            this.achievements = v;
            if (v.length == 0) {
                this.isEmpty = true;
            }
            this.isLoading = false;
        },
            () =>
            this.toastsService.toastAddDanger(this.localeService.getValue('toasterEditor.wentWrong'))
        ));
    }

    ngOnDestroy(): void{
        this.subscriptions.unsubscribe();
    }

}
