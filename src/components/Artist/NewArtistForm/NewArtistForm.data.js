import * as Yup from "yup";

export function initialValues () {
    return {
        file: null,
        name: "",
    };
}

export function validationSchema () {
    return Yup.object({
        file: Yup.mixed().required("La imagen del artista es obligatoria"),
        name: Yup.string().required("El nombre del artista es obligatorio"),
    });
}