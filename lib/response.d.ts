import { AxiosError } from 'axios';
export declare const BadRequestError: (message: string, available?: boolean | undefined) => {
    code: number;
    error: string;
    message: string;
    available: boolean | undefined;
};
export declare const NotFoundError: (message: string) => {
    code: number;
    error: string;
    message: string;
};
export declare const InternalServerError: (message: string) => {
    code: number;
    error: string;
    message: string;
};
export declare const ConflictError: (message: string) => {
    code: number;
    error: string;
    message: string;
};
export declare const UnauthorizedError: (message: string) => {
    code: number;
    error: string;
    message: string;
};
export declare const Success: (message: string) => {
    code: number;
    message: string;
    data: string;
};
interface CustomAxiosResponse extends AxiosError {
    original?: {
        routine: string;
    };
}
export declare const generateError: (error: CustomAxiosResponse) => CustomAxiosResponse | {
    code: number;
    error: string;
    message: string;
};
export {};
