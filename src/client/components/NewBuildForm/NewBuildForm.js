import React, { useState } from 'react';
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
function NewBuildForm(props) {
  const [commit, onCommitChange] = useState('');
  const { className, onSubmit, onCancel } = props;

  return (
    <section
      className={classnames(className, bn())}
      data-test="new-build-form"
    >
      <h3 className={bn('Title')}>New build</h3>
      <form
        className={bn('Form')}
        data-test="form"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit({ commit });
        }}
      >
        <p className={bn('Text')}>
          Configure repository connection and synchronization settings.
        </p>
        <TextInput
          id="commit"
          name="commit"
          value={commit}
          data-test="commit"
          palceholder="Commit hash"
          onChange={onCommitChange}
        />
        <div className={bn('Footer')}>
          <Button
            className={bn('Button')}
            data-test="submit"
            type="submit"
            theme="action"
            label="Run build"
            disabled={!commit}
          />
          <Button
            className={bn('Button')}
            data-test="cancel"
            theme="secondary"
            label="Cancel"
            onClick={onCancel}
          />
        </div>
      </form>
    </section>
  );
}

NewBuildForm.defaultProps = {
  onSubmit: () => {},
};
NewBuildForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default NewBuildForm;
