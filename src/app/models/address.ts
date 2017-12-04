export class Address {
  id: number;
  country: string;
  city: string;
  district: string;
  street: string;
  building: string;

  constructor() {
    this.id = 0;
    this.city = '';
    this.building = '';
    this.district = '';
    this.street = '';
    this.country = '';
  }
}
