import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PhoneList } from '../../../../types/phone-list';
import { PhoneTypeEnum } from '../../../../enums/phone-type.enum';
import { IPhone } from '../../../../interfaces/user/phone.interface';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrl: './phone-list.component.scss'
})
export class PhoneListComponent implements OnChanges {
  phonelistToDisplay: any[] = [];
  @Input({ required: true }) userPhoneList: PhoneList | undefined = [];
  
  ngOnChanges(changes: SimpleChanges) {
   const PHONE_LIST_LOADED = Array.isArray(changes['userPhoneList'].currentValue);
    if (PHONE_LIST_LOADED) {
      this.preparePhoneListToDisplay();
    }
  }
  preparePhoneListToDisplay() {
    this.phonelistToDisplay = [];

    const phoneTypeDescriptonMap: { [key in PhoneTypeEnum]: string } = { //tipagem do objeto PhoneTypeEnum que vem em formato number mais vai retornar string ex: 1 vai retornar residencial, 2 vai retornar celular e 3 vai retornar emergencial
      [PhoneTypeEnum.RESIDENTIAL]: 'Residencial',
      [PhoneTypeEnum.MOBILE]: 'Celular',
      [PhoneTypeEnum.EMERGENCY]: 'Emergencial',
    };

    Object.keys(phoneTypeDescriptonMap).map(Number).forEach((phoneType: Number) => {
      const phoneFound = this.userPhoneList?.find((userPhone: IPhone) => userPhone.type === phoneType);

      this.phonelistToDisplay.push({
        type: phoneTypeDescriptonMap[phoneType as PhoneTypeEnum],
        phoneNumber: phoneFound ? this.formatPhoneNumber(phoneFound) : '-',
      });
    });
  }
  formatPhoneNumber(phone: IPhone) {
    return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`;
  }
}
