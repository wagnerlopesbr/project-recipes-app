export type ValidateCommands = 'any' | 'letters_only' | 'length' | 'email' | 'strong';

export type ValidateOptions = {
  filter: ValidateCommands;
  length?: number;
};

export type Validation<Values> = {
  [K in keyof Values]?: ValidateOptions;
};

export type FormOptions<Values> = {
  initialValues: Values;
  onSubmit: (values: Values) => void;
  validation?: Validation<Values>;
  reset?: boolean;
};
