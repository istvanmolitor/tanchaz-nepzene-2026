<?php

namespace App\Repositories;

use App\Models\Song;

class SongRepository
{
    public function search(?string $search = null): array
    {
        $normalizedSearch = mb_strtolower(trim((string) $search));
        $songsQuery = Song::query();

        if ($normalizedSearch !== '') {
            $songsQuery->where(function ($query) use ($normalizedSearch) {
                $query->whereRaw('LOWER(title) LIKE ?', ["%{$normalizedSearch}%"])
                    ->orWhereRaw('LOWER(artist) LIKE ?', ["%{$normalizedSearch}%"]);
            });
        }

        return $songsQuery
            ->orderBy('title')
            ->get()
            ->map(function (Song $song) {
                return [
                    'id' => $song->id,
                    'title' => $song->title,
                    'artist' => $song->artist,
                    'playUrl' => asset('waves/'.rawurlencode($song->file_name)),
                    'downloadUrl' => asset('waves/'.rawurlencode($song->file_name)),
                    'lyrics' => $song->lyrics,
                ];
            })
            ->values()
            ->all();
    }
}
