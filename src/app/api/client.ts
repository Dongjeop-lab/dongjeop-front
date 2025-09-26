// 환경별 API 설정
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'development'
    ? 'http://61.109.238.45:8082' // 로컬 개발: 원격 백엔드
    : 'http://localhost:8082'); // 도커 배포: 호스트 네트워크

// 개발 환경에서 CORS 문제 해결을 위한 프록시 사용
const USE_PROXY = process.env.NODE_ENV === 'development';
const PROXY_BASE_URL = '/api-proxy';

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
    // 개발 환경에서는 프록시 사용, 프로덕션에서는 직접 연결
    this.baseURL = USE_PROXY ? PROXY_BASE_URL : baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;

      const response = await fetch(url, {
        // 프록시 사용 시에는 same-origin, 직접 연결 시에는 cors 모드
        mode: USE_PROXY ? 'same-origin' : 'cors',
        credentials: 'omit',
        headers: {
          // Accept 헤더를 제거하고 */*로 변경 (CORS 문제 해결)
          Accept: '*/*',
          // GET 요청에서는 Content-Type이 불필요하므로 조건부 설정
          ...(options.method && options.method !== 'GET'
            ? { 'Content-Type': 'application/json' }
            : {}),
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
   * 현재 시간 조회 API
   */
  async getNow(): Promise<ApiResponse<{ now: string; timestamp: string }>> {
    return this.request('/api/now');
  }
}

export const apiClient = new ApiClient();

export const healthCheck = () => apiClient.healthCheck();
export const getNow = () => apiClient.getNow();
