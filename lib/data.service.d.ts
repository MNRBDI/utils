import { AxiosRequestConfig } from 'axios';
export declare class DataService {
    baseUrl: string;
    constructor(baseUrl: string);
    private getUrl;
    private call;
    count(model: string, config?: AxiosRequestConfig<Object>): Promise<any>;
    findByPk(model: string, id: number, config?: AxiosRequestConfig<Object>): Promise<any>;
    findOne(model: string, config?: AxiosRequestConfig<Object>): Promise<any>;
    findAll(model: string, config?: AxiosRequestConfig<Object>): Promise<any>;
    findAndCount(model: string, config?: AxiosRequestConfig<Object>): Promise<any>;
    find(model: string, config?: AxiosRequestConfig<Object>): Promise<any>;
    create(model: string, body?: Object, config?: AxiosRequestConfig<Object>): Promise<any>;
    update(model: string, id: number, body?: Object, config?: AxiosRequestConfig<Object>): Promise<any>;
    delete(model: string, id: number, config?: AxiosRequestConfig<Object>): Promise<any>;
}
