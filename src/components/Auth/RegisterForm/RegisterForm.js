import React from 'react';
import {Button} from "semantic-ui-react";

export function RegisterForm (props) {

    const { openLogin, goBack } = props;

    return (
        <div style={{  backgroundColor: "#666" }}>
            <h1>RegisterForm</h1>

            <Button primary onClick={openLogin}>
                Login
            </Button>
            <Button secondary onClick={goBack}>
                Volver
            </Button>
        </div>
    );
}