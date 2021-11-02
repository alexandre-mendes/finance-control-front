import { Wallet } from "./wallet.model";

export interface RecordDebtor {
    uuid?: string;
    registrationCode?: string;
    title?: string;
    dateDeadline?: Date;
    paid?: boolean;
    value?: number;
    installments?: number;
    wallet?: Wallet;
}