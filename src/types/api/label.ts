export type HasStep = 'YES' | 'NO' | 'NOT_SURE';
export type WidthClass =
  | 'NARROW'
  | 'NORMAL'
  | 'WIDE'
  | 'IMPOSSIBLE'
  | 'NOT_SURE';

export interface LabelData {
  has_step: HasStep;
  width_class: WidthClass;
  has_movable_chair: boolean;
  has_high_chair: boolean;
  has_fixed_chair: boolean;
  has_floor_chair: boolean;
  is_not_sure_chair: boolean;
}

export interface GetLabelStatusResponse extends Partial<LabelData> {
  service_status: 'INIT' | 'DOING' | 'FINISHED';
}

export interface UpdateLabelRequestBody extends Partial<LabelData> {
  step_label_finish_duration?: number;
  width_label_finish_duration?: number;
  chair_label_finish_duration?: number;
  finish_labeling: boolean;
}
