import React from 'react';

import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import TextInput from '../TextInput';
import NumericInput from '../NumericInput';

/**
 * Страница 'Настройки'
 */
function SettingsPage() {
  return (
    <>
      <PageHeader />
      <main className="Page-Main Main">
        <div className="Main-Container Container">
          <section className="Main-Settings Settings">
            <h3 className="Settings-Title">Settings</h3>
            <p className="Settings-Text">
              Configure repository connection and synchronization settings.
            </p>
            <form className="Settings-Form" action="/" method="post">
              <fieldset className="Settings-Fieldset">
                <ul className="Settings-Fields">
                  <li className="Settings-Field">
                    <TextInput
                      name="repository"
                      label="GitHub repository"
                      required
                    />
                  </li>
                  <li className="Settings-Field">
                    <TextInput
                      id="command"
                      name="command"
                      label="Build command"
                    />
                  </li>
                  <li className="Settings-Field">
                    <TextInput
                      id="branch"
                      name="branch"
                      label="Main branch"
                    />
                  </li>
                  <li className="Settings-Field">
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
              <div className="Settings-Footer">
                <button
                  className="Settings-Button Button Button_theme_action"
                  type="submit"
                >
                  <span className="Button-Wrapper">
                    <span className="Button-Label">Save</span>
                  </span>
                </button>
                <button
                  className="Settings-Button Button Button_theme_normal"
                  type="button"
                >
                  <span className="Button-Wrapper">
                    <span className="Button-Label">Cancel</span>
                  </span>
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
      <PageFooter />
    </>
  );
}

export default SettingsPage;
