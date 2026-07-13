import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../interfaces/user/user.interface";

export class UserFormController {
    userForm!: FormGroup; // Propriedade para armazenar o formulário do usuário

    private _fb = inject(FormBuilder); // Injetando o FormBuilder para criar o formulário do usuário

    constructor() {
        this.createUserForm(); // Chamando o método para criar o formulário do usuário ao instanciar a classe
    }

    get generalInformation(): FormGroup {
        return this.userForm.get('generalInformation') as FormGroup; // Retornando o formulário de informações gerais do usuário
    }

    fulfillUserForm(user: IUser) {
        this.fulfillGeneralInformations(user);  
    }

    private fulfillGeneralInformations(user: IUser) {
        this.generalInformation.patchValue(user); // Preenchendo o formulário com as informações do usuário
        console.log(this.userForm);
    }

    private createUserForm() {
        this.userForm = this._fb.group({
            generalInformation: this._fb.group({
                name: ['', Validators.required],
                email: ['', Validators.email],
                country: ['', Validators.required],
                state: ['', Validators.required],
                maritalStatus: [null, Validators.required],
                mounthlyIncome: [null, Validators.required],
                birthDate: [null, Validators.required],

            }),
            contactInformation: this._fb.group({
                phoneList: this._fb.array([]),
                addressList: this._fb.array([]),
            }),
            dependentsList: this._fb.array([]),
        }); // Criando o formulário do usuário com o FormBuilder
    }
}