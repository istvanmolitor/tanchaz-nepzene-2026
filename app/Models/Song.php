<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $fillable = [
        'title',
        'region',
        'title_en',
        'region_en',
        'artist',
        'file_name',
        'lyrics',
    ];
}
