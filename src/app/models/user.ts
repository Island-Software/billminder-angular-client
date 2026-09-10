import { Bill } from "./bill";
import { Settings } from "./settings";

export interface User {
    id: number;
    userName: string;
    email: string;
    created: Date;
    lastActive: Date;
    bills: Bill[];
}

export interface UserEditDto {
    id: number;
    userName: string;
    email: string;
    password: string;
    settings: Settings;
}