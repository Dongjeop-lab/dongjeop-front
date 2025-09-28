export const BROWSER_PATH = {
  LABEL: {
    UPLOAD: '/label/upload',
  },
} as const;

const DEFAULT_API_ENDPOINT = '/api/v1';

export const API_PATH = {
  LABEL: `${DEFAULT_API_ENDPOINT}/label`,
} as const;
