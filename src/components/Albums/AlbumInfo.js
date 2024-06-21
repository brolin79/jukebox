import React, {useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { Artist } from '../../api/';
import '../../scss/components/AlbumInfo.scss';

const ArtistController = new Artist();

export function AlbumInfo(props) {

    const {album : { name, image, artist} } = props;

    const [artistData, setArtistData] = useState(null);

    const root = window.location.origin;
    const ruta = root + '/storage/';

    useEffect(() => {
        (async () => {
            const response = await ArtistController.getArtist(artist);
            setArtistData(response);
        })();
    }, [props.album]);

    return (

    <div className="album-info">
        <Image src={ruta + artist + "/" + image} alt={name} />
        <div>
            <h1>{name}</h1>
            {artistData && <Link to={`/artist_detail/${artistData.id}`}>{artistData.name}</Link>}
        </div>
    </div>        

    );
}
