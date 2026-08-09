import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states.service';
import { CitiesService } from './services/cities.service';
import { UsersService } from './services/users.service';
import { UsersListResponse } from './types/users-list-response';
import { take } from 'rxjs';
import { IUser } from './interfaces/user/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
isInEditMode: boolean = false;
enableSaveButton: boolean = false;

  userSelectedIndex: number | undefined;
  userSelected: IUser = {} as IUser; // criando um clone do usuário selecionado
  
  usersList: UsersListResponse = [];

  constructor(
    private readonly _countriesService: CountriesService,
    private readonly _statesService: StatesService,
    private readonly _citiesService: CitiesService,
    private readonly _usersService: UsersService,
  ) { }

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
  
  onUserSelected(userIndex: number) {
    const userFound = this.usersList[userIndex];

    if (userFound) {
      this.userSelectedIndex = userIndex;
      this.userSelected = structuredClone(userFound); // criando um clone do usuário selecionado
     
    }
  }

  onCancelButton() {
    this.isInEditMode = false;
  }
  
  onEditButton() {
    this.isInEditMode = true;
  }

  onFormStatusChange(formStatus: boolean) {
    setTimeout(() => this.enableSaveButton = formStatus, 0); // Atualizando o estado do botão de salvar com base na validade do formulário
  }// nesse caso, o setTimeout é usado para garantir que a atualização do estado do botão de salvar ocorra após a conclusão do ciclo de detecção de mudanças do Angular, evitando possíveis problemas de sincronização.
}