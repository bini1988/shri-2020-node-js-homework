import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './NewBuildForm.scss';
import Button from '../Button';
import TextInput from '../TextInput';

const bn = cn('NewBuildForm');

/**
 * Форма создания нового билда
 */
function NewBuildForm({ className, onSubmit }) {
  return (
    <section className={classnames(className, bn())}>
      <h3 className={bn('Title')}>New build</h3>
      <form
        className={bn('Form')}
        action="/"
        method="post"
        onSubmit={onSubmit}
      >
        <p className={bn('Text')}>
          Configure repository connection and synchronization settings.
        </p>
        <TextInput
          id="commit"
          name="commit"
          palceholder="Commit hash"
        />
        <div className={bn('Footer')}>
          <Button
            className={bn('Button')}
            theme="action"
            label="Run build"
          />
          <Button
            className={bn('Button')}
            theme="secondary"
            label="Cancel"
          />
        </div>
      </form>
    </section>
  );
}

NewBuildForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default NewBuildForm;
