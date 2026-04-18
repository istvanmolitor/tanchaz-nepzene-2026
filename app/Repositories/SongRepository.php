<?php

namespace App\Repositories;

use App\Models\Song;
use Illuminate\Database\Eloquent\Collection;

class SongRepository
{
    public function search(?string $search = null): Collection
    {
        $normalizedSearch = mb_strtolower(trim((string) $search));
        $songsQuery = Song::query();

        if ($normalizedSearch !== '') {
            $songsQuery->where(function ($query) use ($normalizedSearch) {
                $query->whereRaw('LOWER(title) LIKE ?', ["%{$normalizedSearch}%"])
                    ->orWhereRaw('LOWER(title_en) LIKE ?', ["%{$normalizedSearch}%"])
                    ->orWhereRaw('LOWER(artist) LIKE ?', ["%{$normalizedSearch}%"]);
            });
        }

        return $songsQuery
            ->orderBy('title')
            ->get();
    }
}
