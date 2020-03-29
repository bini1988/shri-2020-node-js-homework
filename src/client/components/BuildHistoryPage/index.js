import { connect } from 'react-redux';
import BuildHistoryPageView from './BuildHistoryPage';
import { getBuildsCards, fetchBuilds, queueBuild } from '../../services/redux/reducer/builds';

function mapStateToProps(state) {
  const buildsCards = getBuildsCards(state);
  return { buildsCards };
}

export default connect(mapStateToProps, { fetchBuilds, queueBuild })(BuildHistoryPageView);
