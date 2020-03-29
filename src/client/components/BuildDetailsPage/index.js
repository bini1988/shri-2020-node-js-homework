import { connect } from 'react-redux';
import BuildDetailsPageView from './BuildDetailsPage';
import { getBuildCardById } from '../../services/redux/reducer/builds';

function mapStateToProps(state, { match }) {
  const id = match && match.params.id;
  const buildCard = getBuildCardById(state, id);

  return { buildCard };
}

export default connect(mapStateToProps)(BuildDetailsPageView);
