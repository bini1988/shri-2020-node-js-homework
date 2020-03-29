import { connect } from 'react-redux';
import SettingsPageView from './SettingsPage';
import { getSettingsValues, saveSettings } from '../../services/redux/reducer/settings';

function mapStateToProps(state) {
  const settings = getSettingsValues(state);
  return { settings };
}

export default connect(mapStateToProps, { saveSettings })(SettingsPageView);
