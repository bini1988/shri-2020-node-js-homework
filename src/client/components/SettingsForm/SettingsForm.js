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
const initialValues = {
  repository: '',
  command: '',
  branch: 'master',
  interval: '',
};

/**
 * Форма 'Настройки'
 */
function SettingsForm(props) {
  const { className, onSubmit, onCancel } = props;
  const [{ values }, handleChange] = useSettingsForm(initialValues);

  return (
    <section className={classnames(className, bn())}>
      <h3 className={bn('Title')}>Settings</h3>
      <p className={bn('Text')}>
        Configure repository connection and synchronization settings.
      </p>
      <form
        className={bn('Form')}
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(values);
        }}
      >
        <fieldset className={bn('Fieldset')}>
          <TextInput
            className={bn('Field')}
            name="repository"
            value={values.repository}
            label="GitHub repository"
            palceholder="user-name/repo-name"
            required
            onChange={handleChange('repository')}
          />
          <TextInput
            className={bn('Field')}
            id="command"
            name="command"
            value={values.command}
            label="Build command"
            palceholder="npm run build"
            required
            onChange={handleChange('command')}
          />
          <TextInput
            className={bn('Field')}
            id="branch"
            name="branch"
            value={values.branch}
            label="Main branch"
            palceholder="master"
            onChange={handleChange('branch')}
          />
          <NumericInput
            className={bn('Field')}
            id="interval"
            name="interval"
            value={values.interval}
            label="Synchronize every"
            palceholder="0"
            units="minutes"
            min="0"
            max="1000"
            onChange={handleChange('interval')}
          />
        </fieldset>
        <div className={bn('Footer')}>
          <Button
            className={bn('Button')}
            theme="action"
            label="Save"
            type="submit"
          />
          <Button
            className={bn('Button')}
            label="Cancel"
            onClick={onCancel}
          />
        </div>
      </form>
    </section>
  );
}

SettingsForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default SettingsForm;
