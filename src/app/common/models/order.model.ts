import { User } from "./user.model";

export class Order {
    id: string;
    userId: User;
    total: number;
    registeredDate: Date;
    status: boolean;
    products: string;
}