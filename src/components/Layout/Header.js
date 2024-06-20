import React from 'react';
import { Icon, Image } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth, User } from '../../api';
import '../../scss/components/Header.scss';

const auth = new Auth();
const user = new User();

export function Header() { 

    const navigate = useNavigate();
    const userData = user.getMe();

    const displayName = userData.displayName || 'John Doe';
    const avatar = userData.photoURL || 'https://react.semantic-ui.com/images/wireframe/square-image.png';

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className='header'>
            <Icon name='angle left' className='header__back' link onClick={goBack} />

            <div className='header__right'>
                <Link to='/profile'>
                    <Image src={ avatar } avatar />
                    <span>{ displayName }</span>
                </Link>

                <Icon name='power' onClick={ auth.logout } link />

            </div>

        </div>


    );
}