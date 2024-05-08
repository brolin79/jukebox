import * as Yup from "yup";

export function initialValues () {
    return {
        password: "",
        newPassword: "",
        repeatPassword: "",
    };
}

export function validationSchema () {
    return Yup.object({
        password: Yup.string().required("La contraseña es obligatoria"),
        newPassword: Yup.string().required("La contraseña es obligatoria"),
        repeatPassword: Yup.string()
            .required("La contraseña es obligatoria")
            .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden"),
    });
}