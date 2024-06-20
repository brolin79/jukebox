import React, { useState } from 'react';
import { Sidebar, Header, Footer } from '.';
import '../../scss/components/LoggedLayout.scss';

export function LoggedLayout (props) {

    const { children } = props;

    return (
    <div className='logged-layout'>

        <div className='logged-layout__content'>

            <div className='logged-layout__sidebar'>
                <Sidebar />
            </div>

            <div className='logged-layout__children'>
                <div className='logged-layout__top-bar'>
                    <Header />
                </div>
                <div>
                    {children}
                </div>
            </div>

        </div>

        <div className='logged-layout__footer'>
            <Footer />
        </div>

    </div>
    );
}