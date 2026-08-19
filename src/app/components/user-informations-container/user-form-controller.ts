import { inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../interfaces/user/user.interface";
import { PhoneList } from "../../types/phone-list";
import { AddressList } from "../../types/address-list";
import { DependentsList } from "../../types/dependents-list";
import { convertPtBrDateToDateObj } from "../../utils/convert-pt-br-date-to-date-obj";
import { preparePhoneList } from "../../utils/prepare-phone-list";
import { PhoneTypeEnum } from "../../enums/phone-type.enum";
import { prepareAddressList } from "../../utils/prepare-address-list";
import { requiredAddressValidator } from "../../utils/user-form-validators/required-address-validator";
import { IDependent } from "../../interfaces/user/depedent.interface";
import { UserFormRawValueService } from "../../services/user-form-raw-value.service";

export class UserFormController {
    userForm!: FormGroup; // Propriedade para armazenar o formulário do usuário

    private emailPattern= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    private readonly _fb = inject(FormBuilder); // Injetando o FormBuilder para criar o formulário do usuário
    private readonly _userFormRawValueService = inject(UserFormRawValueService); // Injetando o serviço para armazenar o valor bruto do formulário do usuário
   
    constructor() {
        this.createUserForm(); // Chamando o método para criar o formulário do usuário ao instanciar a classe
        this.watchUserFormValueChangesAndUpdateService();
    }

    get generalInformations(): FormGroup {
        return this.userForm.get('generalInformations') as FormGroup; // Retornando o formulário de informações gerais do usuário
    }

    get contactInformations(): FormGroup {
        return this.userForm.get('contactInformations') as FormGroup; // Retornando o formulário de informações de contato do usuário
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

    get generalInformationsValid(): boolean {
        return this.generalInformations.valid; // Retornando se o formulário de informações gerais do usuário é válido
    }

    get contactInformationsValid(): boolean {
        return this.contactInformations.valid; // Retornando se o formulário de informações de contato do usuário é válido
    }

    get dependentsListValid(): boolean {
        return this.dependentsList.valid; // Retornando se o formulário de informações de dependentes do usuário é válido
    }

    fulfillUserForm(user: IUser) {
        this.resetUserForm(); // Resetando o formulário do usuário antes de preenchê-lo com novos dados

        this.fulfillGeneralInformations(user);  

        this.fulfillPhoneList(user.phoneList);

        this.fulfillAddressList(user.addressList);

        this.fulfillDependentsList(user.dependentsList);

        this.userForm.markAllAsTouched(); // Marcando todos os campos do formulário como "tocados" para exibir mensagens de validação, se houver
        this.userForm.updateValueAndValidity(); // Atualizando o estado de validade do formulário após preenchê-lo com novos dados

        console.log(this.userForm); // Exibindo o valor do formulário do usuário no console
    }

    addDependent() {
        this.dependentsList.push(this.createDependentGroup()); // Adicionando um novo dependente ao formulário
        this.dependentsList.markAsDirty(); // Marcando o formulário de dependentes como "sujo" para indicar que houve alterações
    }

    removeDependent(dependentIndex: number) {
        this.dependentsList.removeAt(dependentIndex); // Removendo o dependente do formulário com base no índice fornecido
        this.dependentsList.markAsDirty(); // Marcando o formulário de dependentes como "sujo" para indicar que houve alterações
    }

    private createDependentGroup(dependent: IDependent | null = null) {
        if(!dependent) {
            return this._fb.group({
                name: ['', Validators.required],
                age: ['', Validators.required],
                document: ['', Validators.required],
            }); // Criando um novo grupo de formulário para um dependente com campos vazios e validadores obrigatórios
        }

        return this._fb.group({
            name: [dependent.name, Validators.required],
            age: [dependent.age, Validators.required],
            document: [dependent.document, Validators.required],
        }); // Criando um novo grupo de formulário para um dependente com os valores fornecidos e validadores obrigatórios
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
            this.dependentsList.push(this.createDependentGroup(dependent));
        })
    }

    private fulfillAddressList(userAddressList: AddressList) {
        prepareAddressList(userAddressList, false, (address) => {
            this.addressList.push(this._fb.group({
                type: [address.type],
                typeDescription: [{value: address.typeDescription, disabled: true}],
                street: [address.street],
                complement: [address.complement],
                country: [address.country],
                state: [address.state],
                city: [address.city],
            }, {
                validators: requiredAddressValidator
            }));
        });
        console.log('addressList', this.addressList);
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

    private watchUserFormValueChangesAndUpdateService() {
        this.userForm.valueChanges.subscribe(() => 
            this._userFormRawValueService.userFormRawValue = this.userForm.getRawValue()); // Monitorando as mudanças no formulário do usuário e atualizando o valor bruto do formulário no serviço
    }
}