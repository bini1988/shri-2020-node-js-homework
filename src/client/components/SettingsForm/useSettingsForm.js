import { useState, useEffect } from 'react';

function getValuesOrDefaults(initialValues = {}) {
  const {
    repoName = '', buildCommand = '', mainBranch = '', period = 0,
  } = initialValues;
  return {
    repoName, buildCommand, mainBranch, period,
  };
}

function validateValues(values) {
  const errors = {};

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

function useSettingsForm({ initialValues, onSubmit }) {
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState(getValuesOrDefaults(initialValues));
  const errors = validateValues(values);

  useEffect(() => {
    setValues(getValuesOrDefaults(initialValues));
  }, [initialValues]);

  const handleChangeOf = (name) => (value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handelSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    setSubmitting(true);

    onSubmit(values).then((result) => {
      setSubmitting(false);
      return result;
    }).catch((error) => {
      setSubmitting(false);
      throw error;
    });
  };

  return [
    { values, errors, submitting },
    handleChangeOf,
    handelSubmit,
  ];
}

export default useSettingsForm;
