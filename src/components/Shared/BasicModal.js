import React from "react";
import { Modal, Icon } from "semantic-ui-react";
import '../../scss/components/BasicModal.scss';

export function BasicModal(props) { 

    const { show, onClose, title, size, children } = props;

    return (
        <Modal size={size} open={show} onClose={onClose} className="basic-modal">
            <Modal.Header>
                <span>{ title }</span>
                <Icon name="close" onClick={onClose} link />
            </Modal.Header>
            <Modal.Content>
                { children }
            </Modal.Content>
        </Modal>

    );
}

BasicModal.defaultProps = {
    size: "tiny"
};