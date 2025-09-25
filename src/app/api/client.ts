const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  version?: string;
  uptime?: number;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP ${response.status}`,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다',
      };
    }
  }

  /**
   * 백엔드 서버 상태 확인
   */
  async healthCheck(): Promise<ApiResponse<HealthCheckResponse>> {
    return this.request<HealthCheckResponse>('/api/health');
  }

  /**
   * 현재 시간 API 호출
   */
  async getNowData(): Promise<
    ApiResponse<{ message: string; timestamp: string; now?: string }>
  > {
    return this.request('/api/now');
  }
}

export const apiClient = new ApiClient();

export const healthCheck = () => apiClient.healthCheck();
export const getNowData = () => apiClient.getNowData();
