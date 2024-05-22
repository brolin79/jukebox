import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { Album } from '../../api';
import { AlbumInfo } from '../../components/Albums';
import './AlbumDetail.scss';

const AlbumController = new Album();

export function AlbumDetail () {

    const { id } = useParams();
    const [album, setAlbum] = useState(null);
    
    useEffect(() => {
        (async () => {
            const response = await AlbumController.getAlbum(id);
            setAlbum(response);
        })();
    }, [id]);

    if (!album) return <Loader active inline='centered' size='large' />;


    return (
        <div className='album-detail'>
            <AlbumInfo album={album} />
        </div>
    );
}