import React from 'react';

const ArrowDropDown = () => (
    <svg className="h-16 w-16 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,15l-5-5h10l-5,5Z"/>
    </svg>
);


const ArrowDropDownDisable = () => (
    <svg className="h-16 w-16 fill-[#b3b3b3]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,15l-5-5h10l-5,5Z"/>
    </svg>
);

const ToggleButton = ({ isExpanded, hasLyrics, onClick, songId }) => {
    if (isExpanded) {
        return null;
    }

    return (
        <button
            type="button"
            onClick={() => hasLyrics && onClick(songId)}
            aria-expanded={isExpanded}
            aria-controls={`lyrics-${songId}`}
            disabled={!hasLyrics}
            className={`inline-flex items-center justify-center transition ${
                !hasLyrics 
                    ? 'cursor-not-allowed opacity-50' 
                    : 'text-slate-700 hover:text-slate-900'
            }`}
        >
            {!hasLyrics ? (
                <ArrowDropDownDisable />
            ) : (
                <ArrowDropDown />
            )}
        </button>
    );
};

export default ToggleButton;
