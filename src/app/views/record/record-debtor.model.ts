export interface RecordDebtor {
    uuid?: string;
    registrationCode?: string;
    title?: string;
    deadline?: string;
    paid?: boolean;
    value?: number;
    installments?: number;
    walletUuid?: string;
}