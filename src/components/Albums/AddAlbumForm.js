import React, { useState, useEffect, useCallback } from 'react';
import classNames from "classnames";
import { Form, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from 'react-dropzone';
import { map } from 'lodash';
import { noImage } from '../../assets';
import { Artist, Album } from '../../api';
import '../../scss/components/AddAlbumForm.scss';
import { initialValues, validationSchema} from "./AddAlbumForm.data";

const ArtistController = new Artist();
const AlbumController = new Album();


export function AddAlbumForm(props) { 

    const { onClose } = props;
    
    const [image, setImage] = useState(noImage);

    const [artistsOptions, setArtistsOptions] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await ArtistController.getAll();
            const artists = map(response, (artist) => ({
                key: artist.id,
                value: artist.id,
                text: artist.name
            }));
            setArtistsOptions(artists);
        })();
    }, []);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                const { image, name, artist, year, canciones } = formData;

                await AlbumController.create(image.name, name, artist, year, canciones);
                onClose();

            } catch (error) {
                console.log(error);
            }
            
        }
    });

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setImage(URL.createObjectURL(file));
        formik.setFieldValue("image", file);
    });

    const { getRootProps, getInputProps } = useDropzone({onDrop});

    return (
       
        <Form className="add-album-form" onSubmit={formik.handleSubmit}>
            <div className="add-album-form__content">

                <div {...getRootProps()} className={classNames("add-album-form__content-image", {
                    error: formik.errors.image
                })}>
                    <input {...getInputProps()} />
                    <Image src={image} />
                </div>

                <div className="add-album-form_content-input">
                    <Form.Input 
                        name="name" 
                        placeholder="Nombre del album"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.errors.name}
                    />
                    <Form.Dropdown 
                        placeholder="Elige el artista" 
                        fluid search selection 
                        options={artistsOptions} 
                        name="artist"
                        value={formik.values.artist}
                        onChange={(e, data) => formik.setFieldValue("artist", data.value)}
                        error={formik.errors.artist}
                    />
                    <Form.Input 
                        name="year" 
                        placeholder="Año del album"
                        value={formik.values.year}
                        onChange={formik.handleChange}
                        error={formik.errors.year}
                    />
                </div>

            </div>

            <div>
                <Form.TextArea className='add-album-form__area'
                    name="canciones"
                    placeholder="01 Canción 1.mp3\n 02 Canción.mp3 2\n"
                    value={formik.values.canciones}
                    onChange={formik.handleChange}
                    error={formik.errors.canciones}
                />
            </div>

            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>Crear album</Form.Button>

        </Form>

    );
}