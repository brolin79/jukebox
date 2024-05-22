import React, { useState, useEffect, useRef } from 'react';
import { Image, Icon} from 'semantic-ui-react';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import Slick from 'react-slick';
import './Slider.scss';

export function Slider(props) { 

    const { data, basePath } = props;

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        swipeToSlide: true,
        centerMode: true,
    };

    return (
        <Slick {...settings} classname="slider" >
            {map(data, (item) => {
                return (
                    <Link to={`/${basePath}/${item.id}`} key={item.id} className='slider__item' >
                        <Image src={item.image} alt={item.name} />
                        <h3>{item.name}</h3>
                    </Link>
                );        
            })}
        </Slick>
    );
};