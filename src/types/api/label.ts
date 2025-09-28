export type HasStep = 'yes' | 'no' | 'not_sure';
export type WidthClass =
  | 'narrow'
  | 'normal'
  | 'wide'
  | 'impossible'
  | 'not_sure';

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
  service_status: 'init' | 'doing' | 'finished';
}

export interface UpdateLabelRequestBody extends Partial<LabelData> {
  step_label_finish_duration?: number;
  width_label_finish_duration?: number;
  chair_label_finish_duration?: number;
  finish_labeling: boolean;
}
