import React from 'react';
import Header from './Header.jsx';
import AudioPlayer from './AudioPlayer';
import ToggleButton from './ToggleButton.jsx';

const DownloadIcon = () => (
    <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,16l-5-5,1.4-1.5,2.6,2.6V4h2v8.2l2.6-2.6,1.4,1.5-5,5ZM6,20c-.6,0-1-.2-1.4-.6s-.6-.9-.6-1.4v-3h2v3h12v-3h2v3c0,.6-.2,1-.6,1.4s-.9.6-1.4.6H6Z"/>
    </svg>
);


function SongsTable({ filteredSongs, expandedSongIds, toggleLyrics }) {
    return (
        <div className="overflow-x-auto">
            <div className="min-w-[56rem]">
                <table className="w-full divide-y divide-slate-200 text-left text-base">
                    <thead className="bg-brand-accent border-b-8 border-brand-primary">
                        <tr>
                            <th className="w-12 px-2 py-2 font-semibold text-white border-r border-brand-accent">&nbsp;</th>
                            <th className="px-3 py-2 font-semibold text-white border-r border-brand-accent" colSpan={2}>Cím</th>
                            <th className="px-3 py-2 font-semibold text-white border-r border-brand-accent">Előadó</th>
                            <th className="px-3 py-2 font-semibold text-white border-r border-brand-accent text-center">Hossz</th>
                            <th className="px-3 py-2 font-semibold text-white border-r border-brand-accent">Zenehallgatás</th>
                            <th className="px-3 py-2 font-semibold text-white text-center">Letöltés</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSongs.map((song, index) => {
                            const isExpanded = expandedSongIds.includes(song.id);
                            const hasLyrics = !!song.lyrics?.trim();

                            return (
                                <React.Fragment key={song.id}>
                                    <tr className="border-b-8 bg-white border-brand-primary">
                                        <td className="align-top px-2 py-2 border-r border-brand-accent text-center relative h-16">
                                            <div className="absolute top-2 left-0 right-0 flex justify-center">
                                                <span className="font-medium text-slate-500">{song.id}.</span>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                                                <ToggleButton
                                                    isExpanded={isExpanded}
                                                    hasLyrics={hasLyrics}
                                                    onClick={toggleLyrics}
                                                    songId={song.id}
                                                />
                                            </div>
                                        </td>
                                        <td className="align-top px-3 py-2 text-slate-900 border-r border-brand-accent">
                                            <b className="text-brand-accent">{song.title}</b> {song.region && `(${song.region})`}
                                        </td>
                                        <td className="align-top px-3 py-2 text-slate-900 border-r border-brand-accent">
                                            {song.title_en} {song.region_en && `(${song.region_en})`}
                                        </td>
                                        <td className="align-top px-3 py-2 text-slate-700 border-r border-brand-accent">{song.artist}</td>
                                        <td className="align-middle px-3 py-2 text-slate-700 border-r border-brand-accent text-center">{song.length}</td>
                                        <td className="align-middle px-3 py-0 border-r border-brand-accent">
                                            <AudioPlayer src={song.playUrl} />
                                        </td>
                                        <td className="align-middle px-3 py-2 text-center">
                                            <a
                                                href={song.downloadUrl}
                                                download
                                                className="inline-flex h-16 w-16 items-center justify-center rounded-md text-slate-700 transition hover:bg-slate-100"
                                                title="Letöltés"
                                            >
                                                <DownloadIcon />
                                            </a>
                                        </td>
                                    </tr>

                                    {isExpanded && (
                                        <tr id={`lyrics-${song.id}`} className="bg-transparent border-b-4 border-brand-primary">
                                            <td colSpan={7} className="bg-transparent">
                                                <div className="relative p-4 border border-brand-secondary w-fit bg-white">
                                                    <div className="absolute top-0 left-0">
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleLyrics(song.id)}
                                                            className="flex items-center justify-center text-slate-700 hover:text-slate-900 transition"
                                                            title="Becsuk"
                                                        >
                                                            <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M7,14l5-5,5,5H7Z"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div
                                                        className="pt-10 text-sm text-slate-700"
                                                        dangerouslySetInnerHTML={{ __html: song.lyrics?.trim() ? song.lyrics : 'Ehhez a dalhoz még nincs dalszöveg.' }}
                                                    />
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
