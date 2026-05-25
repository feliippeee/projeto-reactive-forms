import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { StateService } from './services/state.service';
import { CitiesService } from './services/cities.service';
import { UsersService } from './services/users.service';
import { UsersListResponse } from './types/users-list-response';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  usersList: UsersListResponse = [];
  currentTabIndex: number = 0;
  constructor(
    private readonly _countriesService: CountriesService,
    private readonly _stateService: StateService,
    private readonly _citiesService: CitiesService,
    private readonly _usersService: UsersService,
  ) {}

  ngOnInit() {
   // this._countriesService.getCountries().subscribe((countriesResponse: any) => {
     // console.log('countriesResponse', countriesResponse);
    //});

    //this._stateService.getStates('Brazil').subscribe((stateResponse) => {
      //console.log('stateResponse', stateResponse);
    //});

    //this._citiesService.getCities('Brazil', 'São Paulo').subscribe((citiesResponse) => {
      //console.log('citiesResponse', citiesResponse);
    //});

    this._usersService.getUsers().pipe(take(1)).subscribe((usersListResponse) => this.usersList = usersListResponse);
  }
}
