<?php

namespace Database\Seeders;

use App\Models\Song;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class SongSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonPath = database_path('seeders/data/songs.json');
        if (!File::exists($jsonPath)) {
            $this->command->error("A songs.json nem található: {$jsonPath}");
            return;
        }

        $songsData = json_decode(File::get($jsonPath), true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->command->error("Hiba a songs.json beolvasásakor: " . json_last_error_msg());
            return;
        }

        foreach ($songsData as $song) {
            $id = $song['id'];
            $lyricsPath = database_path("seeders/data/lyrics/{$id}.html");
            $lyrics = null;

            if (File::exists($lyricsPath)) {
                $lyrics = File::get($lyricsPath);
            }

            Song::create([
                'id' => $id,
                'title' => $song['title'],
                'region' => $song['region'] ?? '',
                'title_en' => $song['title_en'] ?? '',
                'region_en' => $song['region_en'] ?? '',
                'artist' => $song['artist'],
                'length' => $song['length'] ?? null,
                'file_name' => "{$id}.mp3",
                'lyrics' => $lyrics,
            ]);
        }

        $this->command->info(count($songsData) . " dal sikeresen betöltve.");
    }
}
