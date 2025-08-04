import {
  HttpClient,
  HttpClientConfig,
  HttpError,
  HttpResponse,
} from './HttpClient.types';

export class FetchHttpClient implements HttpClient {
  private config: HttpClientConfig;

  constructor(config: HttpClientConfig) {
    this.config = config;
  }

  async get<T>(url: string, config?: RequestInit): Promise<HttpResponse<T>> {
    return this.request<T>('GET', url, undefined, config);
  }

  async post<T>(
    url: string,
    data?: any,
    config?: RequestInit
  ): Promise<HttpResponse<T>> {
    return this.request<T>('POST', url, data, config);
  }

  async put<T>(
    url: string,
    data?: any,
    config?: RequestInit
  ): Promise<HttpResponse<T>> {
    return this.request<T>('PUT', url, data, config);
  }

  async delete<T>(url: string, config?: RequestInit): Promise<HttpResponse<T>> {
    return this.request<T>('DELETE', url, undefined, config);
  }

  private async request<T>(
    method: string,
    url: string,
    data?: any,
    requestConfig?: RequestInit
  ): Promise<HttpResponse<T>> {
    const fullUrl = url.startsWith('http')
      ? url
      : `${this.config.baseURL}${url}`;

    const fetchConfig: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers,
        ...requestConfig?.headers,
      },
      ...requestConfig,
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      fetchConfig.body = JSON.stringify(data);
    }

    return this.executeWithRetry<T>(fullUrl, fetchConfig);
  }

  private async executeWithRetry<T>(
    url: string,
    config: RequestInit,
    attempt = 1
  ): Promise<HttpResponse<T>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        this.config.timeout
      );

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw await this.createHttpError(response);
      }

      const data = await response.json();

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: this.responseHeadersToObject(response.headers),
      };
    } catch (error) {
      if (attempt < this.config.retryAttempts && this.shouldRetry(error)) {
        await this.delay(Math.pow(2, attempt) * 1000); // Exponential backoff
        return this.executeWithRetry<T>(url, config, attempt + 1);
      }
      throw error;
    }
  }

  private async createHttpError(response: Response): Promise<HttpError> {
    let data;
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }

    const error = new Error(
      `HTTP Error ${response.status}: ${response.statusText}`
    ) as HttpError;
    error.status = response.status;
    error.statusText = response.statusText;
    error.data = data;

    return error;
  }

  private shouldRetry(error: any): boolean {
    if (error.name === 'AbortError') return false;
    if (error.status && error.status >= 400 && error.status < 500) return false;
    return true;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private responseHeadersToObject(headers: Headers): Record<string, string> {
    const headerObj: Record<string, string> = {};
    headers.forEach((value, key) => {
      headerObj[key] = value;
    });
    return headerObj;
  }
}
