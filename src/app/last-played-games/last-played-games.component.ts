import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../_services/profile.service';
import { QuizLastPlayed } from '../_models/quiz-last-played';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-last-played-games',
  templateUrl: './last-played-games.component.html',
  styleUrls: ['./last-played-games.component.css']
})
export class LastPlayedGamesComponent implements OnInit {

  gamesList$: Observable<QuizLastPlayed[]>;
  isEmpty: boolean;
  constructor(private profileService: ProfileService) { 
    this.isEmpty = false;
  }
  timezone: string;

  ngOnInit(): void {
    this.gamesList$ = this.profileService.getLastPlayedGames();
    this.gamesList$.subscribe(v => {
      if(v.length == 0){
        this.isEmpty = true;
      }
    }, error => {
      console.error(error);
    });

    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

}