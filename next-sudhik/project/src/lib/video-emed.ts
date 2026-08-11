export type EmbedInfo = {
  platform: 'youtube' | 'instagram';
  embedUrl: string;
};

export function getEmbedInfo(url: string): EmbedInfo | null {
  // YouTube: watch?v=, youtu.be/, /shorts/
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) {
    const id = ytMatch[1];
    return {
      platform: 'youtube',
      // mute=1 => muted by default, controls=1 => user can unmute/play
      embedUrl: `https://www.youtube.com/embed/${id}?mute=1&controls=1&modestbranding=1&rel=0&playsinline=1`,
    };
  }

  // Instagram: /reel/{code}/ or /p/{code}/
  const igMatch = url.match(/instagram\.com\/(?:reel|p)\/([a-zA-Z0-9_-]+)/);
  if (igMatch) {
    const code = igMatch[1];
    return {
      platform: 'instagram',
      embedUrl: `https://www.instagram.com/reel/${code}/embed`,
    };
  }

  return null;
}