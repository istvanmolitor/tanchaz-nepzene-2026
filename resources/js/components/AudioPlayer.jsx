import React from 'react';

function AudioPlayer({ src }) {
    return <audio controls preload="none" src={src} className="h-10 w-60 max-w-full" />;
}

export default AudioPlayer;
