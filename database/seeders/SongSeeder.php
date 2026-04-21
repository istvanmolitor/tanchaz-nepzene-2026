<?php

namespace Database\Seeders;

use App\Models\Song;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Blade;
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
            $lyricsPath = database_path("seeders/data/lyrics/{$id}.blade.php");
            $lyrics = null;
            $lyricsText = null;

            if (File::exists($lyricsPath)) {
                $lyrics = Blade::render(File::get($lyricsPath));
                $lyricsText = $this->renderLyricsText($lyrics);
            }

            Song::create([
                'id' => $id,
                'title' => $song['title'],
                'region' => $song['region'] ?? '',
                'title_en' => $song['title_en'] ?? '',
                'region_en' => $song['region_en'] ?? '',
                'artist' => $song['artist'],
                'length' => $song['length'] ?? null,
                'file_name' => $song['file_name'],
                'lyrics' => $lyrics,
                'lyrics_text' => $lyricsText,
            ]);
        }

        $this->command->info(count($songsData) . " dal sikeresen betöltve.");
    }

    private function renderLyricsText(string $lyrics): ?string
    {
        $text = preg_replace([
            '/<br\s*\/?\s*>/iu',
            '/<\/p>/iu',
            '/<\/div>/iu',
            '/<\/li>/iu',
            '/<\/h[1-6]>/iu',
        ], ["\n", "\n\n", "\n\n", "\n", "\n\n"], $lyrics);

        $text = preg_replace('/<li\b[^>]*>/iu', '- ', $text ?? '');
        $text = strip_tags($text ?? '');
        $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $text = preg_replace('/\r\n?|\n/u', "\n", $text);
        $text = implode("\n", array_map(static fn (string $line): string => trim($line), explode("\n", $text ?? '')));
        $text = preg_replace('/\n{3,}/u', "\n\n", $text);
        $text = trim($text ?? '');

        return $text !== '' ? $text : null;
    }
}
