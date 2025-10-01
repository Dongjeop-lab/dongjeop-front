export const BROWSER_PATH = {
  LABEL: {
    UPLOAD: '/label/upload',
    LABELING: (imageKey: string) => `/label/${imageKey}`,
    FINISH: (imageKey: string) => `/label/${imageKey}/finish`,
  },
} as const;

const DEFAULT_API_ENDPOINT = '/api/v1';

export const API_PATH = {
  LABEL: `${DEFAULT_API_ENDPOINT}/label`,
  UPLOAD: `${DEFAULT_API_ENDPOINT}/image`,
  FINISH: `${DEFAULT_API_ENDPOINT}/submissions/result`,
} as const;
