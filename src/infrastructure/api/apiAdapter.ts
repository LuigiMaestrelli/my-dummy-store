import {
  ApiService,
  ApiResponse,
  ApiRequestConfig
} from '@/infrastructure/ports/apiService';
import axios from 'axios';

const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API
});

async function getRequest<TResponse>(
  url: string,
  config?: ApiRequestConfig
): Promise<ApiResponse<TResponse>> {
  const response = await axiosApi.get<TResponse>(url, config);

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  };
}

async function deleteRequest<TResponse>(
  url: string,
  config?: ApiRequestConfig
): Promise<ApiResponse<TResponse>> {
  const response = await axiosApi.delete<TResponse>(url, config);

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  };
}

async function postRequest<TResponse>(
  url: string,
  data: any,
  config?: ApiRequestConfig
): Promise<ApiResponse<TResponse>> {
  const response = await axiosApi.post<TResponse>(url, data, config);

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  };
}

async function putRequest<TResponse>(
  url: string,
  data: any,
  config?: ApiRequestConfig
): Promise<ApiResponse<TResponse>> {
  const response = await axiosApi.put<TResponse>(url, data, config);

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  };
}

async function patchRequest<TResponse>(
  url: string,
  data: any,
  config?: ApiRequestConfig
): Promise<ApiResponse<TResponse>> {
  const response = await axiosApi.patch<TResponse>(url, data, config);

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  };
}

export function createApi(): ApiService {
  return {
    get: getRequest,
    post: postRequest,
    put: putRequest,
    patch: patchRequest,
    delete: deleteRequest
  };
}
