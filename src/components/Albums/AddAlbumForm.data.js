import * as Yup from "yup";

export function initialValues () {
    return {
        image: null,
        name: "",
        artist: "",
        year: "",
    };
}

export function validationSchema () {
    return Yup.object({
        image: Yup.string().required("Imagen del album es obligatoria"),
        name: Yup.string().required("El nombre del album es obligatorio"),
        artist: Yup.string().required("El artista del album es obligatorio"),
        year: Yup.string().required("El año del album es obligatorio"),
    });
}
