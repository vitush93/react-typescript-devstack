/**
 * Created by gibo on 14.9.17.
 */
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

declare const Conf;
const SERVICE_URL: string = Conf.env.SERVICE_URL;
const REQUEST_TIMEOUT: string = Conf.env.REQUEST_TIMEOUT;

class FetchError extends Error {
    config: AxiosRequestConfig;
    code?: string;
    request?: any;
    response?: AxiosResponse;

    constructor(response: AxiosResponse) {
        super(response.statusText);

        this.config = response.config;
        this.code = String(response.status);
        this.request = response.request;
        this.response = response;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, FetchError.prototype);
    }
}

interface ApiOptions {
    apiVersion?: string;
    [index: string]: any;
}

type PostFetchConfig = {
    allowedCodes?: number[];
    responseType?: ResponseType;
};

function checkStatus(responseConfig: PostFetchConfig) {
    return (response: AxiosResponse) => {
        if (response) {
            if (responseConfig.allowedCodes) {
                if (responseConfig.allowedCodes.indexOf(response.status) >= 0) {
                    return response.data;
                } else {
                    throw new FetchError(response);
                }
            } else if (response.status >= 200 && response.status < 300) {
                return response.data;
            }
            throw new FetchError(response);
        }
    };
}

function checkStatusError(error: AxiosError) {
    if (!error.response) {
        throw new FetchError({
            status: 509,
            data: null,
            statusText: 'Service unavailable',
            headers: null,
            config: null,
        });
    }
    throw new FetchError(error.response);
}

function request(url, options, responseConfig: PostFetchConfig = {}) {
    delete options.noContext;
    return Axios({
        ...options,
        url: url,
        data: options.body,
        headers: {
            ...options.headers,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(checkStatus(responseConfig))
        .catch((err: any) => checkStatusError(err));
}

function getParams(params?: any) {
    if (!params) {
        return '';
    }
    const paramsArray: string[] = [];

    Object.keys(params).map((key: string) => {
        if (params[key] || params[key] === 0) {
            if (Array.isArray(params[key]) && (isEncodedArray(params[key][0]) || isNaN(params[key][0]))) {
                params[key].map((singleParam: any) => {
                    paramsArray.push(`${key}=${singleParam}`);
                });
            } else {
                paramsArray.push(`${key}=${params[key]}`);
            }
        }
    });

    return `?${paramsArray.join('&')}`;
}

export default function api(url, options, params?: any, responseConfig?: PostFetchConfig) {
    let otherOptions = options;

    if ((options as ApiOptions).apiVersion) {
        ({ ...otherOptions } = options);
    }

    if (url.slice(0, 1) !== '/') {
        url = '/' + url;
    }

    return request(
        `${options.url || SERVICE_URL}${url}${getParams(params)}`,
        {
            ...otherOptions,
            timeout: REQUEST_TIMEOUT,
            headers: {
                ...otherOptions.headers,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
        responseConfig,
    );
}

export function isEncodedArray(value: string) {
    const decodedValue = decodeURIComponent(value);
    const firstChar = decodedValue.substring(0, 1);
    const lastChar = decodedValue.slice(-1);

    return firstChar === '[' && lastChar === ']';
}
