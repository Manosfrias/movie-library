export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface HttpError extends Error {
  status?: number;
  statusText?: string;
  data?: any;
}

export interface HttpClientConfig {
  baseURL: string;
  timeout: number;
  headers?: Record<string, string>;
  retryAttempts: number;
}

export interface HttpClient {
  get<T>(url: string, config?: RequestInit): Promise<HttpResponse<T>>;
  post<T>(
    url: string,
    data?: any,
    config?: RequestInit
  ): Promise<HttpResponse<T>>;
  put<T>(
    url: string,
    data?: any,
    config?: RequestInit
  ): Promise<HttpResponse<T>>;
  delete<T>(url: string, config?: RequestInit): Promise<HttpResponse<T>>;
}
