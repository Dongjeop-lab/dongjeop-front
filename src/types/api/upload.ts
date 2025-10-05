export enum ImageSource {
  CAMERA = 0, // 직접 촬영
  GALLERY = 1, // 갤러리에서 첨부
}

export interface PostImageRequest {
  image_file: File; // 업로드할 이미지 파일
  source_type: ImageSource; // 이미지 출처
  file_name: string; // 업로드할 이미지 파일명
  terms_agreed: boolean; // 이용약관 동의
  privacy_agreed: boolean; // 개인정보 관련 동의
}

export interface PostImageResponse {
  image_key: string;
}
