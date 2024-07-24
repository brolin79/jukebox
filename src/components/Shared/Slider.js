import React, { useState, useEffect, useRef } from 'react';
import { Image } from 'semantic-ui-react';
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
    const { data, basePath } = props;
    const [size, setSize] = useState(0);
    const [loadCompleted, setLoadCompleted] = useState(false);
    const itemRef = useRef();
    
    var id = '';
    var image = '';
    var url = '';
    var name = '';

    useEffect(() => {
        if (itemRef.current) {
            setSize(itemRef.current.clientWidth);
        }
    }, [loadCompleted]);

    return (
        <Slick {...settings} className="slider">
            {map(data, (item) => {

                if (basePath === 'artists') {
                    id = item.id;
                    image = window.location.origin + "/storage/" + item.id + "/" + item.image;
                    url = "artist_detail/" + item.id;
                    name = item.name;
                }

                if (basePath === 'albums') {
                    id = item.idAlbum;
                    image = window.location.origin + "/storage/" + item.artist + "/" + item.image;
                    url = "album_detail/" + item.idAlbum;
                    name = item.name;
                }

                return (
                    <Link
                        to={url}
                        key={id}
                        className="slider__item"
                        ref={itemRef}
                        onLoad={() => setLoadCompleted(true)}
                    >
                        <Image src={image} alt={name} style={{ height: size }} />
                        <h3>{name}</h3>
                    </Link>
                );


            })}
        </Slick>
    );
}
