import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Loader from '../Loader';
import MainPage from '../MainPage';
import BuildHistoryPage from '../BuildHistoryPage';
import useNotification from '../../hooks/useNotification';
import useSubmit from '../../hooks/useSubmit';

/**
 * Главная страница
 */
function IndexPage(props) {
  const { settings, fetchSettings, ...restProps } = props;
  const { onError } = useNotification();
  const [fetching, handleSubmit] = useSubmit({
    initialSubmitting: !settings,
    onSubmit: fetchSettings,
  });

  useEffect(() => {
    if (settings) { return; }

    handleSubmit()
      .catch(() => onError('Can not fetch settings'));
  }, [settings, fetchSettings]);

  if (fetching) {
    return (<Loader className="Page-Loader" />);
  }
  if (settings) {
    return (<BuildHistoryPage {...restProps} />);
  }
  return (<MainPage {...restProps} />);
}

IndexPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  settings: PropTypes.object,
  fetchSettings: PropTypes.func,
};

export default IndexPage;
