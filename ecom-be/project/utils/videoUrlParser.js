/**
 * Detects whether a URL is a YouTube or Instagram link and extracts
 * the ID needed to embed it on the frontend.
 *
 * Supports:
 *  - YouTube: watch?v=, youtu.be/, /shorts/, /embed/
 *  - Instagram: /reel/, /p/, /tv/
 *
 * @param {string} url
 * @returns {{ platform: 'youtube'|'instagram', embedId: string } | null}
 */
function parseVideoUrl(url) {
  if (!url || typeof url !== 'string') return null;

  // ---- YouTube ----
  const ytPattern =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
  const ytMatch = url.match(ytPattern);
  if (ytMatch) {
    return { platform: 'youtube', embedId: ytMatch[1] };
  }

  // ---- Instagram (Reel / Post / IGTV) ----
  const igPattern = /instagram\.com\/(?:reel|p|tv)\/([a-zA-Z0-9_-]+)/;
  const igMatch = url.match(igPattern);
  if (igMatch) {
    return { platform: 'instagram', embedId: igMatch[1] };
  }

  return null;
}

module.exports = parseVideoUrl;