import React from "react";
import { Grid, Loader, Image } from "semantic-ui-react";
import { map, size } from 'lodash';
import { Link } from 'react-router-dom';
import '../../scss/components/ListAlbums.scss';

export function ListAlbums(props) {

    const { albums } = props;

    const root = window.location.origin;

    if (size(albums) === 0) {
        return (
            <p>Este artista no tiene albumes aun</p>
        );
    }

    return (
        <Grid className="list-albums">

            <Grid.Row columns={6}>
                {map(albums, (album) => (
                    <Grid.Column
                        key={album.idAlbum}
                        as={Link}
                        to={`/album_detail/${album.idAlbum}`}
                        className="list-albums__album"
                    >
                        <Image 
                            src={root + "/storage/" + album.artist  + "/" + album.image} 
                            alt={album.name} 
                            className="list-albums__cover" 
                        />
                        <p>{album.name}</p>
                    </Grid.Column>
                ))}
            </Grid.Row>

        </Grid>

    );
}
