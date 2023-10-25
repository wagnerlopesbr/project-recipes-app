import React from 'react';
import { FormOptions, Validation } from './hookTypes';
import * as helpers from '../Helpers/helpers';

export const formValidation = <Values>(table: Validation<Values>, values: Values) => {
  return Object.keys(table).length === 0
    ? true
    : (Object.keys(table) as (keyof Values)[]).every((field) => {
      const value = values[field] as string;
      const filter = table[field];
      if (!filter) return true;
      switch (filter.filter) {
        case 'strong':
          if (filter.length) return helpers.passwordRegex(filter.length).test(value);
          return helpers.passwordRegex().test(value);
        case 'length':
          if (filter.length) return value.length >= filter.length;
          return value.length >= 6;
        case 'email':
          return helpers.emailRegex.test(value);
        case 'letters_only':
          return helpers.lettersOnlyRegex.test(value);
        case 'any':
          return true;
        default:
          return false;
      }
    });
};

function useForm<Values>({
  initialValues,
  validation = {} as Validation<Values>,
  onSubmit,
  reset = false,
}: FormOptions<Values>) {
  const [values, setValues] = React.useState(initialValues);

  const handleChange = React.useCallback((event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    setValues((prevForm) => ({ ...prevForm, [name]: value }));
  }, []);

  const resetForm = React.useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleSubmit = React.useCallback((event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(values);
    if (reset) resetForm();
  }, [onSubmit, reset, resetForm, values]);

  const validate = React.useMemo(() => {
    return formValidation<Values>(validation, values);
  }, [validation, values]);

  return { values, handleChange, handleSubmit, resetForm, validate };
}

export default useForm;
