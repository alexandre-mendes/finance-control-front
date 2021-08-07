export interface Exception {
    timestamp?: Date;
    status?: number;
    error?: string;
    message: string;
    path?: string;
}