import React from "react";
import { Grid, Loader, Image } from "semantic-ui-react";
import { map, size } from 'lodash';
import { Link } from 'react-router-dom';
import '../../scss/ListAlbums.scss';

export function ListAlbums(props) {

    const { albums } = props;

    if (size(albums) === 0) {
        return (
            <Loader active inline="centered" size="large">Cargando...</Loader>
        );
    }

    return (
        <Grid className="list-albums">

            <Grid.Row columns={6}>
                {map(albums, (album) => (
                    <Grid.Column
                        key={album.id}
                        as={Link}
                        to={`/album_detail/${album.id}`}
                        className="list-albums__album"
                    >
                        <Image src={album.image} alt={album.name} className="list-albums__cover" />
                        <p>{album.name}</p>
                    </Grid.Column>
                ))}
            </Grid.Row>

        </Grid>

    );
}
