import { inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../interfaces/user/user.interface";
import { PhoneList } from "../../types/phone-list";
import { AddressList } from "../../types/address-list";
import { DependentsList } from "../../types/dependents-list";

export class UserFormController {
    userForm!: FormGroup; // Propriedade para armazenar o formulário do usuário

    private _fb = inject(FormBuilder); // Injetando o FormBuilder para criar o formulário do usuário

    constructor() {
        this.createUserForm(); // Chamando o método para criar o formulário do usuário ao instanciar a classe
    }

    get generalInformation(): FormGroup {
        return this.userForm.get('generalInformation') as FormGroup; // Retornando o formulário de informações gerais do usuário
    }

    get phoneList(): FormArray {
        return this.userForm.get('contactInformation.phoneList') as FormArray;
    }

    get addressList(): FormArray {
        return this.userForm.get('contactInformation.addressList') as FormArray;
    }

    get dependentsList(): FormArray {
        return this.userForm.get('dependentsList') as FormArray;
    }

    fulfillUserForm(user: IUser) {
        this.fulfillGeneralInformations(user);  

        this.fulfillPhoneList(user.phoneList);

        this.fulfillAddressList(user.addressList);

        this.fulfillDependentsList(user.dependentsList);

        console.log(this.userForm); // Exibindo o valor do formulário do usuário no console
    }
    private fulfillDependentsList(userDependentsList: DependentsList) {
        userDependentsList.forEach((dependent) => {
            this.dependentsList.push(this._fb.group({
                name: [dependent.name, Validators.required],
                age: [dependent.age, Validators.required],
                document: [dependent.document, Validators.required],
            }));
        })
    }
    private fulfillAddressList(userAddressList: AddressList) {
        userAddressList.forEach((address) => {
            this.addressList.push(this._fb.group({
                type: [address.type, Validators.required],
                street: [address.street, Validators.required],
                complement: [address.complement, Validators.required],
                country: [address.country, Validators.required],
                state: [address.state, Validators.required],
                city: [address.city, Validators.required],
            }));
        })
    }

    private fulfillPhoneList(phoneList: PhoneList) {
        phoneList.forEach((phone) => {
            this.phoneList.push(this._fb.group({
                type: [phone.type, Validators.required],
                areaCode: [phone.areaCode, Validators.required],
                internationalCode: [phone.internationalCode, Validators.required],
                number: [phone.number, Validators.required],
            })); // preenchendo cada telefone do usuário ao formulário de lista de telefones
        })
        
    }

    private fulfillGeneralInformations(user: IUser) {
        this.generalInformation.patchValue(user); // Preenchendo o formulário com as informações do usuário
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