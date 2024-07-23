import React, { useState, useEffect, useRef } from 'react';
import { Image, Icon } from 'semantic-ui-react';
import Slick from 'react-slick';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import '../../scss/components/Slider.scss';


const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    swipeToSlide: true,
    centerMode: true,
};

export function Slider(props) {
    const { data, basePath, song } = props;
    const [size, setSize] = useState(0);
    const [loadCompleted, setLoadCompleted] = useState(false);
    const itemRef = useRef();

    useEffect(() => {
        if (itemRef.current) {
            setSize(itemRef.current.clientWidth);
        }
    }, [loadCompleted]);

    return (
        <Slick {...settings} className="slider">
            {map(data, (item) => {

                if (basePath === 'artists') {
                    const image = window.location.origin + "/storage/" + item.id + "/" + item.image;
                    const url = "artist_detail/" + item.id;

                    return (
                        <Link
                            to={url}
                            key={item.id}
                            className="slider__item"
                            ref={itemRef}
                            onLoad={() => setLoadCompleted(true)}
                        >
                            <Image src={image} alt={item.name} style={{ height: size }} />
                            <h3>{item.name}</h3>
                        </Link>
                    );
                }

                if (basePath === 'albums') {
                    const image = window.location.origin + "/storage/" + item.artist + "/" + item.image;
                    const url = "album_detail/" + item.idAlbum;

                    return (
                        <Link
                            to={url}
                            key={item.id}
                            className="slider__item"
                            ref={itemRef}
                            onLoad={() => setLoadCompleted(true)}
                        >
                            <Image src={image} alt={item.name} style={{ height: size }} />
                            <h3>{item.name}</h3>
                        </Link>
                    );
                }


            })}
        </Slick>
    );
}
