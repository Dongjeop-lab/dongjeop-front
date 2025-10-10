// 그림퀴즈 정답 영역 (px 기준, 360*540 이미지)
export const ANSWER_AREAS = [
  {
    id: 1,
    left: 35,
    top: 127,
    width: 132,
    height: 132,
    markerLeft: 69,
    markerTop: 161,
  },
  {
    id: 2,
    left: 213,
    top: 110,
    width: 147,
    height: 166,
    markerLeft: 283,
    markerTop: 161,
  },
  {
    id: 3,
    left: 90,
    top: 297,
    width: 150,
    height: 150,
    markerLeft: 133,
    markerTop: 340,
  },
] as const;

// 그림퀴즈 관련 사이즈
export const SIZE = {
  IMAGE_WIDTH: 360,
  IMAGE_HEIGHT: 540,
  MARKER: 64,
};
