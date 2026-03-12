import { ProductType } from "./ProductType";

export interface Product {
  title: string;
  imageUrl: string;
  basePrice: number;
  taxRate: number;
  discountRate: number;
  productType: ProductType;
  price: number;
  priceWithoutTaxes: number;
}
