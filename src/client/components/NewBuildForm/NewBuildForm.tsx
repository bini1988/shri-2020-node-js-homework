import React, { useState, useCallback, FC } from 'react';
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';
import { useTranslation } from 'react-i18next';

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
  const { className, onSubmit, onCancel } = props;
  const { t } = useTranslation();
  const [commit = '', onCommitChange] = useState<string|undefined>('');
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    onSubmit && onSubmit({ commit });
  }, [commit]);

  return (
    <section
      className={classnames(className, bn())}
      data-test="new-build-form"
    >
      <h3 className={bn('Title')}>{t("new_build_title")}</h3>
      <form
        className={bn('Form')}
        data-test="form"
        onSubmit={handleSubmit}
      >
        <p className={bn('Text')}>
          {t("new_build_description")}
        </p>
        <TextInput
          id="commit"
          name="commit"
          value={commit}
          data-test="commit"
          placeholder={t("commit_hash_label")}
          onChange={onCommitChange}
        />
        <div className={bn('Footer')}>
          <Button
            className={bn('Button')}
            data-test="submit"
            type="submit"
            theme="action"
            label={t("run_build_label")}
            disabled={!commit}
          />
          <Button
            className={bn('Button')}
            data-test="cancel"
            theme="secondary"
            label={t("cancel_label")}
            onClick={onCancel}
          />
        </div>
      </form>
    </section>
  );
}

export default NewBuildForm;
