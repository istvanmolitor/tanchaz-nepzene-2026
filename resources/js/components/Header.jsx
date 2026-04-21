import React from 'react';
import headerImage from '../../images/header.jpg';
import headerTextImage from '../../images/header-text.png';

function Header() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:block">
                <img
                src={headerImage}
                alt="Fejléc kép"
                className="w-auto object-contain"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
            />
            </div>
            <div className="flex flex-col items-center justify-center">
                <img
                src={headerTextImage}
                alt="Fejléc szöveg"
                className="w-auto object-contain"
                loading="eager"
                decoding="sync"
            />
                <div className="text-white text-center text-lg md:text-xl">Szerkesztette / <i>Editor:</i> Árendás Péter</div>
            </div>
        </div>
    );
}

export default Header;
