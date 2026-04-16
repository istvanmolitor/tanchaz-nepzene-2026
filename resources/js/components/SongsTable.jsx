import React from 'react';
import Header from './Header.jsx';
import AudioPlayer from './AudioPlayer';

function SongsTable({ filteredSongs, expandedSongIds, toggleLyrics }) {
    return (
        <div className="overflow-x-auto">
            <div className="min-w-[56rem]">
                <table className="w-full divide-y divide-slate-200 text-left text-sm">
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
                                            <AudioPlayer src={song.playUrl} />
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
                                                    {song.lyrics?.trim() ? song.lyrics : 'Ehhez a dalhoz még nincs dalszöveg.'}
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>

                {filteredSongs.length === 0 && <p className="px-4 py-6 text-sm text-slate-600">Nincs találat a keresésre.</p>}
            </div>
        </div>
    );
}

export default SongsTable;
