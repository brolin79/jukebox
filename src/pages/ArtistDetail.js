import React, {useState, useEffect } from 'react';
import { Artist, Album } from  '../api';
import { useParams } from 'react-router-dom';
import { BannerArtist } from '../components/Artist';
import { ListAlbums } from '../components/Albums';
import '../scss/pages/ArtistDetail.scss';

const ArtistController = new Artist();
const AlbumController = new Album();

export function ArtistDetail (props) {

    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await ArtistController.getArtist(id);
            setArtist(response);
        })();
    }, [id]);

    useEffect(() => {
        (async () => {
            const response = await AlbumController.getAlbumsByArtist(id);
            setAlbums(response);
        })();
    }, [id]);


    if (!artist) return null;

    return (
        <div className='artist-page'>


            <BannerArtist id={artist.id} name={artist.name} image={artist.image} />

            <div className='artist-page__slider'>
                <h2>Albumes</h2>
                <ListAlbums albums={albums} />
            </div>

        </div>
    );
}