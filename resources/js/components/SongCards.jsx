import React from 'react';
import AudioPlayer from './AudioPlayer';
import ToggleButton from './ToggleButton.jsx';

const DownloadIcon = ({ className = 'h-6 w-6 fill-current' }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,16l-5-5,1.4-1.5,2.6,2.6V4h2v8.2l2.6-2.6,1.4,1.5-5,5ZM6,20c-.6,0-1-.2-1.4-.6s-.6-.9-.6-1.4v-3h2v3h12v-3h2v3c0,.6-.2,1-.6,1.4s-.9.6-1.4.6H6Z"/>
    </svg>
);

function SongCards({ filteredSongs, expandedSongIds, toggleLyrics }) {
    if (filteredSongs.length === 0) {
        return <p className="px-4 py-6 text-sm text-slate-600">Nincs találat a keresésre.</p>;
    }

    return (
        <div className="flex flex-col gap-4">
            {filteredSongs.map((song, index) => {
                const isExpanded = expandedSongIds.includes(song.id);
                const hasLyrics = !!song.lyrics?.trim();

                return (
                    <div key={song.id} className="bg-white overflow-hiddenborder-slate-100">
                        <div className="flex">
                            {/* Bal oldali sáv */}
                            <div className="w-12 flex-shrink-0 flex flex-col items-center justify-between pt-4 border-r border-brand-divider">
                                <span className="font-bold text-slate-400">{song.id}.</span>
                                <ToggleButton
                                    isExpanded={isExpanded}
                                    hasLyrics={hasLyrics}
                                    onClick={toggleLyrics}
                                    songId={song.id}
                                />
                            </div>

                            {/* Jobb oldali tartalom */}
                            <div className="flex-1 flex flex-col">
                                <div className="mb-2 pt-4 px-4">
                                    <h3 className="font-bold text-black leading-tight">
                                        <b className="text-brand-accent">{song.title}</b> {song.region && <span className="text-sm font-normal text-slate-600">({song.region})</span>}
                                    </h3>
                                    {song.title_en && (
                                        <p className="text-sm text-black italic">
                                            {song.title_en} {song.region_en && <span>({song.region_en})</span>}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4 p-4">
                                    <p className="text-sm text-black font-medium whitespace-pre-line">{song.artist}</p>
                                </div>

                                <div className="mt-4 flex items-center gap-4">
                                    <a
                                        href={song.downloadUrl}
                                        download
                                        className="ml-4 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-black transition hover:bg-slate-100"
                                        title="Letöltés"
                                    >
                                        <DownloadIcon />
                                    </a>
                                    <div className="flex-1">
                                        <AudioPlayer src={song.playUrl} />
                                    </div>
                                    <div className="flex-shrink-0 bg-black flex items-center h-[50px]">
                                        <span className="text-xs font-mono text-slate-500 text-white px-4">{song.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isExpanded && (
                            <div id={`lyrics-${song.id}`} className="relative bg-white border-t border-brand-divider p-4">
                                <div className="absolute top-0 left-0">
                                    <button
                                        type="button"
                                        onClick={() => toggleLyrics(song.id)}
                                        className="text-slate-700 hover:text-slate-900 transition flex items-center justify-center"
                                        title="Becsuk"
                                    >
                                        <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 14l5-5 5 5z"/>
                                        </svg>
                                    </button>
                                </div>
                                <div
                                    className="pt-10 text-sm text-slate-700"
                                    dangerouslySetInnerHTML={{ __html: song.lyrics?.trim() ? song.lyrics : 'Ehhez a dalhoz még nincs dalszöveg.' }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default SongCards;
