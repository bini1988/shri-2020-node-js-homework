import { connect } from 'react-redux';
import IndexPageView from './IndexPage';
import { getSettingsValues, fetchSettings } from '../../services/redux/reducer/settings';

function mapStateToProps(state) {
  const settings = getSettingsValues(state);
  return { settings };
}

export default connect(mapStateToProps, { fetchSettings })(IndexPageView);
