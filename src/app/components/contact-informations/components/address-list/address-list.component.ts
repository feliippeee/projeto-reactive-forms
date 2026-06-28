import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AddressList } from '../../../../types/address-list';
import { AddressTypeEnum } from '../../../../enums/address-type.enum';
import { IAddress } from '../../../../interfaces/user/address.interface';
import { addressTypeDescriptionMap } from '../../../../utils/address-type-description-map';
import { IAddressToDisplay } from '../../../../interfaces/address-to-display.interface';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent implements OnChanges {
  addressListToDisplay: IAddressToDisplay[] = [];

  @Input({ required: true }) userAddressList: AddressList | undefined = [];
  
  ngOnChanges(changes: SimpleChanges): void {
    const ADDRESS_LIST_LOADED = Array.isArray(changes['userAddressList'].currentValue);

    if(ADDRESS_LIST_LOADED) {
      this.prepareAddressListToDisplay();
    }
  }

  prepareAddressListToDisplay() {
    this.addressListToDisplay = [];

    Object.keys(addressTypeDescriptionMap).map(Number).forEach((addressType: Number) => {
      const addressFound = this.userAddressList?.find((userAddress) => userAddress.type === addressType); // encontando o endereço do tipo atual no map

      this.addressListToDisplay.push(this.returnAddressToDisplay(addressFound, addressType ));
    } );
  }
  
  returnAddressToDisplay(address: IAddress | undefined, addressType: Number): IAddressToDisplay {
    if(!address) {
      return {
        typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
        type: addressType,
        street: '-',
        complement: '-',
        country: '-',
        state: '-',
        city: '-',
      }
     }

     return {
      typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
      ...address,
     }
  }
    
}
