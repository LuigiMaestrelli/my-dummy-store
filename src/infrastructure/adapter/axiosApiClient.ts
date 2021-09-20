import {
  IApiClient,
  ApiResponse,
  ApiRequestConfig
} from '@/application/protocols/apiClient';
import axios, { AxiosInstance } from 'axios';

const axiosApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API
});

export class AxiosApiClient implements IApiClient {
  updateAuth = (token: string) => {
    if (token) {
      axiosApi.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      axiosApi.defaults.headers.Authorization = null;
    }
  };

  async get<TResponse>(
    url: string,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<TResponse>> {
    const response = await axiosApi.get<TResponse>(url, config);

    const totalCount = parseInt(response.headers['x-total-count'] || 0);

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      total: totalCount
    };
  }

  async delete<TResponse>(
    url: string,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<TResponse>> {
    const response = await axiosApi.delete<TResponse>(url, config);

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      total: 0
    };
  }

  async post<TResponse>(
    url: string,
    data: any,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<TResponse>> {
    const response = await axiosApi.post<TResponse>(url, data, config);

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      total: 0
    };
  }

  async put<TResponse>(
    url: string,
    data: any,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<TResponse>> {
    const response = await axiosApi.put<TResponse>(url, data, config);

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      total: 0
    };
  }

  async patch<TResponse>(
    url: string,
    data: any,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<TResponse>> {
    const response = await axiosApi.patch<TResponse>(url, data, config);

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      total: 0
    };
  }
}
