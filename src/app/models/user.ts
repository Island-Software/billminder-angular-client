import { Bill } from "./bill";

export interface User {
    id: number;
    userName: string;
    email: string;
    created: Date;
    lastActive: Date;
    bills: Bill[];
}

export interface UserEdit {
    id: number;
    userName: string;
    email: string;
    password: string;
    copyBillsValues: boolean;
}