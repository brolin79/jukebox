import React, {useState, useEffect } from 'react';
import { Artist } from  '../../api';
import { useParams } from 'react-router-dom';
import { BannerArtist } from '../../components/Artist';
import './ArtistDetail.scss';

const ArtistController = new Artist();

export function ArtistDetail (props) {

    const [artist, setArtist] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            const response = await ArtistController.getArtist(id);
            setArtist(response);
        })();
    }, [id]);


    if (!artist) return null;

    return (
        <div className='artist-page'>


            <BannerArtist image={artist.image} name={artist.name} />

            <div className='artist-page__slider'>
                <h2>Albumes</h2>
            </div>

            <div className='artist-page__slider'>
                <h2>Canciones</h2>
            </div>

        </div>
    );
}