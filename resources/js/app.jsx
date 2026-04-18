import './bootstrap';
import '../css/app.css';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import backgroundImage from '../images/background.jpg';
import headerImage from '../images/header.jpg';
import headerTextImage from '../images/header-text.png';
import SearchInput from './components/SearchInput';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SongsTable from './components/SongsTable';

function InitialPageLoader() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F4BB91] px-4">
            <div className="flex flex-col items-center gap-3 text-[#4f407e]">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4f407e]/25 border-t-[#4f407e]" />
                <p className="text-sm font-semibold tracking-wide uppercase">Betöltés...</p>
            </div>
        </div>
    );
}

function MusicTableApp() {
    const [songs, setSongs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedSongIds, setExpandedSongIds] = useState([]);
    const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
    const [areCriticalImagesReady, setAreCriticalImagesReady] = useState(false);

    useEffect(() => {
        const imageSources = [backgroundImage, headerImage, headerTextImage];
        let readyCount = 0;
        let isCancelled = false;

        const markReady = () => {
            if (isCancelled) {
                return;
            }

            readyCount += 1;

            if (readyCount === imageSources.length) {
                setAreCriticalImagesReady(true);
            }
        };

        imageSources.forEach((src) => {
            const image = new Image();
            let isSettled = false;
            const handleSettled = () => {
                if (isSettled) {
                    return;
                }

                isSettled = true;
                markReady();
            };

            image.onload = handleSettled;
            image.onerror = handleSettled;
            image.src = src;

            if (image.complete) {
                handleSettled();
            }
        });

        return () => {
            isCancelled = true;
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const search = searchTerm.trim();

        const timeoutId = setTimeout(async () => {
            setLoading(true);
            setError('');

            try {
                const params = new URLSearchParams();

                if (search) {
                    params.set('search', search);
                }

                const queryString = params.toString();
                const endpoint = queryString ? `/api/songs?${queryString}` : '/api/songs';

                const response = await fetch(endpoint, { signal: controller.signal });

                if (!response.ok) {
                    throw new Error('Nem sikerült lekérdezni a zeneszámokat.');
                }

                const data = await response.json();
                const songsList = Array.isArray(data) ? data : [];
                const visibleSongIds = new Set(songsList.map((song) => song.id));

                setSongs(songsList);
                setExpandedSongIds((previousIds) => previousIds.filter((id) => visibleSongIds.has(id)));
            } catch (err) {
                if (err instanceof Error && err.name === 'AbortError') {
                    return;
                }

                setError(err instanceof Error ? err.message : 'Ismeretlen hiba történt.');
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                    setIsInitialLoadComplete(true);
                }
            }
        }, 250);

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [searchTerm]);

    const toggleLyrics = (songId) => {
        setExpandedSongIds((previousIds) => {
            if (previousIds.includes(songId)) {
                return previousIds.filter((id) => id !== songId);
            }

            return [...previousIds, songId];
        });
    };

    if (!isInitialLoadComplete || !areCriticalImagesReady) {
        return <InitialPageLoader />;
    }

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="max-w-6xl mx-auto">
                <Header />

                <div className="mx-auto w-full bg-[#F4BB91] p-6">

                    <SearchInput value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />

                    {loading && <p className="text-sm text-slate-600">Betöltés...</p>}

                    {!loading && error && <p className="text-sm text-rose-600">{error}</p>}

                    {!loading && !error && (
                        <SongsTable
                            filteredSongs={songs}
                            expandedSongIds={expandedSongIds}
                            toggleLyrics={toggleLyrics}
                        />
                    )}

                </div>
                <Footer />
            </div>
        </div>
    );
}

const rootElement = document.getElementById('app');

if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
            <MusicTableApp />
        </React.StrictMode>,
    );
}
