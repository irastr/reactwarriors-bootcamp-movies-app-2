import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from "./LoginForm"

const LoginModal = ({ showLoginModal, toggle, updateSessionId, toggleModal }) => {
    return (
        <Modal isOpen={showLoginModal} toggle={toggle} >
            <ModalBody>
                <LoginForm
                    updateSessionId={updateSessionId}
                    toggleModal={toggleModal}

                />
            </ModalBody>
        </Modal>
    );
}

export default LoginModal;