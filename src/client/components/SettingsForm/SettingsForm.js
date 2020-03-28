import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './SettingsForm.scss';
import Button from '../Button';
import TextInput from '../TextInput';
import NumericInput from '../NumericInput';

const bn = cn('SettingsForm');

/**
 * Форма 'Настройки'
 */
function SettingsForm({ className, onSubmit }) {
  return (
    <section className={classnames(className, bn())}>
      <h3 className={bn('Title')}>Settings</h3>
      <p className={bn('Text')}>
        Configure repository connection and synchronization settings.
      </p>
      <form
        className={bn('Form')}
        action="/"
        method="post"
        onSubmit={onSubmit}
      >
        <fieldset className={bn('Fieldset')}>
          <ul className={bn('Fields')}>
            <li className={bn('Field')}>
              <TextInput
                name="repository"
                label="GitHub repository"
                required
              />
            </li>
            <li className={bn('Field')}>
              <TextInput
                id="command"
                name="command"
                label="Build command"
              />
            </li>
            <li className={bn('Field')}>
              <TextInput
                id="branch"
                name="branch"
                label="Main branch"
              />
            </li>
            <li className={bn('Field')}>
              <NumericInput
                id="interval"
                name="interval"
                label="Synchronize every"
                units="minutes"
                min="0"
                max="1000"
              />
            </li>
          </ul>
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
          />
        </div>
      </form>
    </section>
  );
}

SettingsForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default SettingsForm;
