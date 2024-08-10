const BASE_URL = "https://579igzs65868.vicp.fun/v1";

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions {
    endpoint: string;
    method: RequestMethod;
    API_KEY: string;
    body?: any;
    customHeaders?: Record<string, string>;
}

const fetchRequest = async ({ endpoint, method, API_KEY, body, customHeaders = {} }: FetchOptions): Promise<any> => {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        ...customHeaders
    };

    const options: RequestInit = {
        method,
        headers,
        body: (method === 'POST' || method === 'PUT' || method === 'DELETE') && body ? JSON.stringify(body) : null
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
        }

        return response;
    } catch (error) {
        console.error('请求失败:', error);
        throw error;
    }
}

const createRequest = () => {
    const methods: RequestMethod[] = ['GET', 'POST', 'PUT', 'DELETE'];
    const request: Record<string, (endpoint: string, API_KEY: string, body?: any) => Promise<any>> = {};

    methods.forEach(method => {
        request[method.toLowerCase()] = (endpoint, API_KEY, body = null) =>
            fetchRequest({ endpoint, method, API_KEY, body });
    });

    return request;
}

export default createRequest;