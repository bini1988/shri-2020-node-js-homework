/* eslint-disable implicit-arrow-linebreak */
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useNotification from './useNotification';
import { AsyncThunkDispatch } from '../services/redux/reducer';
import { applySettings } from '../services/redux/reducer/settings';

type ErrorHandler = (error: Error) => void
type SuccessHandler = (values: Partial<CI.Settings>) => void

function useSettingsSubmit(
  onSuccess?: SuccessHandler,
  onError?: ErrorHandler,
) {
  const dispatch = useDispatch<AsyncThunkDispatch>();
  const notify = useNotification();

  return useCallback((values: Partial<CI.Settings>) =>
    dispatch(applySettings(values))
      .then((settings) => {
        onSuccess && onSuccess(settings);
        notify.onSuccess('Settings successfully saved');
      }).catch((error: any) => {
        onError && onError(error);
        notify.onError(`Can not save settings: ${error.message}`);
      }),
  [dispatch, onSuccess, onError, notify]);
}

export default useSettingsSubmit;
