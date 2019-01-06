import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import { inject, observer } from "mobx-react";

@inject(({ formStore }) => ({
  formStore
}))
@observer
class LoginModal extends React.Component {
  render() {
    const {
      formStore: { showLoginModal, toggleModal }
    } = this.props;
    return (
      <Modal isOpen={showLoginModal} toggle={toggleModal}>
        <ModalBody>
          <LoginForm />
        </ModalBody>
      </Modal>
    );
  }
}

export default LoginModal;
