import { inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../interfaces/user/user.interface";
import { PhoneList } from "../../types/phone-list";
import { AddressList } from "../../types/address-list";
import { DependentsList } from "../../types/dependents-list";
import { convertPtBrDateToDateObj } from "../../utils/convert-pt-br-date-to-date-obj";
import { preparePhoneList } from "../../utils/prepare-phone-list";
import { PhoneTypeEnum } from "../../enums/phone-type.enum";

export class UserFormController {
    userForm!: FormGroup; // Propriedade para armazenar o formulário do usuário

    private emailPattern= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    private _fb = inject(FormBuilder); // Injetando o FormBuilder para criar o formulário do usuário

    constructor() {
        this.createUserForm(); // Chamando o método para criar o formulário do usuário ao instanciar a classe
    }

    get generalInformations(): FormGroup {
        return this.userForm.get('generalInformations') as FormGroup; // Retornando o formulário de informações gerais do usuário
    }

    get phoneList(): FormArray {
        return this.userForm.get('contactInformations.phoneList') as FormArray;
    }

    get addressList(): FormArray {
        return this.userForm.get('contactInformations.addressList') as FormArray;
    }

    get dependentsList(): FormArray {
        return this.userForm.get('dependentsList') as FormArray;
    }

    fulfillUserForm(user: IUser) {
        this.resetUserForm(); // Resetando o formulário do usuário antes de preenchê-lo com novos dados

        this.fulfillGeneralInformations(user);  

        this.fulfillPhoneList(user.phoneList);

        this.fulfillAddressList(user.addressList);

        this.fulfillDependentsList(user.dependentsList);

        console.log(this.userForm); // Exibindo o valor do formulário do usuário no console
    }

    private resetUserForm() {
        this.userForm.reset(); // Resetando o formulário do usuário
        
        this.generalInformations.reset(); // Resetando o formulário de informações gerais do usuário
        
        this.phoneList.reset(); // Resetando a lista de telefones do formulário
        this.phoneList.clear(); // Limpando a lista de telefones do formulário
        
        this.addressList.reset(); // Resetando a lista de endereços do formulário
        this.addressList.clear(); // Limpando a lista de endereços do formulário
        
        this.dependentsList.reset(); // Resetando a lista de dependentes do formulário
        this.dependentsList.clear(); // Limpando a lista de dependentes do formulário
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

    private fulfillPhoneList(UserPhoneList: PhoneList) {
        preparePhoneList(UserPhoneList, false, (phone) => {
            const phoneValidators = phone.type === PhoneTypeEnum.EMERGENCY ? [] : [Validators.required];
            this.phoneList.push(this._fb.group({
                type: [phone.type],
                typeDescription: [phone.typeDescription],
                number: [phone.phoneNumber, phoneValidators],
            }));
        })

        console.log('form phoneList', this.phoneList);
    }

    private fulfillGeneralInformations(user: IUser) {
        const newUser = {
            ...user,
            birthDate: convertPtBrDateToDateObj(user.birthDate)
        };
        this.generalInformations.patchValue(newUser); // Preenchendo o formulário com as informações do usuário
    }

    private createUserForm() {
        this.userForm = this._fb.group({
            generalInformations: this._fb.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.pattern(this.emailPattern)]], 
                country: ['', Validators.required],
                state: ['', Validators.required],
                maritalStatus: [null, Validators.required],
                monthlyIncome: [null, Validators.required],
                birthDate: [null, Validators.required],

            }),
            contactInformations: this._fb.group({
                phoneList: this._fb.array([]),
                addressList: this._fb.array([]),
            }),
            dependentsList: this._fb.array([]),
        }); // Criando o formulário do usuário com o FormBuilder
    }
}