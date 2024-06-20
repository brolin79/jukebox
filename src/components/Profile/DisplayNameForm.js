import React from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { User } from '../../api';
import { initialValues, validationSchema} from "./DisplayNameForm.data";

const user = new User();

export function DisplayNameForm(props) { 

    const { onClose } = props;

    const { displayName } = user.getMe();

    const formik = useFormik({
        initialValues: initialValues(displayName),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                await user.updateDisplayName(formData.displayName);
                onClose();
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input
                name='displayName'
                icon='user circle'
                placeholder='Nombre'
                value={formik.values.displayName}
                onChange={formik.handleChange}
                error={formik.errors.displayName}
            />
            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                Actualizar nombre
            </Form.Button>
        </Form>

    );
}