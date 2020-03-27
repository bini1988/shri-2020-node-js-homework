import React from 'react';
import PropTypes from 'prop-types';
import './Link.scss';

function Link(props) {
  const { href, label } = props;

  return (
    <a className="Link" href={href}>{label}</a>
  );
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Link;
