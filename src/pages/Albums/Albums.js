import React, { useState, useEffect } from 'react';
import { Album } from '../../api';
import {  ListAlbums } from '../../components/Albums';
import './Albums.scss';

const AlbumController = new Album();

export function Albums () {

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await AlbumController.getAll();
            setAlbums(response);
        })();
    }, []);

    return (
        <div className='albums-page'>
            <h1>Albums</h1>
            <ListAlbums albums={albums} />
        </div>
    );
}