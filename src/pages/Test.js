import React, { useState, useEffect, useCallback } from 'react';
import { Form, Image } from "semantic-ui-react";




export function Test() {


    const [canciones, setCanciones] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const aCanciones = canciones.split('\n').map((cancion) => cancion.trim());

        //console.log(aCanciones);

        for (const cancion of aCanciones) {
            // cogemos los 3 primeros caracteres
            const numero = cancion.substring(0, 2);
            // convertimos a integer
            const numeroInt = parseInt(numero, 10);

            // los quitamos de la cancion
            const nombre = cancion.substring(3);

            // quitamos .mp3 del nombre
            const nombreSinMp3 = nombre.substring(0, nombre.length - 4);

            //console.log(numeroInt, nombre, nombreSinMp3);

            console.log(nombreSinMp3);
        }

    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div>
                    <Form.TextArea style={{ minHeight: 200, with: "100%" }}
                        name="canciones"
                        placeholder="01 Canción 1.mp3 02 Canción.mp3 2\n"
                        value={canciones}
                        onChange={(e) => setCanciones(e.target.value)}
                    />
                </div>

                <Form.Button type="submit" primary fluid>Crear album</Form.Button>

            </Form>

        </>
    );
}