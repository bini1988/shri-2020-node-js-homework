import { useState, useRef, useEffect, useCallback } from 'react';

type cb = (...args: any[]) => Promise<any>

function useSubmit(onSubmit: cb, initial: boolean = false): [boolean, cb] {
  const isMounted = useRef(true);
  const [submitting, setSubmitting] = useState<boolean>(initial);
  const handleSubmit = useCallback((...params) => {
    setSubmitting(true);

    return Promise.resolve(onSubmit(...params))
      .then((result: any) => {
        if (isMounted.current) {
          setSubmitting(false);
        }
        return result;
      }).catch((error: any) => {
        if (isMounted.current) {
          setSubmitting(false);
        }
        throw error;
      });
  }, [onSubmit]);

  useEffect(() => () => { isMounted.current = false; }, []);

  return [submitting, handleSubmit];
}

export default useSubmit;
