import { useCallback } from 'react';
import { useToasts } from 'react-toast-notifications';

function useNotification() {
  const { addToast } = useToasts();
  const onSuccess = useCallback(
    (msg) => addToast(msg, { appearance: 'success', autoDismiss: true }),
    [addToast],
  );
  const onError = useCallback(
    (msg) => addToast(msg, { appearance: 'error', autoDismiss: true }),
    [addToast],
  );
  return { onSuccess, onError };
}

export default useNotification;
