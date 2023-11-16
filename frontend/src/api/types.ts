import {AxiosResponse} from 'axios'

export type AxiosPromise<T> = Promise<AxiosResponse<T>>;
export type ResponseType<T extends AxiosPromise<unknown>> = T extends Promise<infer U> ? U : never;
