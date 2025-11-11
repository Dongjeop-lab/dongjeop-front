export const BROWSER_PATH = {
  LABEL: {
    UPLOAD: '/label/upload',
    LABELING: (imageKey: string) => `/label/${imageKey}`,
    FINISH: (imageKey: string) => `/label/${imageKey}/finish`,
  },
  QUIZ: {
    DEFAULT: '/quiz',
  },
  TERMS: {
    SERVICE: '/terms/service',
    PRIVACY_POLICY: '/terms/privacy-policy',
    RESEARCH_PROJECT: '/terms/research-project',
    IMAGE_COLLECTION: '/terms/image-collection',
    PRIVACY_ANONYMIZATION: '/terms/privacy-anonymization',
    COPYRIGHT_PORTRAIT: '/terms/copyright-portrait',
    REWARD_COLLECTION: '/terms/reward-collection',
    FEEDBACK_COLLECTION: '/terms/feedback-collection',
  },
} as const;

export const ENTRY_QUERY = {
  KEY: 'entry',
  VALUE: 'share',
} as const;

export const LANDING_PATH_QUERY = {
  KEY: 'landing_path',
  VALUE: {
    QUIZ: 'quiz', // 퀴즈를 통한 진입
    DIRECT: 'direct', // 랜딩 페이지에서 직접 진입
  },
} as const;

const DEFAULT_API_ENDPOINT = '/api/v1';

export const API_PATH = {
  LABEL: `${DEFAULT_API_ENDPOINT}/label`,
  UPLOAD: `${DEFAULT_API_ENDPOINT}/image`,
  FINISH: `${DEFAULT_API_ENDPOINT}/submissions/result`,
} as const;
