'use client';

import { useEffect, useState } from 'react';

import { apiClient } from '@/app/api/client';

interface TestResult {
  name: string;
  status: 'loading' | 'success' | 'error';
  error?: string;
}

export default function Home() {
  const [tests, setTests] = useState<TestResult[]>([
    { name: 'Health Check', status: 'loading' },
    { name: 'Now API', status: 'loading' },
  ]);

  const runTests = async () => {
    setTests([
      { name: 'Health Check', status: 'loading' },
      { name: 'Now API', status: 'loading' },
    ]);

    // Health Check 테스트
    try {
      const result = await apiClient.healthCheck();
      setTests(prev =>
        prev.map((test, i) =>
          i === 0
            ? {
                ...test,
                status: result.success ? 'success' : 'error',
                error: result.error,
              }
            : test
        )
      );
    } catch (error) {
      setTests(prev =>
        prev.map((test, i) =>
          i === 0
            ? {
                ...test,
                status: 'error',
                error: error instanceof Error ? error.message : '연결 실패',
              }
            : test
        )
      );
    }

    // Now API 테스트
    try {
      const result = await apiClient.getNowData();
      setTests(prev =>
        prev.map((test, i) =>
          i === 1
            ? {
                ...test,
                status: result.success ? 'success' : 'error',
                error: result.error,
              }
            : test
        )
      );
    } catch (error) {
      setTests(prev =>
        prev.map((test, i) =>
          i === 1
            ? {
                ...test,
                status: 'error',
                error: error instanceof Error ? error.message : '연결 실패',
              }
            : test
        )
      );
    }
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='mx-auto max-w-2xl'>
        <div className='mb-8 text-center'>
          <h1 className='mb-4 text-3xl font-bold text-gray-900'>
            API 연결 테스트
          </h1>
          <code className='rounded bg-gray-200 px-3 py-1 text-sm'>
            {process.env.NEXT_PUBLIC_API_URL}
          </code>
        </div>

        <div className='space-y-4'>
          {tests.map(test => (
            <div
              key={test.name}
              className='rounded-lg bg-white p-4 shadow-sm'
            >
              <div className='flex items-center justify-between'>
                <span className='font-medium text-gray-900'>{test.name}</span>
                <div className='flex items-center gap-2'>
                  {test.status === 'loading' && <span>⏳</span>}
                  {test.status === 'success' && <span>✅</span>}
                  {test.status === 'error' && <span>❌</span>}
                  <span className='text-sm text-gray-600 capitalize'>
                    {test.status === 'loading'
                      ? '테스트 중'
                      : test.status === 'success'
                        ? '성공'
                        : '실패'}
                  </span>
                </div>
              </div>

              {test.status === 'error' && test.error && (
                <div className='mt-2 rounded bg-red-50 p-2 text-sm text-red-700'>
                  {test.error}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='mt-6 text-center'>
          <button
            type='button'
            disabled={tests.some(test => test.status === 'loading')}
            onClick={runTests}
            className='cursor-pointer rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400'
          >
            다시 테스트
          </button>
        </div>
      </div>
    </div>
  );
}
