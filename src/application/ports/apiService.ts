export type ApiResponse<TResponse> = {
  data: TResponse;
  status: number;
  statusText: string;
};

export interface ApiService {
  get<TResponse>(url: string): Promise<ApiResponse<TResponse>>;
  post<TResponse>(url: string, data: any): Promise<ApiResponse<TResponse>>;
  put<TResponse>(url: string, data: any): Promise<ApiResponse<TResponse>>;
  patch<TResponse>(url: string, data: any): Promise<ApiResponse<TResponse>>;
  delete<TResponse>(url: string): Promise<ApiResponse<TResponse>>;
}
