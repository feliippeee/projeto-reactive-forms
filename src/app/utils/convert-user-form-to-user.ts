import { IUserForm, IUserFormGeneralInformations, IUserFormPhone } from "../interfaces/user-form.interface";
import { IUser } from "../interfaces/user/user.interface";
import { PhoneList } from "../types/phone-list";

export const convertUserFormToUser = (userForm: IUserForm): IUser => {
    let newUser: Partial<IUser> = {} as IUser;

    newUser = { ...convertGeneralInformations(userForm.generalInformations) };
    newUser.phoneList = [ ...convertPhoneList(userForm.contactInformations.phoneList) ];

    return newUser as IUser;
};

const convertGeneralInformations = (generalInformations: IUserFormGeneralInformations): Partial<IUser> => {
    return {
        name: generalInformations.name,
        email: generalInformations.email,
        country: generalInformations.country,
        state: generalInformations.state,
        maritalStatus: generalInformations.maritalStatus,
        monthlyIncome: generalInformations.monthlyIncome,
        birthDate: '' // Implementar a lógica para converter a data de nascimento do formato do formulário para o formato do objeto IUser,
    };

};

 const convertPhoneList = (phoneList: IUserFormPhone[]): PhoneList => {
        const newUserPhoneList: PhoneList = phoneList.map((phone) => ({
            type: phone.type,
            internationalCode: phone.number.substring(0, 2), // Implementar a lógica para extrair o código internacional do número de telefone do formulário
            areaCode: phone.number.substring(2, 4), // Implementar a lógica para extrair o código de área do número de telefone do formulário
            number: phone.number.substring(4), // Implementar a lógica para extrair o número de telefone do formulário
        }));
        return newUserPhoneList;
    };
             
