<?php

require __DIR__.'/vendor/autoload.php';

use Illuminate\Support\Str;

$jsonPath = __DIR__.'/database/seeders/data/songs.json';
$songsFolder = __DIR__.'/public/songs';

if (!file_exists($jsonPath)) {
    die("JSON nem található\n");
}

$songs = json_decode(file_get_contents($jsonPath), true);

// Térkép készítése az előadókról a fájlokhoz
// Mivel a fájlnevek néha eltérnek az artist mezőtől, manuálisan kell segíteni vagy okosnak lenni.

/*
public/songs:
'Czeilinger Izabella.wav'            'Sass Éva.wav'
'Imre Boglárka.wav'                  'Szekeres Kamilla Apollónia.wav'
'Kiss Annamária - Dudás Eszter.wav'  'Szerényi Domokos.wav'
'Kovács Abigél.wav'                   Tátorján.wav
'Ladányi Benedek.wav'                'Tóth Andor dudás.wav'
'Magyarpalatkai banda 5 mix.wav'     'Tóth Andor furulyás.wav'
'Mokos Csongor.wav'                  'Tuba Örs és zenekara 5 mix.wav'
*/

// Debug: kiírjuk a fájlokat
$actualFiles = scandir($songsFolder);
$actualFiles = array_filter($actualFiles, function($f) { return $f != "." && $f != ".."; });
echo "Actual files in songs folder:\n";
foreach ($actualFiles as $f) {
    echo "  '{$f}' (len: ".strlen($f).")\n";
}
echo "-------------------\n";

$fileMap = [];
foreach ($actualFiles as $f) {
    if ($f == ".gitignore") continue;
    $sluggedActual = Str::slug(pathinfo($f, PATHINFO_FILENAME));
    
    if (str_contains($sluggedActual, 'tuba-ors')) $fileMap[2] = $f;
    else if (str_contains($sluggedActual, 'sass-eva')) $fileMap[3] = $f;
    else if (str_contains($sluggedActual, 'mokos-csongor')) $fileMap[4] = $f;
    else if (str_contains($sluggedActual, 'bohak-emese')) $fileMap[5] = $f;
    else if (str_contains($sluggedActual, 'toth-andor-duda')) $fileMap[6] = $f;
    else if (str_contains($sluggedActual, 'imre-boglarka')) $fileMap[7] = $f;
    else if (str_contains($sluggedActual, 'ladanyi-benedek')) $fileMap[9] = $f;
    else if (str_contains($sluggedActual, 'szerenyi-domokos')) $fileMap[10] = $f;
    else if (str_contains($sluggedActual, 'kovacs-abigel')) $fileMap[11] = $f;
    else if (str_contains($sluggedActual, 'toth-andor-furulya')) $fileMap[12] = $f;
    else if (str_contains($sluggedActual, 'czeilinger-izabella')) $fileMap[13] = $f;
    else if (str_contains($sluggedActual, 'tatorjan')) $fileMap[14] = $f;
    else if (str_contains($sluggedActual, 'kiss-annamaria')) $fileMap[16] = $f;
    else if (str_contains($sluggedActual, 'szekeres-kamilla')) $fileMap[17] = $f;
    else if (str_contains($sluggedActual, 'magyarpalatkai-banda')) $fileMap[18] = $f;
}
// Alapértelmezettek, amik már slugifiedek vagy hiányoznak
$fileMap[1] = $fileMap[1] ?? 'almasi-kamilla.wav';
$fileMap[8] = $fileMap[8] ?? 'bauer-krisztina-es-zenekara-5-mix.wav';
$fileMap[15] = $fileMap[15] ?? 'antal-csenge.wav';

$newSongs = [];

foreach ($songs as $song) {
    $id = (int)$song['id'];
    
    if (isset($fileMap[$id])) {
        $oldFileName = $fileMap[$id];
        
        // Ha már slugified volt (pl. almasi-kamilla.wav), akkor marad.
        // Egyébként slug-osítjuk.
        
        if (in_array($id, [1, 8, 15])) {
            $newFileName = $oldFileName;
        } else {
            $pathInfo = pathinfo($oldFileName);
            $newBaseName = Str::slug($pathInfo['filename']);
            $newFileName = $newBaseName . '.' . $pathInfo['extension'];
        }
        
        echo "ID {$id}: {$oldFileName} -> {$newFileName}\n";
        
        $oldPath = $songsFolder . '/' . $oldFileName;
        $newPath = $songsFolder . '/' . $newFileName;
        
        if ($oldFileName !== $newFileName) {
            if (file_exists($oldPath)) {
                rename($oldPath, $newPath);
                echo "  Renamed!\n";
            } else if (file_exists($newPath)) {
                echo "  Already renamed.\n";
            } else {
                echo "  Warning: Source file not found: {$oldFileName}\n";
            }
        }
        
        $song['file_name'] = $newFileName;
    } else {
        echo "ID {$id}: Nincs fájl hozzárendelve!\n";
        // Alapértelmezett id.mp3-ról váltunk slug-ra az artist alapján ha lehet
        $newBaseName = Str::slug($song['artist']);
        $song['file_name'] = $newBaseName . '.mp3';
        echo "  Defaulted to: {$song['file_name']}\n";
    }
    
    $newSongs[] = $song;
}

file_put_contents($jsonPath, json_encode($newSongs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "JSON frissítve.\n";
