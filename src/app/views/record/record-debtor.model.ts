export interface RecordDebtor {
    uuid?: string;
    registrationCode?: string;
    title?: string;
    dateDeadline?: Date;
    paid?: boolean;
    value?: number;
    installments?: number;
    walletUuid?: string;
}