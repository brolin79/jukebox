import React from 'react';
import {Button} from "semantic-ui-react";

export function LoginForm (props) {

    const { openRegister, goBack } = props;

    return (
        <div style={{  backgroundColor: "#999" }}>
            <h1>LoginForm</h1>

            <Button primary onClick={openRegister}>
                Registro
            </Button>
            <Button secondary onClick={goBack}>
                Volver
            </Button>
        </div>
    );
}