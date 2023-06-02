import { Category } from "./category.model";
import { Color } from "./color.model";
import { Size } from "./size.model";

export class Product {
    id: string;
    name: string;
    colorId: Color;
    catId: Category;
    sizeId: Size;
    stock: number;
    price: number;
    status: boolean;
    pic_url: string;
}