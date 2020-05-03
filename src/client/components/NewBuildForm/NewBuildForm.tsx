import React, { useState, useCallback, FC } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './NewBuildForm.scss';
import Button from '../Button';
import TextInput from '../TextInput';

const bn = cn('NewBuildForm');

export interface INewBuildFormProps {
  className?: string;
  onSubmit?: (params: { commit: string }) => void;
  onCancel?: () => void;
}

const NewBuildForm: FC<INewBuildFormProps> = (props) => {
  const [commit = '', onCommitChange] = useState<string|undefined>('');
  const { className, onSubmit, onCancel } = props;
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    onSubmit && onSubmit({ commit });
  }, [commit]);

  return (
    <section
      className={classnames(className, bn())}
      data-test="new-build-form"
    >
      <h3 className={bn('Title')}>New build</h3>
      <form
        className={bn('Form')}
        data-test="form"
        onSubmit={handleSubmit}
      >
        <p className={bn('Text')}>
          Configure repository connection and synchronization settings.
        </p>
        <TextInput
          id="commit"
          name="commit"
          value={commit}
          data-test="commit"
          placeholder="Commit hash"
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

export default NewBuildForm;
