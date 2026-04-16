import './bootstrap';
import '../css/app.css';
import React, { useEffect, useMemo, useState } from 'react';
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
        let cancelled = false;

        const loadSongs = async () => {
            try {
                const response = await fetch('/api/songs');

                if (!response.ok) {
                    throw new Error('Nem sikerült lekérni a zeneszámokat.');
                }

                const data = await response.json();

                if (!cancelled) {
                    setSongs(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Ismeretlen hiba történt.');
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadSongs();

        return () => {
            cancelled = true;
        };
    }, []);

    const filteredSongs = useMemo(() => {
        const normalizedTerm = searchTerm.trim().toLowerCase();

        if (!normalizedTerm) {
            return songs;
        }

        return songs.filter((song) => {
            const title = (song.title ?? '').toLowerCase();
            const artist = (song.artist ?? '').toLowerCase();

            return title.includes(normalizedTerm) || artist.includes(normalizedTerm);
        });
    }, [songs, searchTerm]);

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
                            filteredSongs={filteredSongs}
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
