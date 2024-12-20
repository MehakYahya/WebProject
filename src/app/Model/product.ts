export interface APIResponceModel {
  "message": string,
  "result": boolean,
  "data": any
}
export interface Category {
  categoryId: number,
  categoryName: string,
  parentCategoryId: number,
  userId: number
}
export class Customer {
  CustId: number;
  name: string;
  MobileNo: string;
  Password: string;

  constructor() {
    this.CustId = 0;
    this.MobileNo = '';
    this.name = '';
    this.Password = '';
  }

}

export interface ProductList {
  productId: number;
  productSku: string;
  productName: string;
  productPrice: number;
  productShortName: string;
  productDescription: string;
  createdDate: string;
  deliveryTimeSpan: string;
  categoryId: number;
  productImageUrl: string;
  categoryName: string;
}
interface Product {
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
  selectedQuantity?: number;
}
