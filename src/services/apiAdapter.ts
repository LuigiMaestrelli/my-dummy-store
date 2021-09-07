import { ApiService, ApiResponse } from '@/application/ports/apiService';
import axios from 'axios';

const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API
});

export function createApi(): ApiService {
  async function getRequest<TResponse>(
    url: string
  ): Promise<ApiResponse<TResponse>> {
    const response = await axiosApi.get<TResponse>(url);

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    };
  }

  async function deleteRequest<TResponse>(
    url: string
  ): Promise<ApiResponse<TResponse>> {
    const response = await axiosApi.delete<TResponse>(url);

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    };
  }

  async function postRequest<TResponse>(
    url: string,
    data: any
  ): Promise<ApiResponse<TResponse>> {
    const response = await axiosApi.post<TResponse>(url, data);

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    };
  }

  async function putRequest<TResponse>(
    url: string,
    data: any
  ): Promise<ApiResponse<TResponse>> {
    const response = await axiosApi.put<TResponse>(url, data);

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    };
  }

  async function patchRequest<TResponse>(
    url: string,
    data: any
  ): Promise<ApiResponse<TResponse>> {
    const response = await axiosApi.patch<TResponse>(url, data);

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    };
  }

  return {
    get: getRequest,
    post: postRequest,
    put: putRequest,
    patch: patchRequest,
    delete: deleteRequest
  };
}
