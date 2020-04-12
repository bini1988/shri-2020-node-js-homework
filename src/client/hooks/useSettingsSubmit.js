/* eslint-disable implicit-arrow-linebreak */
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useNotification from './useNotification';
import { saveSettings } from '../services/redux/reducer/settings';

const Nop = () => {};

/**
 * Отправка формы настроек
 * @param {Object} params
 * @param {Function} params.onSuccess
 * @param {Function} params.onError
 * @return {Function}
 */
function useSettingsSubmit(params = {}) {
  const { onSuccess = Nop, onError = Nop } = params;
  const dispatch = useDispatch();
  const notify = useNotification();

  return useCallback((values) =>
    dispatch(saveSettings(values))
      .then(() => {
        onSuccess(values);
        notify.onSuccess('Settings successfully saved');
      }).catch((error) => {
        onError(error);
        notify.onError(`Can not save settings: ${error.message}`);
      }),
  [dispatch, onSuccess, onError, notify]);
}

export default useSettingsSubmit;
