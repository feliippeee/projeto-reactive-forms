import { Component, Input } from '@angular/core';
import { AddressList } from '../../../../types/address-list';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent {
  @Input({ required: true }) userAddressList: AddressList | undefined = [];
}
