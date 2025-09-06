declare type BaseResponse<T> = {
    code: string;
    message: string;
    data: T;
};
