import { Wallet } from "./wallet.model";

export interface RecordCreditor {
    wallet?: Wallet;
    title?: string;
    dateTransaction?: Date;
    value?: number;
    id?: string;
    received?: boolean;
}