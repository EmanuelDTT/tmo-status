// src/lib/YoutubeService.ts
export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
}

export class YouTubeService {
  private static readonly FALLBACK_VIDEO: YouTubeVideo = {
    id: '4t__wczfpRI',
    title: 'Unravel - Tokyo Ghoul',
    url: 'https://www.youtube.com/watch?v=4t__wczfpRI',
  };

  static async getRandomAnimeOpening(apiKey: string): Promise<YouTubeVideo> {
    const query = 'anime opening';
    const maxResults = 15;

    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          query
        )}&type=video&maxResults=${maxResults}&key=${apiKey}`
      );

      if (!res.ok) {
        throw new Error(`YouTube API error: ${res.status}`);
      }

      const data = await res.json();

      if (data.items && data.items.length > 0) {
        const randomVideo =
          data.items[Math.floor(Math.random() * data.items.length)];
        return {
          id: randomVideo.id.videoId,
          title: randomVideo.snippet.title,
          url: `https://www.youtube.com/watch?v=${randomVideo.id.videoId}`,
        };
      }

      return this.FALLBACK_VIDEO;
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
      return this.FALLBACK_VIDEO;
    }
  }

  static async getRandomVideosByQuery(
    apiKey: string,
    query: string,
    maxResults: number = 15
  ): Promise<YouTubeVideo> {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          query
        )}&type=video&maxResults=${maxResults}&key=${apiKey}`
      );

      if (!res.ok) {
        throw new Error(`YouTube API error: ${res.status}`);
      }

      const data = await res.json();

      if (data.items && data.items.length > 0) {
        const randomVideo =
          data.items[Math.floor(Math.random() * data.items.length)];
        return {
          id: randomVideo.id.videoId,
          title: randomVideo.snippet.title,
          url: `https://www.youtube.com/watch?v=${randomVideo.id.videoId}`,
        };
      }

      return this.FALLBACK_VIDEO;
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
      return this.FALLBACK_VIDEO;
    }
  }
}
