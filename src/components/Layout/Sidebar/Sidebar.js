import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.scss';

export function Sidebar() {

    const { pathname } = useLocation();

    const isActive = (path) => {
        return path === pathname;
    }


    return (
        <div className='left-menu'>

            <Menu secondary vertical fluid>
                <Menu.Item name='Inicio' icon='home' as={Link} to='/' active={pathname === '/'} />
                <Menu.Item name='Artistas' icon='users' as={Link} to='/artists' active={pathname === '/artists'} />
                <Menu.Item name='Albumes' icon='window maximize outline' as={Link} to='/albums' active={pathname === '/albums'} />
            </Menu>

            <Menu secondary vertical fluid>
                <Menu.Item name='Nueva cancion' icon='plus' link onClick={ () => console.log("Subir cancion") } />
                <Menu.Item name='Nuevo album' icon='plus' link onClick={ () => console.log("Crear album") } />
                <Menu.Item name='Nuevo artista' icon='plus' link onClick={ () => console.log("Crear artista") } />
            </Menu>

        </div>
    );
}