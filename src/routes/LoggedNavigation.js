import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Artists, ArtistDetail, Albums, AlbumDetail, Profile } from '../pages';

export function LoggedNavigation () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/artists" element={<Artists />} />
                <Route path="/artist_detail/:id" element={<ArtistDetail />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/album_detail/:id" element={<AlbumDetail />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}