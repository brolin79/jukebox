import React, { useState } from 'react';
import {Form, Icon} from "semantic-ui-react";
import { useFormik } from "formik"
import {initialValues, validationSchema} from "./LoginForm.data";
import './LoginForm.scss';
import { Auth } from "../../../api";

const auth = new Auth();

export function LoginForm (props) {

    const { openRegister, goBack } = props;

    const [showPassword, setShowPassword] = useState(false);

    const [showError, setError] = useState(null);

    const onShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const formik = useFormik({
        initialValues:  initialValues(),
        validateOnChange: false,
        validationSchema: validationSchema(),
        onSubmit: async (formData) => {
            try {
                await auth.login(formData.email, formData.password);
            }
            catch (error) {
                setError(true);
            }
        },
    });

    return (
        <div className='login-form'>
            <h1>Música para todos</h1>

            <Form onSubmit={ formik.handleSubmit }>

                <Form.Input
                    name='email'
                    type='text'
                    placeholder='Email'
                    icon='mail outline'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                />

                <Form.Input
                    name='password' 
                    type={showPassword ? "text" : "password" }
                    placeholder='Contraseña'
                    icon = { 
                        <Icon 
                        name={showPassword ? "eye slash" : "eye" } 
                        link 
                        onClick={onShowPassword}
                        /> 
                    }
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={formik.errors.password}
                />

                <Form.Button type="submit" primary fluid loading={ formik.isSubmitting } >
                    Iniciar Sesión
                </Form.Button>

            </Form>

            <div className='login-form__error' style={{ display: showError ? "block" : "none" }}>
                <p>
                    <span>Email o contraseña no valido, revisa tus datos</span>
                </p>
            </div>

            <div className='login-form__options'>
                <p onClick={goBack}>
                    <Icon name='arrow left' /> Volver
                </p>
                <p>
                    ¿No tienes cuenta?
                    <span onClick={openRegister}>Registrate</span>
                </p>
            </div>

        </div>
    );
}