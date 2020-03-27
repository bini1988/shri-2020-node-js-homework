import React from 'react';
import './Button.scss';

function Button() {
  return (
    <button
      type="button"
      className="Button Button_theme_normal Button_size_s Button_view_tile"
    >
      <span className="Button-Wrapper">
        <svg className="Button-Icon" width="12" height="12">
          <use xlinkHref="#settings" />
        </svg>
        <span className="Button-Label">Settings</span>
      </span>
    </button>
  );
}

export default Button;
