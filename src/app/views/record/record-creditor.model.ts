import { Wallet } from "../wallet/wallet.model";

export interface RecordCreditor {
    wallet?: Wallet;
    title?: string;
    dateTransaction?: Date;
    value?: number;
    uuid?: string;
    received?: boolean;
}