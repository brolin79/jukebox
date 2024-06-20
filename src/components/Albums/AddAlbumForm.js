import React, { useState, useEffect, useCallback } from 'react';
import classNames from "classnames";
import { Form, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from 'react-dropzone';
import { map } from 'lodash';
import { noImage } from '../../assets';
import { Artist, Album, Storage } from '../../api';
import { v4 as uuidv4 } from "uuid";
import '../../scss/components/AddAlbumForm.scss';
import { initialValues, validationSchema} from "./AddAlbumForm.data";

const ArtistController = new Artist();
const AlbumController = new Album();
const StorageController = new Storage();


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
                const { image, name, artist } = formData;
                const response = await StorageController.uploadFile( image, "albums", uuidv4() );
                const url = await StorageController.getUrlFile(response.metadata.fullPath);

                await AlbumController.create(url, name, artist);
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
                </div>

            </div>

            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>Crear album</Form.Button>

        </Form>

    );
}