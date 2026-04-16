import React from 'react';
import headerImage from '../../images/header.jpg';
import headerTextImage from '../../images/header-text.png';

function Header() {
    return (
        <div className="mb-2 flex w-full items-center justify-between gap-4 px-4 py-3">
            <img
                src={headerImage}
                alt="Fejléc kép"
                className="h-16 w-auto object-contain"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
            />
            <img
                src={headerTextImage}
                alt="Fejléc szöveg"
                className="h-16 w-auto object-contain"
                loading="eager"
                decoding="sync"
            />
        </div>
    );
}

export default Header;
