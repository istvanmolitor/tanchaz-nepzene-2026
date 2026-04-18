import React from 'react';

const ArrowDropDown = () => (
    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,15l-5-5h10l-5,5Z"/>
    </svg>
);

const ArrowDropUp = () => (
    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7,14l5-5,5,5H7Z"/>
    </svg>
);

const ArrowDropDownDisable = () => (
    <svg className="h-6 w-6 fill-[#b3b3b3]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,15l-5-5h10l-5,5Z"/>
    </svg>
);

const ToggleButton = ({ isExpanded, hasLyrics, onClick, songId }) => {
    return (
        <button
            type="button"
            onClick={() => hasLyrics && onClick(songId)}
            aria-expanded={isExpanded}
            aria-controls={`lyrics-${songId}`}
            disabled={!hasLyrics}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 transition ${
                !hasLyrics 
                    ? 'cursor-not-allowed opacity-50' 
                    : 'text-slate-700 hover:bg-slate-100'
            }`}
        >
            {!hasLyrics ? (
                <ArrowDropDownDisable />
            ) : isExpanded ? (
                <ArrowDropUp />
            ) : (
                <ArrowDropDown />
            )}
        </button>
    );
};

export default ToggleButton;
