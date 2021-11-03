export type InputProps = {
  handleChange(event: React.ChangeEvent<{ value: unknown }>): void;
  value: string | number;
  title?: string;
  type?: string;
  width?: string
};
export type InputRowComponentProps = {
  handleChangeSize(data: number): void;
  handleChangeShape(data: string): void;
  handleChangeColor(data: string): void;
  sizeValue: string | number;
  shapeValue: string;
  colorValue: string | number;
  title: string;
  isShapeDisabled: boolean;
};
