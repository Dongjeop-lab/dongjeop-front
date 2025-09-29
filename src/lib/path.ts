export const BROWSER_PATH = {
  LABEL: {
    UPLOAD: '/label/upload',
  },
} as const;

const DEFAULT_API_ENDPOINT = '/v1';

export const API_PATH = {
  LABEL: `${DEFAULT_API_ENDPOINT}/label`,
  NOW: `/now`,
  HEALTH: `/health`,
} as const;
