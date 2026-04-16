import './bootstrap';
import '../css/app.css';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import backgroundImage from '../images/background.jpg';
import SearchInput from './components/SearchInput';
import TableHeader from './components/TableHeader';
import TableFooter from './components/TableFooter';
import SongsTable from './components/SongsTable';

function MusicTableApp() {
    const [songs, setSongs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedSongIds, setExpandedSongIds] = useState([]);

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
                    throw new Error('Nem sikerült lekérni a zeneszámokat.');
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

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat px-4 py-8"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="max-w-6xl mx-auto">
                <TableHeader />

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
                <TableFooter />
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
