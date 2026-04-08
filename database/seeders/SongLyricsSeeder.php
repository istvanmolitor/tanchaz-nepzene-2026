<?php

namespace Database\Seeders;

use App\Models\Song;
use Illuminate\Database\Seeder;

class SongLyricsSeeder extends Seeder
{
    /**
     * Seed lyrics for existing songs.
     */
    public function run(): void
    {
        $lyricsByFileName = [
            'folk-ensemble-tavaszi-szel.wav' => "Tavaszi szel vizet aras\nViragom, viragom\nMinden madar tarsat valaszt\nViragom, viragom",
            'danube-band-csardas-este.wav' => "Csardas este szol a zene\nLep a lab es rezdul a ter\nPerg a szoknya, dobban a csizma\nTancol velunk ez az ejjel",
            'tanchaz-trio-hej-dunarol.wav' => "Hej Dunarol fuj a szel\nHej de messze viszi enekem\nPartrol partra jar a hangja\nSzivbol szol a regi dallam",
            'nepi-quartet-piros-alma.wav' => "Piros alma leesett a sarba\nFelvettem en bekotottem selyembe\nAki szerel, tartsa szivben\nNepi dal szol most az estben",
            'bogracs-beats-ritmus-a-teren.wav' => "Ritmus a teren, dobban a fold\nKorbeall a nepes sokasag\nKez a kezben, lep a nep\nEjjelbe nyulik a mulatsag",
        ];

        foreach ($lyricsByFileName as $fileName => $lyrics) {
            Song::query()
                ->where('file_name', $fileName)
                ->update(['lyrics' => $lyrics]);
        }
    }
}
