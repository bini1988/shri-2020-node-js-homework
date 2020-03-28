import { useState } from 'react';

function useSettingsForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const handleChange = (name) => (value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return [{ values }, handleChange];
}

export default useSettingsForm;
