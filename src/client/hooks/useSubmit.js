import { useState, useCallback } from 'react';

function useSubmit({ initialSubmitting, onSubmit }) {
  const [submitting, setSubmitting] = useState(initialSubmitting);
  const handleSubmit = useCallback((...params) => {
    setSubmitting(true);

    return onSubmit(...params)
      .then((result) => {
        setSubmitting(false);
        return result;
      }).catch((error) => {
        setSubmitting(false);
        throw error;
      });
  });

  return [submitting, handleSubmit];
}

export default useSubmit;
