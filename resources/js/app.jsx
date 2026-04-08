import './bootstrap';
import '../css/app.css';
import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

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
        <div className="min-h-screen bg-slate-100 px-4 py-8">
            <div className="mx-auto w-full max-w-6xl rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h1 className="mb-6 text-2xl font-semibold text-slate-900">Zeneszámok</h1>

                <div className="mb-5">
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Keresés cím vagy előadó alapján..."
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-900 outline-none ring-sky-200 placeholder:text-slate-500 focus:ring-4"
                    />
                </div>

                {loading && <p className="text-sm text-slate-600">Betöltés...</p>}

                {!loading && error && <p className="text-sm text-rose-600">{error}</p>}

                {!loading && !error && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="w-12 px-2 py-3 font-semibold text-slate-700">Nyitás</th>
                                    <th className="px-4 py-3 font-semibold text-slate-700">Zene címe</th>
                                    <th className="px-4 py-3 font-semibold text-slate-700">Előadó</th>
                                    <th className="px-4 py-3 font-semibold text-slate-700">Lejátszás</th>
                                    <th className="px-4 py-3 font-semibold text-slate-700">Letöltés</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {filteredSongs.map((song) => {
                                    const isExpanded = expandedSongIds.includes(song.id);

                                    return (
                                        <React.Fragment key={song.id}>
                                            <tr className="align-middle">
                                                <td className="px-2 py-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleLyrics(song.id)}
                                                        aria-expanded={isExpanded}
                                                        aria-controls={`lyrics-${song.id}`}
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition hover:bg-slate-100"
                                                    >
                                                        <svg
                                                            className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                d="M6 8l4 4 4-4"
                                                                stroke="currentColor"
                                                                strokeWidth="1.8"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                                <td className="px-4 py-3 text-slate-900">{song.title}</td>
                                                <td className="px-4 py-3 text-slate-700">{song.artist}</td>
                                                <td className="px-4 py-3">
                                                    <audio
                                                        controls
                                                        preload="none"
                                                        src={song.playUrl}
                                                        className="h-10 w-60 max-w-full"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <a
                                                        href={song.downloadUrl}
                                                        download
                                                        className="inline-flex rounded-md bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-700"
                                                    >
                                                        Letöltés
                                                    </a>
                                                </td>
                                            </tr>

                                            {isExpanded && (
                                                <tr id={`lyrics-${song.id}`} className="bg-slate-50">
                                                    <td colSpan={5} className="px-4 py-4">
                                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Dalszöveg</p>
                                                        <p className="mt-2 whitespace-pre-line text-sm text-slate-700">
                                                            {song.lyrics?.trim()
                                                                ? song.lyrics
                                                                : 'Ehhez a dalhoz még nincs dalszöveg.'}
                                                        </p>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>

                        {filteredSongs.length === 0 && (
                            <p className="px-4 py-6 text-sm text-slate-600">Nincs találat a keresésre.</p>
                        )}
                    </div>
                )}
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
