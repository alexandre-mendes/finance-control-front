export interface RecordDebtor {
    uuid?: string;
    registrationCode?: string;
    title?: string;
    deadline?: Date;
    paid?: boolean;
    value?: number;
    installments?: number;
    walletUuid?: string;
}