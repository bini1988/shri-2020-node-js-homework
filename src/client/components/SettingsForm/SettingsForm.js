import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './SettingsForm.scss';
import useSettingsForm from './useSettingsForm';
import Button from '../Button';
import TextInput from '../TextInput';
import NumericInput from '../NumericInput';

const bn = cn('SettingsForm');

/**
 * Форма 'Настройки'
 */
function SettingsForm(props) {
  const {
    className, initialSettings: initialValues, onSubmit, onCancel,
  } = props;
  const [
    { values, errors, submitting },
    handleChange,
    handelSubmit,
  ] = useSettingsForm({ initialValues, onSubmit });

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
            name="repoName"
            value={values.repoName}
            label="GitHub repository"
            palceholder="user-name/repo-name"
            required
            onChange={handleChange('repoName')}
          />
          <TextInput
            className={bn('Field')}
            data-test="buildCommand"
            id="buildCommand"
            name="buildCommand"
            value={values.buildCommand}
            label="Build command"
            palceholder="npm run build"
            required
            onChange={handleChange('buildCommand')}
          />
          <TextInput
            className={bn('Field')}
            data-test="mainBranch"
            id="mainBranch"
            name="mainBranch"
            value={values.mainBranch}
            label="Main branch"
            palceholder="master"
            onChange={handleChange('mainBranch')}
          />
          <NumericInput
            className={bn('Field')}
            data-test="period"
            id="period"
            name="period"
            value={values.period}
            label="Synchronize every"
            palceholder="999"
            units="minutes"
            min="0"
            max="999"
            onChange={handleChange('period')}
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

SettingsForm.propTypes = {
  className: PropTypes.string,
  initialSettings: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default SettingsForm;
