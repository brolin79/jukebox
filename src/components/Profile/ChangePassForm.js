import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { User } from '../../api';
import { initialValues, validationSchema} from "./ChangePassForm.data";

const user = new User();

export function ChangePassForm(props) { 

    const { onClose } = props;

    const [showPassword, setShowPassword] = useState(false);

    const onShowHiddenPassword = () => { setShowPassword(!showPassword) };

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                await user.updatePassword(formData.password, formData.newPassword);
                onClose();
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
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
            <Form.Input
                name='newPassword'
                type={showPassword ? 'text' : 'password'}
                icon={{
                    name: showPassword ? 'eye slash' : 'eye',
                    link: true,
                    onClick: onShowHiddenPassword
                }}
                placeholder='Nueva Contraseña'
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={formik.errors.newPassword}
            />
            <Form.Input
                name='repeatPassword'
                type={showPassword ? 'text' : 'password'}
                icon={{
                    name: showPassword ? 'eye slash' : 'eye',
                    link: true,
                    onClick: onShowHiddenPassword
                }}
                placeholder='Repetir Contraseña'
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                error={formik.errors.repeatPassword}
            />
            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                Actualizar contraseña
            </Form.Button>
        </Form>

    );
}