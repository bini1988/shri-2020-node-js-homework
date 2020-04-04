import { connect } from 'react-redux';
import BuildDetailsPageView from './BuildDetailsPage';
import {
  getBuildCardById,
  getBuildLogsById,
  fetchBuildById,
  fetchBuildLogsById,
} from '../../services/redux/reducer/builds';
import { getSettingOf } from '../../services/redux/reducer/settings';

function mapStateToProps(state, { match }) {
  const id = match && match.params.id;
  const buildCard = getBuildCardById(state, id);
  const buildLogs = getBuildLogsById(state, id);
  const repoName = getSettingOf(state, 'repoName');

  return { buildCard, buildLogs, repoName };
}

export default connect(
  mapStateToProps,
  { fetchBuildById, fetchBuildLogsById },
)(BuildDetailsPageView);
