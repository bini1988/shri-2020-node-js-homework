import { connect } from 'react-redux';
import BuildHistoryPageView from './BuildHistoryPage';
import { getBuildsItems, fetchBuilds } from '../../services/redux/reducer/builds';

function mapStateToProps(state) {
  const buildsItems = getBuildsItems(state);
  return { buildsItems };
}

export default connect(mapStateToProps, { fetchBuilds })(BuildHistoryPageView);
