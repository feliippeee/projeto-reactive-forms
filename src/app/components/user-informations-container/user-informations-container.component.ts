import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormController } from './user-form-controller';
import { CountriesService } from '../../services/countries.service';
import { distinctUntilChanged, take } from 'rxjs';
import { CountriesList } from '../../types/countries-list';
import { StatesService } from '../../services/states.service';
import { StatesList } from '../../types/states-list';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent extends UserFormController implements OnInit, OnChanges {
 // Implementando a interface OnChanges para detectar mudanças nas propriedades de entrada (Input) e extendendo a classe UserFormController para herdar suas funcionalidades
  currentTabIndex = 0; // resetando o índice da aba para a primeira aba (Geral) ao selecionar um novo usuário

  countriesList: CountriesList = [];
  statesList: StatesList = [];

  private readonly _countriesService = inject(CountriesService) //
  private readonly _statesService = inject(StatesService);

  @Input({ required: true }) isInEditMode: boolean = false; // Input obrigatório para determinar se o modo de edição está ativo ou não
  @Input({ required: true }) userSelected: IUser = {} as IUser; // Input obrigatório para determinar se o modo de edição está ativo ou não
  
  @Output('onFormStatusChange') onFormStatusChangeEmitt = new EventEmitter<boolean>(); 
  
  ngOnInit() {
    this.onUserFormStatusChange(); // Chamando o método para monitorar as mudanças de status do formulário do usuário
    this.getCountriesList(); 
  }
  

  ngOnChanges(changes: SimpleChanges): void {
      this.currentTabIndex = 0; // resetando o índice da aba para a primeira aba (Geral) ao selecionar um novo usuário

      const HAS_USER_SELECTED = changes['userSelected'] && Object.keys(changes['userSelected'].currentValue).length > 0; // Verificando se há um usuário selecionado

      if (HAS_USER_SELECTED) {
        this.fulfillUserForm(this.userSelected); // Preenchendo o formulário com as informações do usuário selecionado
        
        this.getStatesList(this.userSelected.country);
      }
  }

  onCountrySelected(countryName: string) {
    this.getStatesList(countryName);
  }

  mostrarForm() {
    console.log(this.userForm);
  }
  
  private onUserFormStatusChange() {
    this.userForm.statusChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => this.onFormStatusChangeEmitt.emit(this.userForm.valid)); // Monitorando as mudanças de status do formulário do usuário e emitindo um evento com o estado de validade do formulário
  }

  private getStatesList(country: string) {
    this._statesService.getStates(country).pipe(take(1)).subscribe((statesList: StatesList ) => {
      this.statesList = statesList;
    });
    
  }

  private getCountriesList() {
    this._countriesService.getCountries().pipe(take(1)).subscribe((countriesList: CountriesList) => {
      this.countriesList = countriesList;
    });
  }

  mostrarUserForm() {
    console.log('userForm', this.userForm);
  }
}
