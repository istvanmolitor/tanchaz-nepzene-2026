import React from 'react';
import Header from './Header.jsx';
import AudioPlayer from './AudioPlayer';

const DownloadIcon = () => (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,16l-5-5,1.4-1.5,2.6,2.6V4h2v8.2l2.6-2.6,1.4,1.5-5,5ZM6,20c-.6,0-1-.2-1.4-.6s-.6-.9-.6-1.4v-3h2v3h12v-3h2v3c0,.6-.2,1-.6,1.4s-.9.6-1.4.6H6Z"/>
    </svg>
);

function SongsTable({ filteredSongs, expandedSongIds, toggleLyrics }) {
    return (
        <div className="overflow-x-auto">
            <div className="min-w-[56rem]">
                <table className="w-full divide-y divide-slate-200 text-left text-sm">
                    <thead className="bg-brand-accent border-b-4 border-brand-primary">
                        <tr>
                            <th className="w-12 px-2 py-3 font-semibold text-white border-r border-brand-accent">Nyitás</th>
                            <th className="px-4 py-3 font-semibold text-white border-r border-brand-accent">Zene címe</th>
                            <th className="px-4 py-3 font-semibold text-white border-r border-brand-accent">Előadó</th>
                            <th className="px-4 py-3 font-semibold text-white border-r border-brand-accent">Lejátszás</th>
                            <th className="px-4 py-3 font-semibold text-white text-center">Letöltés</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSongs.map((song) => {
                            const isExpanded = expandedSongIds.includes(song.id);

                            return (
                                <React.Fragment key={song.id}>
                                    <tr className="align-middle border-b-4 bg-white border-brand-primary">
                                        <td className="px-2 py-3 border-r border-brand-accent text-center">
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
                                        <td className="px-4 py-3 text-slate-900 border-r border-brand-accent">{song.title}</td>
                                        <td className="px-4 py-3 text-slate-700 border-r border-brand-accent">{song.artist}</td>
                                        <td className="px-4 py-3 border-r border-brand-accent">
                                            <AudioPlayer src={song.playUrl} />
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <a
                                                href={song.downloadUrl}
                                                download
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-700 transition hover:bg-slate-100"
                                                title="Letöltés"
                                            >
                                                <DownloadIcon />
                                            </a>
                                        </td>
                                    </tr>

                                    {isExpanded && (
                                        <tr id={`lyrics-${song.id}`} className="bg-transparent border-b-4 border-brand-primary">
                                            <td colSpan={5} className="bg-transparent">
                                                <div className=" p-4 border border-brand-secondary w-fit bg-white">
                                                    <p className="text-xs  font-semibold uppercase tracking-wide text-slate-500">Dalszöveg</p>
                                                    <p className="mt-2 whitespace-pre-line text-sm text-slate-700">
                                                        {song.lyrics?.trim() ? song.lyrics : 'Ehhez a dalhoz még nincs dalszöveg.'}
                                                    </p>
                                                </div>
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
