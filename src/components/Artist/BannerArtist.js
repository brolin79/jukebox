import React from "react";
import '../../scss/components/BannerArtist.scss';

export function BannerArtist(props) { 

    const { image, name } = props;


    return (
        <div className="artist-banner">
            <div className="artist-banner__image" style={ { backgroundImage: `url(${image})` } }>
                <h1>{name}</h1>
            </div>
        
            <div className="artist-banner__gradient" />
        </div>
    );
}


