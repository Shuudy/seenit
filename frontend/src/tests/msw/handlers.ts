import { http, HttpResponse } from 'msw';

import type { Video } from '@/types/video';

let videosStore: Video[] = [];

export function setMockVideos(videos: Video[]) {
  videosStore = videos;
}

export function resetMockVideos() {
  videosStore = [];
}

export const handlers = [
  http.get('*/api/videos', () => {
    return HttpResponse.json({ data: videosStore });
  }),
];
