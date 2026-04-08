import React, { useEffect, useRef, useState } from 'react';
import playIcon from '../../images/icons/play.svg';
import pauseIcon from '../../images/icons/pause.svg';
import stopIcon from '../../images/icons/stop.svg';

function AudioPlayer({ src }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) {
            return undefined;
        }

        const handleLoadedMetadata = () => {
            setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handlePlay = () => {
            setIsPlaying(true);
        };

        const handlePause = () => {
            setIsPlaying(false);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
            audio.currentTime = 0;
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [src]);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
    }, [src]);

    const handlePlayPause = async () => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        if (isPlaying) {
            audio.pause();
            return;
        }

        try {
            await audio.play();
        } catch {
            setIsPlaying(false);
        }
    };

    const handleStop = () => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        audio.pause();
        audio.currentTime = 0;
        setCurrentTime(0);
        setIsPlaying(false);
    };

    const handleSeek = (event) => {
        const audio = audioRef.current;
        const nextTime = Number(event.target.value);

        if (!audio || !Number.isFinite(nextTime)) {
            return;
        }

        audio.currentTime = nextTime;
        setCurrentTime(nextTime);
    };

    const sliderMax = duration > 0 ? duration : 1;
    const sliderValue = currentTime > sliderMax ? sliderMax : currentTime;
    const hasStarted = sliderValue > 0;

    return (
        <div className="audio-player" role="group" aria-label="Lejátszó">
            <audio ref={audioRef} preload="none" src={src} />

            <div className="audio-player__controls">
                <button type="button" className="audio-player__button" onClick={handlePlayPause} aria-label={isPlaying ? 'Szünet' : 'Lejátszás'}>
                    <img src={isPlaying ? pauseIcon : playIcon} alt="" aria-hidden="true" className="audio-player__icon" />
                </button>

                {(isPlaying || hasStarted) && (
                    <button type="button" className="audio-player__button" onClick={handleStop} aria-label="Leállítás">
                        <img src={stopIcon} alt="" aria-hidden="true" className="audio-player__icon" />
                    </button>
                )}
            </div>

            <input
                type="range"
                min="0"
                max={sliderMax}
                step="0.01"
                value={sliderValue}
                onChange={handleSeek}
                className={`audio-player__progress ${!isPlaying && !hasStarted ? 'audio-player__progress--idle' : ''}`}
                aria-label="Pozíció"
            />
        </div>
    );
}

export default AudioPlayer;
