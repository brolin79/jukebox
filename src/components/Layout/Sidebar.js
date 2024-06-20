import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { BasicModal } from '../Shared';
import { NewArtistForm } from '../Artist/NewArtistForm';
import { AddAlbumForm } from '../Albums';
import '../../scss/components/Sidebar.scss';

export function Sidebar() {

    const { pathname } = useLocation();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [contentModal, setContentModal] = useState(null);

    const isActive = (path) => {
        return path === pathname;
    };

    const closeModal = () => {
        setShowModal(false);
        setTitleModal("");
        setContentModal(null);
    };

    
    const openModal = (type) => { 
        if (type === "artist"){    
            setTitleModal("Crear nuevo artista");
            setContentModal(<NewArtistForm onClose={closeModal} />);
        }
        if (type === "album"){    
            setTitleModal("Crear nuevo album");
            setContentModal(<AddAlbumForm onClose={closeModal} />);
        }
        setShowModal(true);
    };
    

    return (
        <>

        <div className='sidebar'>

            <Menu secondary vertical fluid>
                <Menu.Item name='Inicio' icon='home' as={Link} to='/' active={isActive('/')} />
                <Menu.Item name='Artistas' icon='users' as={Link} to='/artists' active={isActive('/artists')} />
                <Menu.Item name='Albumes' icon='window maximize outline' as={Link} to='/albums' active={isActive('/albums')} />
            </Menu>

            <Menu secondary vertical fluid>
                <Menu.Item name='Nuevo artista' icon='plus' link onClick= { () => openModal("artist") } />
                <Menu.Item name='Nuevo album' icon='plus' link onClick= { () => openModal("album") } />
            </Menu>

        </div>

        <BasicModal 
            title={ titleModal }
            show={ showModal }
            onClose={ closeModal }
            children={ contentModal }
        />

        </>
    );
}