import React, { useCallback, FC, FormEventHandler } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import './SettingsForm.scss';
import useSettingsForm from './useSettingsForm';
import Button from '../Button';
import TextInput from '../TextInput';
import NumericInput from '../NumericInput';

const bn = cn('SettingsForm');

export interface ISettingsFormProps {
  className?: string;
  label?: string;
  units?: string;
  initial: Partial<CI.Settings>;
  onSubmit: (values: Partial<CI.Settings>) => Promise<any>;
  onCancel: () => void;
}

const SettingsForm: FC<ISettingsFormProps> = (props) => {
  const { className, initial, onSubmit, onCancel } = props;
  const [
    { values, errors, submitting }, onChangeOf, onSubmitHandler
  ] = useSettingsForm({ initial, onSubmit });

  const handelSubmit =
    useCallback<FormEventHandler<HTMLFormElement>>((event) => {
      event.preventDefault();
      onSubmitHandler(values);
    }, [onSubmitHandler, values]);

  return (
    <section
      className={classnames(className, bn())}
      data-test="settings-form"
    >
      <h3 className={bn('Title')} data-test="title">Settings</h3>
      <p className={bn('Text')}>
        Configure repository connection and synchronization settings.
      </p>
      <form
        className={bn('Form')}
        data-test="form"
        onSubmit={handelSubmit}
      >
        <fieldset className={bn('Fieldset')}>
          <TextInput
            className={bn('Field')}
            data-test="repoName"
            id="repoName"
            name="repoName"
            value={values.repoName}
            label="GitHub repository"
            placeholder="user-name/repo-name"
            required
            onChange={onChangeOf('repoName')}
          />
          <TextInput
            className={bn('Field')}
            data-test="buildCommand"
            id="buildCommand"
            name="buildCommand"
            value={values.buildCommand}
            label="Build command"
            placeholder="npm run build"
            required
            onChange={onChangeOf('buildCommand')}
          />
          <TextInput
            className={bn('Field')}
            data-test="mainBranch"
            id="mainBranch"
            name="mainBranch"
            value={values.mainBranch}
            label="Main branch"
            placeholder="master"
            onChange={onChangeOf('mainBranch')}
          />
          <NumericInput
            className={bn('Field')}
            data-test="period"
            id="period"
            name="period"
            value={values.period}
            label="Synchronize every"
            placeholder="999"
            units="minutes"
            min="0"
            max="999"
            onChange={onChangeOf('period')}
          />
        </fieldset>
        <div className={bn('Footer')}>
          <Button
            className={bn('Button')}
            data-test="submit"
            theme="action"
            label="Save"
            type="submit"
            disabled={!!errors || submitting}
          />
          <Button
            className={bn('Button')}
            data-test="cancel"
            label="Cancel"
            disabled={submitting}
            onClick={onCancel}
          />
        </div>
      </form>
    </section>
  );
}

export default SettingsForm;
