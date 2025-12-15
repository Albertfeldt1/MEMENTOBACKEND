export interface ResponseStructure<T> {
    success: boolean;
    message: string;
    data?: T;
}
export declare const handleSuccess: <T>(data: T, message?: string) => ResponseStructure<T>;
export declare const handleError: (message?: string) => ResponseStructure<null>;
