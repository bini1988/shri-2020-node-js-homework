/* eslint-disable no-unused-expressions */
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { queueBuild } from '../services/redux/reducer/builds';
import useNotification from './useNotification';

/**
 * Возвращает обработчик постановки сборки в очередь
 * @param {Object} history
 */
function useQueueBuildHandler(history) {
  const dispatch = useDispatch();
  const notify = useNotification();

  return useCallback((commitHash) => {
    if (!commitHash) { return; }

    dispatch(queueBuild(commitHash)).then(({ id }) => {
      notify.onSuccess('Build is successfully queued');
      history && history.push(`/build/${id}`);
    }).catch((error) => notify.onError(error.message));
  }, [dispatch, notify, history]);
}

export default useQueueBuildHandler;
