<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\JsonResponse;

class SongController extends Controller
{
    public function index()
    {
        return view('welcome');
    }

    public function songs(): JsonResponse
    {
        $songs = Song::query()
            ->orderBy('title')
            ->get()
            ->map(function (Song $song) {
                return [
                    'id' => $song->id,
                    'title' => $song->title,
                    'artist' => $song->artist,
                    'playUrl' => asset('waves/'.rawurlencode($song->file_name)),
                    'downloadUrl' => asset('waves/'.rawurlencode($song->file_name)),
                ];
            })
            ->values()
            ->all();

        return response()->json($songs);
    }
}
