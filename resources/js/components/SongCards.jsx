import React from 'react';
import AudioPlayer from './AudioPlayer';
import ToggleButton from './ToggleButton.jsx';

const DownloadIcon = () => (
    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                    <div key={song.id} className="bg-white overflow-hidden border-b border-slate-100 last:border-b-0">
                        <div className="flex">
                            {/* Bal oldali sáv */}
                            <div className="w-12 flex-shrink-0 flex flex-col items-center py-4 gap-4 border-r border-[#7e6fa0]">
                                <span className="text-xs font-bold text-slate-400">{index + 1}.</span>
                                <ToggleButton
                                    isExpanded={isExpanded}
                                    hasLyrics={hasLyrics}
                                    onClick={toggleLyrics}
                                    songId={song.id}
                                />
                            </div>

                            {/* Jobb oldali tartalom */}
                            <div className="flex-1 p-4 flex flex-col">
                                <div className="mb-2">
                                    <h3 className="font-bold text-slate-900 leading-tight">
                                        {song.title} {song.region && <span className="text-sm font-normal text-slate-600">({song.region})</span>}
                                    </h3>
                                    {song.title_en && (
                                        <p className="text-sm text-slate-700 italic">
                                            {song.title_en} {song.region_en && <span>({song.region_en})</span>}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm text-slate-700 font-medium">{song.artist}</p>
                                </div>

                                <div className="mt-4 flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
                                    <div className="flex-1">
                                        <AudioPlayer src={song.playUrl} />
                                    </div>
                                    <div className="flex items-center gap-4 flex-shrink-0">
                                        <span className="text-xs font-mono text-slate-500">{song.length}</span>
                                        <a
                                            href={song.downloadUrl}
                                            download
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-700 transition hover:bg-slate-100"
                                            title="Letöltés"
                                        >
                                            <DownloadIcon />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isExpanded && (
                            <div id={`lyrics-${song.id}`} className="bg-brand-primary/10 border-t border-brand-primary p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <button
                                        type="button"
                                        onClick={() => toggleLyrics(song.id)}
                                        className="text-slate-700 hover:text-slate-900 transition flex items-center gap-1"
                                        title="Becsuk"
                                    >
                                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7,14l5-5,5,5H7Z"/>
                                        </svg>
                                    </button>
                                </div>
                                <div
                                    className="text-sm text-slate-700"
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
