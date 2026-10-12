import type { Exercise } from "../types";

export type YouTubeThumbQuality = "hq" | "sd" | "maxres";

export type ExerciseVideo = {
  /** Verified YouTube video id, or null when only a search fallback exists. */
  videoId: string | null;
  /** Embeddable player URL, or null when there is no verified video. */
  embedUrl: string | null;
  /** Direct YouTube watch URL, or null when there is no verified video. */
  watchUrl: string | null;
  /** Always available: a YouTube search for this specific exercise. */
  searchUrl: string;
  /** Ordered real-workout image URLs for cards (first that loads wins). */
  thumbnailCandidates: string[];
  /** Ordered high-resolution image URLs for the detail view. */
  thumbnailLargeCandidates: string[];
};

export function youTubeSearchUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    query
  )}`;
}

export function youTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function youTubeEmbedUrl(videoId: string): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    autoplay: "1"
  });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
}

const THUMBNAIL_HOSTS = ["https://i.ytimg.com", "https://img.youtube.com"];

/**
 * Build an ordered list of real workout image URLs for a specific video.
 * Both YouTube image hosts are tried for each quality so the thumbnail still
 * loads if one host is blocked. `hq` always exists for public videos, while
 * `maxres` gives a sharper image but is missing for a few older uploads, so
 * callers should request `["maxres", "hq"]` and use the first that loads.
 */
export function youTubeThumbnailCandidates(
  videoId: string,
  qualities: YouTubeThumbQuality[] = ["hq"]
): string[] {
  const urls: string[] = [];
  for (const quality of qualities) {
    for (const host of THUMBNAIL_HOSTS) {
      urls.push(`${host}/vi/${videoId}/${quality}default.jpg`);
    }
  }
  return urls;
}

/**
 * Resolve the video information for an exercise. When a verified tutorial is
 * available we embed it and use its real workout thumbnail, otherwise the
 * caller can fall back to the YouTube search link for that exercise.
 */
export function getExerciseVideo(exercise: Exercise): ExerciseVideo {
  const searchUrl = youTubeSearchUrl(
    `${exercise.name} exercise proper form tutorial`
  );

  if (!exercise.videoId) {
    return {
      videoId: null,
      embedUrl: null,
      watchUrl: null,
      searchUrl,
      thumbnailCandidates: [],
      thumbnailLargeCandidates: []
    };
  }

  const { videoId } = exercise;

  return {
    videoId,
    embedUrl: youTubeEmbedUrl(videoId),
    watchUrl: youTubeWatchUrl(videoId),
    searchUrl,
    thumbnailCandidates: youTubeThumbnailCandidates(videoId, ["hq"]),
    thumbnailLargeCandidates: youTubeThumbnailCandidates(videoId, [
      "maxres",
      "hq"
    ])
  };
}
