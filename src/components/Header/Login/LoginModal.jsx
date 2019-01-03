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
    return (
      <Modal
        isOpen={this.props.formStore.showLoginModal}
        toggle={this.props.toggle}
      >
        <ModalBody>
          <LoginForm
            updateSessionId={this.props.updateSessionId}
            toggleModal={this.props.toggleModal}
          />
        </ModalBody>
      </Modal>
    );
  }
}

export default LoginModal;
