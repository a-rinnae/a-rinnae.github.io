import JSZip from "jszip";
import {
  getFileExtension,
  getMediaDownloadUrl,
  convertToGIFLink,
} from "./urlUtils";

function formatFailure(item, code, url, message = "") {
  return `#${item.displayNumber} ${code} ${url}${message ? ` ${message}` : ""}`;
}

function saveBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function fetchFavoriteFile(item, convertTenorMp4ToGif) {
  let downloadUrl = getMediaDownloadUrl(item.assetUrl);

  if (
    convertTenorMp4ToGif &&
    downloadUrl.includes("media.tenor.com") &&
    /\.mp4(\?|$)/i.test(downloadUrl)
  ) {
    downloadUrl = convertToGIFLink(downloadUrl);
  }

  try {
    const response = await fetch(downloadUrl);

    if (!response.ok) {
      return {
        failed: formatFailure(item, `HTTP_${response.status}`, downloadUrl),
      };
    }

    const blob = await response.blob();
    const extension = getFileExtension(blob.type);

    const number = String(item.displayNumber).padStart(3, "0");
    const fileName = `gif-${number}.${extension}`;

    return { fileName, blob };
  } catch (error) {
    return {
      failed: formatFailure(
        item,
        "FETCH_ERROR",
        downloadUrl,
        error instanceof Error ? error.message : String(error),
      ),
    };
  }
}

export async function downloadFavoritesZip(
  favorites,
  onProgress,
  { convertTenorMp4ToGif = false } = {},
) {
  const zip = new JSZip();
  const failedDownloads = [];
  let addedCount = 0;
  const total = favorites.length;
  let completed = 0;

  for (const item of favorites) {
    const result = await fetchFavoriteFile(item, convertTenorMp4ToGif);
    completed += 1;
    onProgress?.({
      percent: (completed / total) * 90,
      label: `Fetching files (${completed}/${total})`,
    });

    if (result.failed) {
      failedDownloads.push(result.failed);
      continue;
    }

    zip.file(result.fileName, result.blob);
    addedCount += 1;
  }

  if (addedCount > 0) {
    const zipBlob = await zip.generateAsync({ type: "blob" }, (metadata) => {
      onProgress?.({
        percent: 90 + metadata.percent * 0.1,
        label: "Building ZIP",
      });
    });
    saveBlob(zipBlob, "favorite-gifs.zip");
  }

  return { addedCount, failedDownloads };
}
