import { ProductType } from "./ProductType";
import { TAX_RATE, DISCOUNT_RATE } from "../consts";

export class Product {
  public title: string;
  public imageUrl: string;
  public basePrice: number;
  public taxRate: number = TAX_RATE;
  public discountRate: number = DISCOUNT_RATE;
  public productType: ProductType;
  public price: number;
  public priceWithoutTaxes: number;

  constructor(productType: ProductType, title: string, imageUrl: string, basePrice: number) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.basePrice = basePrice;
    this.productType = productType;
    this.price = this.getPrice();
    this.priceWithoutTaxes = this.getPriceWithoutTaxes();
  }

  public getPrice(): number {
    return (this.basePrice * (1 - DISCOUNT_RATE)) * TAX_RATE;
  }

  public getPriceWithoutTaxes(): number {
    return this.basePrice * (1 - DISCOUNT_RATE);
  }
}
