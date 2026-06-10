import { PhoneTypeEnum } from "../enums/phone-type.enum";

export const phoneTypeDescriptonMap: { [key in PhoneTypeEnum]: string } = { //tipagem do objeto PhoneTypeEnum que vem em formato number mais vai retornar string ex: 1 vai retornar residencial, 2 vai retornar celular e 3 vai retornar emergencial
      [PhoneTypeEnum.RESIDENTIAL]: 'Residencial',
      [PhoneTypeEnum.MOBILE]: 'Celular',
      [PhoneTypeEnum.EMERGENCY]: 'Emergencial',
    };