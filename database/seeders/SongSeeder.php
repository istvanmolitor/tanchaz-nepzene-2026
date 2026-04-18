<?php

namespace Database\Seeders;

use App\Models\Song;
use Illuminate\Database\Seeder;

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
            ['title' => 'Nincs dalszoveg', 'artist' => 'Silent Artist', 'file_name' => 'silent-artist-nincs-dalszoveg.wav'],
        ];

        foreach ($songs as $song) {
            Song::query()->updateOrCreate(
                ['file_name' => $song['file_name']],
                ['title' => $song['title'], 'artist' => $song['artist']],
            );
        }
    }
}
