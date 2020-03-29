import { connect } from 'react-redux';
import BuildDetailsPageView from './BuildDetailsPage';
import { getBuildCardById, fetchBuildById } from '../../services/redux/reducer/builds';
import { getSettingOf } from '../../services/redux/reducer/settings';

function mapStateToProps(state, { match }) {
  const id = match && match.params.id;
  const buildCard = getBuildCardById(state, id);
  const repoName = getSettingOf(state, 'repoName');

  return { buildCard, repoName };
}

export default connect(mapStateToProps, { fetchBuildById })(BuildDetailsPageView);
