import { useState, useEffect } from 'react';
import useSubmit from '../../hooks/useSubmit';

export type FormValues = Partial<Omit<CI.Settings, 'id'>>;

function validateValues(values: FormValues): FormValues | null {
  const errors: FormValues = {};

  if (!values.repoName) {
    errors.repoName = 'GitHub repository is required';
    return errors;
  }
  if (!values.buildCommand) {
    errors.buildCommand = 'Build command is required';
    return errors;
  }
  return null;
}

export interface IFormParams {
  initial: FormValues;
  onSubmit: (values: FormValues) => Promise<any>;
}
export interface ISettingsForm {
  values: FormValues;
  errors: FormValues | null;
  submitting: boolean;
}
export type ChangeOfHandler = (name: string) => (value?: string) => void;
export type SubmitHandler = (values: FormValues) => void;

function useSettingsForm(params: IFormParams): [
  ISettingsForm,
  ChangeOfHandler,
  SubmitHandler
] {
  const { initial, onSubmit } = params;
  const [values, setValues] = useState<FormValues>(initial);
  const [submitting, handleSubmit] = useSubmit(onSubmit);
  const errors = validateValues(values);
  const form = { values, errors, submitting };
  const handleChangeOf = (name: string) => (value?: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => { setValues(initial); }, [initial]);

  return [form, handleChangeOf, handleSubmit];
}

export default useSettingsForm;
