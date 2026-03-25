<?php

namespace App\Services;

use getID3;

/**
 * Service class for analyzing video files.
 */
class VideoAnalyzer
{
    /**
     * Get the duration of a video file in seconds.
     */
    public function getDuration(string $path): ?float
    {
        $analyzer = new getID3;
        $analyzer->option_md5_data = false;
        $analyzer->option_md5_data_source = false;
        $info = $analyzer->analyze($path);

        return $info['playtime_seconds'] ?? null;
    }
}
