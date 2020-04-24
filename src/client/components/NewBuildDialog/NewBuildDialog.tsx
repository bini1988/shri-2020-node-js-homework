import React, { FC } from 'react';
import Modal from 'react-modal';
import { cn } from '@bem-react/classname';
import './NewBuildDialog.scss';
import NewBuildForm from '../NewBuildForm';
import { INewBuildFormProps } from '../NewBuildForm/NewBuildForm';

Modal.setAppElement('#app');

const bn = cn('NewBuildDialog');

export interface INewBuildDialogProps extends INewBuildFormProps {
  isOpen: boolean;
}

const NewBuildDialog: FC<INewBuildDialogProps> = (props) => (
  <Modal
    isOpen={props.isOpen}
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
    onRequestClose={props.onCancel}
  >
    <div className={bn('Content')}>
      <NewBuildForm
        onSubmit={props.onSubmit}
        onCancel={props.onCancel}
      />
    </div>
  </Modal>
);

export default NewBuildDialog;
