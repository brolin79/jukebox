import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { User } from '../../../api';
import { initialValues, validationSchema} from "./EmailForm.data";

const user = new User();

export function EmailForm(props) { 

    const { onClose } = props;

    const [showPassword, setShowPassword] = useState(false);

    const onShowHiddenPassword = () => { setShowPassword(!showPassword) };

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                await user.updateEmail(formData.email, formData.password);
                onClose();
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input 
                name='email' 
                icon='mail' 
                placeholder='Email' 
                value={formik.values.email} 
                onChange={formik.handleChange} 
                error={formik.errors.email} 
            />
            <Form.Input
                name='password'
                type={showPassword ? 'text' : 'password'}
                icon={{
                  name: showPassword ? 'eye slash' : 'eye',
                    link: true,
                    onClick: onShowHiddenPassword
                }}
                placeholder='Contraseña'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
            />
            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                Actualizar email
            </Form.Button>
        </Form>

    );
}