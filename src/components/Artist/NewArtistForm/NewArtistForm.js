import React, { useState, useCallback } from 'react';
import { Form, Image } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { Auth, User } from '../../../api';
import { useFormik } from "formik";
import classNames  from 'classnames';
import { Storage, Artist } from '../../../api';
import { noImage } from '../../../assets';
import { v4 as uuidv4 } from "uuid";
import './NewArtistForm.scss';
import { initialValues, validationSchema} from "./NewArtistForm.data";

const StorageController = new Storage();
const ArtistController = new Artist();

export function NewArtistForm(props) { 

    const { onClose } = props;

    const [image, setImage] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setImage(URL.createObjectURL(file));
        formik.setFieldValue("file", file);
    });

    const { getRootProps, getInputProps } = useDropzone({onDrop});

     const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {

                const { file, name } = formData;
                const response = await StorageController.uploadFile( file, "artists", uuidv4() );
                const url = await StorageController.getUrlFile(response.metadata.fullPath);

                await ArtistController.create(url, name);
                onClose();

            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <Form className='new-artist-form' onSubmit={formik.handleSubmit}>

            <div {...getRootProps()} className={classNames("new-artist-form__avatar", {
                "error": formik.errors.file
            })}
            >
                <input {...getInputProps()} />
                <Image src={image || noImage} className= { classNames ({ full: image }) } />
            </div>

            <Form.Input 
                placeholder='Nombre del artista'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.errors.name}
            />
            <Form.Button type='submit' primary fluid loading={formik.isSubmitting} >Crear artista</Form.Button>
            
        </Form>


    );
}