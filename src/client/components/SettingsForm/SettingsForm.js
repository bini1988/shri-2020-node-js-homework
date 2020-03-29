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
    <section className={classnames(className, bn())}>
      <h3 className={bn('Title')}>Settings</h3>
      <p className={bn('Text')}>
        Configure repository connection and synchronization settings.
      </p>
      <form className={bn('Form')} onSubmit={handelSubmit}>
        <fieldset className={bn('Fieldset')}>
          <TextInput
            className={bn('Field')}
            name="repoName"
            value={values.repoName}
            label="GitHub repository"
            palceholder="user-name/repo-name"
            required
            onChange={handleChange('repoName')}
          />
          <TextInput
            className={bn('Field')}
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
            id="mainBranch"
            name="mainBranch"
            value={values.mainBranch}
            label="Main branch"
            palceholder="master"
            onChange={handleChange('mainBranch')}
          />
          <NumericInput
            className={bn('Field')}
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
            theme="action"
            label="Save"
            type="submit"
            disabled={!!errors || submitting}
          />
          <Button
            className={bn('Button')}
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
