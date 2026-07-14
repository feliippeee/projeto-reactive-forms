import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormController } from './user-form-controller';
import { CountriesService } from '../../services/countries.service';
import { take } from 'rxjs';
import { CountriesList } from '../../types/countries-list';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent extends UserFormController implements OnInit, OnChanges { // Implementando a interface OnChanges para detectar mudanças nas propriedades de entrada (Input) e extendendo a classe UserFormController para herdar suas funcionalidades
  currentTabIndex = 0; // resetando o índice da aba para a primeira aba (Geral) ao selecionar um novo usuário

  countriesList: CountriesList = []

  private readonly _countriesService = inject(CountriesService) //
  
  @Input({ required: true }) isInEditMode: boolean = false; // Input obrigatório para determinar se o modo de edição está ativo ou não
  @Input({ required: true }) userSelected: IUser = {} as IUser; // Input obrigatório para determinar se o modo de edição está ativo ou não
  
  ngOnInit() {
    this.getCountriesList();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.currentTabIndex = 0; // resetando o índice da aba para a primeira aba (Geral) ao selecionar um novo usuário

      const HAS_USER_SELECTED = changes['userSelected'] && Object.keys(changes['userSelected'].currentValue).length > 0; // Verificando se há um usuário selecionado

      if (HAS_USER_SELECTED) {
        this.fulfillUserForm(this.userSelected); // Preenchendo o formulário com as informações do usuário selecionado
      }
  }

  private getCountriesList() {
    this._countriesService.getCountries().pipe(take(1)).subscribe((countriesList: CountriesList) => {
      this.countriesList = countriesList;
    });
  }
}
