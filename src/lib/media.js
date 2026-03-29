export function normalizeUrl(url) {
  if (url.startsWith("//")) {
    url = `https:${url}`;
  }

  // discord CDNs will just serve a static image without ?animated=true appended
  // this isn't needed for all files ending in .webp, but I don't think it messes
  // anything up... could be wrong.
  if (url.endsWith(".webp")) {
    url += "?animated=true";
  }

  return url;
}

export function getMediaDownloadUrl(url) {
  const normalized = normalizeUrl(url);

  const decoded = decodeURIComponent(normalized);

  // discord proxy URLs are of the form images-ext-1.discord.app.net/external/.../https/...
  // all we need is everything past https/
  const httpsIndex = decoded.lastIndexOf("/https/");

  if (httpsIndex !== -1) {
    // reconstruct URL as a normal https://
    return `https://${decoded.slice(httpsIndex + 7)}`;
  }

  // if none, probably these two scenarios:
  // 1. URL was favorited directly in GIF panel, don't need to do anything with it.
  // 2. it is from media.discordapp.net, don't need to touch.
  return normalized;
}

export function getFileExtension(contentType = "") {
  if (contentType.includes("gif")) return "gif";
  if (contentType.includes("mp4")) return "mp4";

  // webm and webp are the only ones of concern.
  // webm is used for GIFs in the GIF panel, so GIFs favorited directly via the panel are .webm
  // webp typically appears when someone favorites an animated emoji by resending it's cdn discord link because of no nitro
  // the animation of these aren't supported by Windows Photos, but they'll work fine on the browser.
  if (contentType.includes("webm")) return "webm";
  if (contentType.includes("webp")) return "webp";

  return "bin";
}

export function isTypeVideo(item) {
  const format = String(item.format || "").toLowerCase();
  return format === "gif_type_video";
}

export function isTenorMediaUrl(url) {
  try {
    return new URL(normalizeUrl(url)).hostname === "media.tenor.com";
  } catch {
    return false;
  }
}

export function convertToGIFLink(url) {
  const normalized = normalizeUrl(url);

  // AAAPo -> AAAAC will grab the true GIF. technically not needed to replace
  // the file extension, but it is done here for clarity.
  return normalized.replace("AAAPo", "AAAAC").replace(/\.mp4$/i, ".gif");
}
