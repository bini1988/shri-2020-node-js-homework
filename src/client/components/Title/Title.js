import React from 'react';
import PropTypes from 'prop-types';
import './Title.scss';

function Title(props) {
  const { children } = props;

  return (
    <h1 className="PageHeader-Title Title">{children}</h1>
  );
}

Title.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Title;
