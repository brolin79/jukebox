import React, { useState } from 'react';
import './Auth.scss';
import { AuthOptions, RegisterForm, LoginForm } from "../../components/Auth";

export function Auth () {

    const [typeform, setTypeForm] = useState(null);

    const openLogin = () => setTypeForm("login");
    const openRegister = () => setTypeForm("register");
    const goBack = () => setTypeForm(null);

    const renderForm = () => {

        if (typeform === "login") return <LoginForm  openRegister={openRegister}  goBack={goBack} />;

        if (typeform === "register") return <RegisterForm openLogin={openLogin} goBack={goBack}  />;

        return <AuthOptions openLogin={openLogin} openRegister={openRegister} />;
    };

    return <div>{renderForm()}</div>
}