import { Tag } from './tag.model';
import { Wallet } from './wallet.model';

export interface RecordDebtor {
    id?: string;
    registrationCode?: string;
    title?: string;
    dateDeadline?: Date;
    paid?: boolean;
    value?: number;
    installments?: number;
    wallet?: Wallet;
    tag?: Tag;
}
