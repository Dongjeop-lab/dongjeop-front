export const GAEventName = {
  // 업로드 관련 이벤트
  UPLOAD: {
    BUTTON_CLICK: 'upload_button_click',
    COMPLETED: 'upload_completed',
  },
} as const;

/**
 * GA 이벤트 파라미터 타입 정의
 */
export interface GAEventParams {
  // 업로드 관련 파라미터
  UPLOAD: {
    source_type?: string;
    entry_type?: string;
    file_size?: number;
    image_key?: string;
    landing_path?: string;
  };
}
