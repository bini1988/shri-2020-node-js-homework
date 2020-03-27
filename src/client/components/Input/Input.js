import React from 'react';
import './Input.scss';

function Input() {
  return (
    <div className="Input Input_cleanable">
      <input className="Input-Control" type="text" id="repository" name="repository" placeholder="user-name/repo-name" />
      <button className="Input-Clear Input-Clear_hidden" type="button">
        <svg className="Input-Icon" width="16" height="16">
          <use xlinkHref="#clear" />
        </svg>
        Clear
      </button>
    </div>
  );
}

export default Input;
