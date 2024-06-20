import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { Album, Song } from '../api';
import { AlbumInfo, ListSongs } from '../components/Albums';
import '../scss/pages/AlbumDetail.scss';

const AlbumController = new Album();
const songController = new Song();

export function AlbumDetail () {

    const { id } = useParams();
    const [album, setAlbum] = useState(null);
    const [songs, setSongs] = useState(null);
    
    useEffect(() => {
        (async () => {
            const response = await AlbumController.getAlbum(id);
            setAlbum(response);
        })();
    }, [id]);

    
    useEffect(() => {
        (async () => {
        try {
            const response = await songController.obtainAllByAlbum(id);
            setSongs(response);
        } catch (error) {
            console.error(error);
        }
        })();
    }, [id]);

    if (!album) return <Loader active inline='centered' size='large' />;


    return (
        <div className='album-detail'>
            <AlbumInfo album={album} />
            <ListSongs songs={songs} miniature={album.image} />
        </div>
    );
}