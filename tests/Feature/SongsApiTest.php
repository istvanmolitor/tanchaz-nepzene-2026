<?php

namespace Tests\Feature;

use App\Models\Song;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SongsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_all_songs_when_search_is_missing(): void
    {
        Song::query()->create([
            'title' => 'Csak Egy Kislany',
            'artist' => 'Ismeros',
            'file_name' => 'elso.mp3',
            'lyrics' => 'Elso dalszoveg',
        ]);

        Song::query()->create([
            'title' => 'Tavaszi Szel',
            'artist' => 'Enekes',
            'file_name' => 'masodik.mp3',
            'lyrics' => 'Masodik dalszoveg',
        ]);

        $response = $this->getJson('/api/songs');

        $response
            ->assertOk()
            ->assertJsonCount(2);
    }

    public function test_it_filters_songs_on_server_side_by_search_term(): void
    {
        Song::query()->create([
            'title' => 'Kek Duna',
            'artist' => 'Banda',
            'file_name' => 'kek-duna.mp3',
            'lyrics' => null,
        ]);

        Song::query()->create([
            'title' => 'Piros Alma',
            'artist' => 'Nepdal Kor',
            'file_name' => 'piros-alma.mp3',
            'lyrics' => null,
        ]);

        Song::query()->create([
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
}
