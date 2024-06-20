import React, {useState, useEffect } from 'react';
import { Artist, Album } from  '../../api';
import { useParams } from 'react-router-dom';
import { BannerArtist } from '../../components/Artist';
import { Slider } from '../../components/Shared';
import './ArtistDetail.scss';

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


            <BannerArtist image={artist.image} name={artist.name} />

            <div className='artist-page__slider'>
                <h2>Albumes</h2>
                <Slider data={albums} basePath="album_detail" />
            </div>

        </div>
    );
}