<?php

namespace Tests\Feature\Services;

use App\Services\VideoAnalyzer;
use Tests\TestCase;

class VideoAnalyzerTest extends TestCase
{
    /**
     * Test that the getDuration method returns the correct duration for a sample video file.
     */
    public function test_get_duration_returns_correct_duration(): void
    {
        $analyzer = new VideoAnalyzer;
        $duration = $analyzer->getDuration(base_path('tests/Fixtures/sample_video.mp4'));

        // The sample video is known to be approximately 15 seconds long, so we round the result for comparison
        $this->assertEquals(15, (int) round($duration));
    }
}
