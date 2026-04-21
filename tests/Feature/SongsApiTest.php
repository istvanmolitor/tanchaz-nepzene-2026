<?php

namespace Tests\Feature;

use App\Models\Song;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SongsApiTest extends TestCase
{
    use RefreshDatabase;

    private function createSong(array $attributes = []): Song
    {
        return Song::query()->create(array_merge([
            'title' => 'Alap Dal',
            'region' => 'Kalotaszeg',
            'title_en' => 'Base Song',
            'region_en' => 'Kalotaszeg',
            'artist' => 'Ismeros',
            'length' => null,
            'file_name' => 'alap-dal.mp3',
            'lyrics' => null,
            'lyrics_text' => null,
        ], $attributes));
    }

    public function test_it_returns_all_songs_when_search_is_missing(): void
    {
        $this->createSong([
            'title' => 'Csak Egy Kislany',
            'artist' => 'Ismeros',
            'file_name' => 'elso.mp3',
            'lyrics' => 'Elso dalszoveg',
            'lyrics_text' => 'Elso dalszoveg',
        ]);

        $this->createSong([
            'title' => 'Tavaszi Szel',
            'artist' => 'Enekes',
            'file_name' => 'masodik.mp3',
            'lyrics' => 'Masodik dalszoveg',
            'lyrics_text' => 'Masodik dalszoveg',
        ]);

        $response = $this->getJson('/api/songs');

        $response
            ->assertOk()
            ->assertJsonCount(2);
    }

    public function test_it_filters_songs_on_server_side_by_search_term(): void
    {
        $this->createSong([
            'title' => 'Kek Duna',
            'artist' => 'Banda',
            'file_name' => 'kek-duna.mp3',
            'lyrics' => null,
        ]);

        $this->createSong([
            'title' => 'Piros Alma',
            'artist' => 'Nepdal Kor',
            'file_name' => 'piros-alma.mp3',
            'lyrics' => null,
        ]);

        $this->createSong([
            'title' => 'Harangoznak',
            'artist' => 'Alma Egyuttes',
            'file_name' => 'harangoznak.mp3',
            'lyrics' => null,
        ]);

        $response = $this->getJson('/api/songs?search=alma');

        $response
            ->assertOk()
            ->assertJsonCount(2)
            ->assertJsonFragment(['title' => 'Piros Alma'])
            ->assertJsonFragment(['title' => 'Harangoznak'])
            ->assertJsonMissing(['title' => 'Kek Duna']);
    }

    public function test_it_filters_songs_by_plain_text_lyrics(): void
    {
        $this->createSong([
            'title' => 'Elso Dal',
            'artist' => 'Banda',
            'file_name' => 'elso-dal.mp3',
            'lyrics' => '<p>Este a fonoban</p>',
            'lyrics_text' => "Este a fonoban\ncsendul a nota",
        ]);

        $this->createSong([
            'title' => 'Masodik Dal',
            'artist' => 'Korus',
            'file_name' => 'masodik-dal.mp3',
            'lyrics' => null,
            'lyrics_text' => null,
        ]);

        $response = $this->getJson('/api/songs?search=fonoban');

        $response
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonFragment(['title' => 'Elso Dal'])
            ->assertJsonMissing(['title' => 'Masodik Dal']);
    }

}

