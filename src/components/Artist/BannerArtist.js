import React from "react";
import '../../scss/components/BannerArtist.scss';

export function BannerArtist(props) { 

    const { id, name, image } = props;

    const root = window.location.origin;
    const ruta = root + '/storage/' + id + '/' +image;

    return (
        <div className="artist-banner">
            <div className="artist-banner__image" style={ { backgroundImage: `url(${ruta})` } }>
                <h1>{name}</h1>
            </div>
        
            <div className="artist-banner__gradient" />
        </div>
    );
}


