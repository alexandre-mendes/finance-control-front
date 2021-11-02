export interface Page<T> { 
    content: T[];
    pageable: string;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number,
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    },
    numberOfElements: number;
    first: number;
    empty: number;
}