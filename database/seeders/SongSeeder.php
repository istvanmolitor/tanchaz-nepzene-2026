<?php

namespace Database\Seeders;

use App\Models\Song;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class SongSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $songs = [
            ['title' => 'Tavaszi szel', 'artist' => 'Folk Ensemble', 'file_name' => 'folk-ensemble-tavaszi-szel.wav'],
            ['title' => 'Csardas este', 'artist' => 'Danube Band', 'file_name' => 'danube-band-csardas-este.wav'],
            ['title' => 'Hej Dunarol', 'artist' => 'Tanchaz Trio', 'file_name' => 'tanchaz-trio-hej-dunarol.wav'],
            ['title' => 'Piros Alma', 'artist' => 'Nepi Quartet', 'file_name' => 'nepi-quartet-piros-alma.wav'],
            ['title' => 'Ritmus a teren', 'artist' => 'Bogracs Beats', 'file_name' => 'bogracs-beats-ritmus-a-teren.wav'],
        ];

        foreach ($songs as $song) {
            Song::query()->updateOrCreate(
                ['file_name' => $song['file_name']],
                ['title' => $song['title'], 'artist' => $song['artist']],
            );
        }

        $this->ensureWaveFiles(array_column($songs, 'file_name'));
    }

    private function ensureWaveFiles(array $fileNames): void
    {
        $wavesDirectory = public_path('waves');
        File::ensureDirectoryExists($wavesDirectory);

        foreach ($fileNames as $fileName) {
            $fullPath = $wavesDirectory.DIRECTORY_SEPARATOR.$fileName;

            if (File::exists($fullPath)) {
                continue;
            }

            File::put($fullPath, $this->createSilentWaveContent());
        }
    }

    private function createSilentWaveContent(): string
    {
        $sampleRate = 8000;
        $numChannels = 1;
        $bitsPerSample = 16;
        $durationSeconds = 1;
        $numSamples = $sampleRate * $durationSeconds;
        $blockAlign = (int) ($numChannels * ($bitsPerSample / 8));
        $byteRate = $sampleRate * $blockAlign;
        $dataSize = $numSamples * $blockAlign;
        $riffSize = 36 + $dataSize;

        $header = 'RIFF'
            .pack('V', $riffSize)
            .'WAVE'
            .'fmt '
            .pack('V', 16)
            .pack('v', 1)
            .pack('v', $numChannels)
            .pack('V', $sampleRate)
            .pack('V', $byteRate)
            .pack('v', $blockAlign)
            .pack('v', $bitsPerSample)
            .'data'
            .pack('V', $dataSize);

        $silence = str_repeat(pack('v', 0), $numSamples);

        return $header.$silence;
    }
}
