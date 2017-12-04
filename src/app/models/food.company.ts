import {Address} from './address';

export class FoodCompany {
  id: number;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  name: string;
  ownerName: string;
  businessCode: number;
  address: Address;
  imageURL: string;
  socialNetworkRefs: object;

  constructor() {
    this.id = 0;
    this.name = '';
    this.username = '';
    this.password = '';
    this.ownerName = '';
    this.businessCode = 0;
    this.imageURL = '';
    this.email = '';
    this.phoneNumber = '';
    this.address = new Address();
    this.socialNetworkRefs = Object.create(null);
  }
}
