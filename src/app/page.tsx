'use client';

import { useState } from 'react';

import { API_PATH } from '@/lib/path';

import {
  apiClient,
  ApiResponse,
  HealthCheckResponse,
  NowApiResponse,
} from './api/client';

export default function TestPage() {
  const [healthStatus, setHealthStatus] = useState<ApiResponse | null>(null);
  const [nowData, setNowData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testHealthCheck = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.get<HealthCheckResponse>(API_PATH.HEALTH);

      setHealthStatus(result);
    } catch (err) {
      setError(
        'Health check 요청 실패: ' +
          (err instanceof Error ? err.message : '알 수 없는 오류')
      );
    } finally {
      setLoading(false);
    }
  };

  const testNowAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.get<NowApiResponse>(API_PATH.NOW);
      setNowData(result);
    } catch (err) {
      setError(
        'Now API 요청 실패: ' +
          (err instanceof Error ? err.message : '알 수 없는 오류')
      );
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setHealthStatus(null);
    setNowData(null);
    setError(null);
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='mx-auto max-w-4xl px-4'>
        <div className='rounded-lg bg-white p-6 shadow-lg'>
          <h1 className='mb-8 text-center text-3xl font-bold text-gray-900'>
            🎉 CI/CD 자동 배포 테스트 페이지
          </h1>

          {/* 🚀 배포 정보 섹션 */}
          <div className='mb-8 rounded-lg border border-green-200 bg-green-50 p-4'>
            <h2 className='mb-3 text-lg font-semibold text-green-800'>
              🚀 배포 정보
            </h2>
            <div className='grid gap-3 text-sm text-green-700 md:grid-cols-2'>
              <div>
                <span className='font-medium'>배포 시간:</span>{' '}
                <code className='rounded bg-green-100 px-2 py-1'>
                  {new Date().toLocaleString('ko-KR', {
                    timeZone: 'Asia/Seoul',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </code>
              </div>
              <div>
                <span className='font-medium'>버전:</span>{' '}
                <code className='rounded bg-green-100 px-2 py-1'>
                  v1.0.0-{process.env.NEXT_PUBLIC_BUILD_ID || 'dev'}
                </code>
              </div>
              <div>
                <span className='font-medium'>환경:</span>{' '}
                <code className='rounded bg-green-100 px-2 py-1'>
                  {process.env.NODE_ENV || 'development'}
                </code>
              </div>
              <div>
                <span className='font-medium'>CI/CD 상태:</span>{' '}
                <span className='inline-block rounded-full bg-green-500 px-2 py-1 text-xs text-white'>
                  ✅ 자동 배포 성공
                </span>
              </div>
            </div>
            <div className='mt-3 text-xs text-green-600'>
              💡 이 정보는 매 배포마다 자동으로 업데이트됩니다. 시간이 바뀌면
              새로운 배포가 성공한 것입니다!
            </div>
          </div>

          {/* API 엔드포인트 정보 */}
          <div className='mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4'>
            <h2 className='mb-2 text-lg font-semibold text-blue-800'>
              테스트 가능한 엔드포인트:
            </h2>
            <ul className='space-y-1 text-blue-700'>
              <li>
                •{' '}
                <code className='rounded bg-blue-100 px-2 py-1'>
                  GET /api/health
                </code>{' '}
                - 서버 상태 확인
              </li>
              <li>
                •{' '}
                <code className='rounded bg-blue-100 px-2 py-1'>
                  GET /api/now
                </code>{' '}
                - 현재 시간 조회
              </li>
            </ul>
            <p className='mt-2 text-sm text-blue-600'>
              백엔드 서버:{' '}
              <code className='rounded bg-blue-100 px-2 py-1'>
                {process.env.NEXT_PUBLIC_API_URL}
              </code>
            </p>
          </div>

          {/* 버튼 영역 */}
          <div className='mb-8 flex flex-wrap gap-4'>
            <button
              onClick={testHealthCheck}
              disabled={loading}
              className='cursor-pointer rounded-lg bg-green-500 px-6 py-3 font-medium text-white transition-colors hover:bg-green-600 disabled:bg-gray-400'
            >
              {loading ? '요청 중...' : 'Health Check 테스트'}
            </button>

            <button
              onClick={testNowAPI}
              disabled={loading}
              className='cursor-pointer rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600 disabled:bg-gray-400'
            >
              {loading ? '요청 중...' : 'Now API 테스트'}
            </button>

            <button
              onClick={clearResults}
              disabled={loading}
              className='cursor-pointer rounded-lg bg-gray-500 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-600 disabled:bg-gray-400'
            >
              결과 지우기
            </button>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className='mb-6 rounded-lg border border-red-200 bg-red-50 p-4'>
              <h3 className='mb-2 font-semibold text-red-800'>❌ 오류 발생</h3>
              <p className='text-red-700'>{error}</p>
            </div>
          )}

          {/* 결과 영역 */}
          <div className='grid gap-6 md:grid-cols-2'>
            {/* Health Check 결과 */}
            <div className='rounded-lg bg-gray-50 p-6'>
              <h3 className='mb-4 text-lg font-semibold text-gray-800'>
                🏥 Health Check 결과
              </h3>
              {healthStatus ? (
                <div className='space-y-2'>
                  <div
                    className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                      healthStatus.success
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {healthStatus.success ? '✅ 성공' : '❌ 실패'}
                  </div>
                  <pre className='overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm text-green-400'>
                    {JSON.stringify(healthStatus, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className='text-gray-500'>아직 테스트하지 않았습니다.</p>
              )}
            </div>

            {/* Now API 결과 */}
            <div className='rounded-lg bg-gray-50 p-6'>
              <h3 className='mb-4 text-lg font-semibold text-gray-800'>
                ⏰ Now API 결과
              </h3>
              {nowData ? (
                <div className='space-y-2'>
                  <div
                    className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                      nowData.success
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {nowData.success ? '✅ 성공' : '❌ 실패'}
                  </div>
                  <pre className='overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm text-green-400'>
                    {JSON.stringify(nowData, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className='text-gray-500'>아직 테스트하지 않았습니다.</p>
              )}
            </div>
          </div>

          {/* 사용법 안내 */}
          <div className='mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
            <h3 className='mb-2 font-semibold text-yellow-800'>📝 사용법</h3>
            <ol className='space-y-1 text-yellow-700'>
              <li>
                1. 백엔드 서버가{' '}
                <code className='rounded bg-yellow-100 px-1'>
                  localhost:8082
                </code>
                에서 실행 중인지 확인하세요.
              </li>
              <li>
                2. 위의 버튼들을 클릭하여 각 API 엔드포인트를 테스트하세요.
              </li>
              <li>3. 응답 결과가 JSON 형태로 표시됩니다.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
