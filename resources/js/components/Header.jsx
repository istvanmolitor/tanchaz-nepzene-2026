import React from 'react';
import headerImage from '../../images/header.jpg';
import headerTextImage from '../../images/header-text.png';

function Header() {
    return (
        <div className="grid grid-cols-2">
            <div>
                <img
                src={headerImage}
                alt="Fejléc kép"
                className="w-auto object-contain"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
            />
            </div>
            <div>
                <img
                src={headerTextImage}
                alt="Fejléc szöveg"
                className="w-auto object-contain"
                loading="eager"
                decoding="sync"
            />
            </div>
        </div>
    );
}

export default Header;
