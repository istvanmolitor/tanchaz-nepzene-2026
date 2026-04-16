<?php

namespace App\Http\Controllers;

use App\Repositories\SongRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SongController extends Controller
{
    public function __construct(private readonly SongRepository $songRepository)
    {
    }

    public function index()
    {
        return view('welcome');
    }

    public function songs(Request $request): JsonResponse
    {
        $songs = $this->songRepository->search($request->query('search'));

        return response()->json($songs);
    }
}
