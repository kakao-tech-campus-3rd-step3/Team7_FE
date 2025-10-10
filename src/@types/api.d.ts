declare type BaseResponse<T> = {
    code: string;
    message: string;
    data: T;
};

declare type BasePaginatedResponse<T> = BaseResponse<{
    totalElements: number;
    totalPages: number;
    pageable: {
        paged: boolean;
        pageNumber: number;
        pageSize: number;
        offset: number;
        sort: {
            sorted: boolean;
            empty: boolean;
            unsorted: boolean;
        };
        unpaged: boolean;
    };
    size: number;
    content: T;
    number: number;
    sort: {
        sorted: boolean;
        empty: boolean;
        unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}>;
