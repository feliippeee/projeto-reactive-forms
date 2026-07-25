import { PhoneTypeEnum } from "../enums/phone-type.enum";
import { IPhone } from "../interfaces/user/phone.interface";
import { PhoneList } from "../types/phone-list";
import { phoneTypeDescriptonMap } from "./phone-type-descripton-map";

export const preparePhoneList = (originalUserPhoneList: PhoneList, callback: (phone: { type: number; typeDescription: string; phoneNumber: string }) => void) => {
    Object.keys(phoneTypeDescriptonMap).map(Number).forEach((phoneType: number) => {
        const phoneFound = originalUserPhoneList.find((userPhone: IPhone) => userPhone.type === phoneType);

        callback({
            type: phoneType,
            typeDescription: phoneTypeDescriptonMap[phoneType as PhoneTypeEnum],
            phoneNumber: phoneFound ? formatPhoneNumber(phoneFound) : '-',
        });
    });
};

const formatPhoneNumber = (phone: IPhone) => {
    return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`;
  }