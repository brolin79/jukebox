import React, { useState } from 'react';
import {Icon, Form} from "semantic-ui-react";
import { useFormik } from "formik"
import {initialValues, validationSchema} from "./RegisterForm.data";
import '../../scss/components/RegisterForm.scss';
import { Auth } from "../../api";

const auth = new Auth();

export function RegisterForm (props) {

    const { openLogin, goBack } = props;
    const [showPassword, setShowPassword] = useState(false);

    const onShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const formik = useFormik({
        initialValues:  initialValues(),
        validateOnChange: false,
        validationSchema: validationSchema(),
        onSubmit: async (formData) => {
            try {
                await auth.register(formData.email, formData.password);
            }
            catch (error) {
                alert(error);
            }
        },
    });

    return (
        <div className='register-form'>
            <h1>Tu cuenta Jukebox</h1>

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

                <Form.Input
                    name='username'
                    type='text'
                    placeholder='Dinos tu nombre'
                    icon='user circle outline'
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    error={formik.errors.username}
                />

                <Form.Button type="submit" primary fluid loading={ formik.isSubmitting } >
                    Continuar
                </Form.Button>

            </Form>

            <div className='register-form__options'>
                <p onClick={goBack}>
                    <Icon name='arrow left' /> Volver
                </p>
                <p>
                    ¿Ya tienes cuenta?
                    <span onClick={openLogin}>Inicia sesión</span>
                </p>
            </div>

        </div>
    );
}