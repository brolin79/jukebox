import React, {useState, useEffect } from 'react';
import { Artist } from  '../api';
import { ListArtist } from '../components/Artist';
import '../scss/pages/Artists.scss';

const ArtistController = new Artist();

export function Artists () {

    const [artists, setArtists] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await ArtistController.getLast();
            setArtists(response);
        })();
    }, []);

    return (
        <div className='artists-page'>
            <h1>Artistas</h1>
            <ListArtist artists={artists} />
        </div>
    );
}