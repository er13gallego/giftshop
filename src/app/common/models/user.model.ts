import { Role } from "./role.model";

export class User {
    id: string;
    roleId: Role;
    name: string;
    username: string;
    password: string;
    registeredDate: Date;
    status: boolean;
}