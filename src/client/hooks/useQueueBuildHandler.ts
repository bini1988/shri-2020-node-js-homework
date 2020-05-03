/* eslint-disable no-unused-expressions */
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { History } from 'history';
import { AsyncThunkDispatch } from '../services/redux/reducer';
import { queueBuild } from '../services/redux/reducer/builds';
import useNotification from './useNotification';

/**
 * Возвращает обработчик постановки сборки в очередь
 */
function useQueueBuildHandler(history: History) {
  const dispatch = useDispatch<AsyncThunkDispatch>();
  const notify = useNotification();

  return useCallback((commitHash) => {
    if (!commitHash) { return; }

    dispatch(queueBuild(commitHash)).then((build) => {
      notify.onSuccess('Build is successfully queued');
      history && history.push(`/build/${build.id}`);
    }).catch((error: Error) => notify.onError(error.message));
  }, [dispatch, notify, history]);
}

export default useQueueBuildHandler;
