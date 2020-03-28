import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { cn } from '@bem-react/classname';

import './NewBuildDialog.scss';
import NewBuildForm from '../NewBuildForm';

Modal.setAppElement('#app');

const bn = cn('NewBuildDialog');

/**
 * Диалог создания нового билда
 */
function NewBuildDialog(props) {
  const { isOpen, onSubmit, onCancel } = props;

  return (
    <Modal
      isOpen={isOpen}
      portalClassName={bn()}
      closeTimeoutMS={300}
      className={{
        base: bn('Wrapper'),
        afterOpen: bn('Wrapper', { entered: true }),
        beforeClose: bn('Wrapper', { leave: true }),
      }}
      overlayClassName={{
        base: bn('Overlay'),
        afterOpen: bn('Overlay', { entered: true }),
        beforeClose: bn('Overlay', { leave: true }),
      }}
      bodyOpenClassName="Page_noscroll"
      onRequestClose={onCancel}
    >
      <div className={bn('Content')}>
        <NewBuildForm
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </Modal>
  );
}

NewBuildDialog.propTypes = {
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default NewBuildDialog;
