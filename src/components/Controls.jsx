import React from "react";
import styles from "../styles";

export default function Controls({
  input,
  favorites,
  sortOrder,
  isDownloadingZip,
  onDecode,
  onToggleSort,
  onCopyAssetLinks,
  onCopySourceLinks,
  onDownloadZip,
  convertTenorMp4ToGif,
  onToggleConvertTenorMp4ToGif,
}) {
  return (
    <div style={styles.controls}>
      <button onClick={onDecode} disabled={!input.trim()}>
        Decode
      </button>

      <button onClick={onToggleSort} disabled={!favorites.length}>
        {sortOrder === "oldest" ? "Show newest first" : "Show oldest first"}
      </button>

      <button onClick={onCopyAssetLinks} disabled={!favorites.length}>
        Copy all links
      </button>

      <button onClick={onCopySourceLinks} disabled={!favorites.length}>
        Copy all links (source)
      </button>

      <button
        onClick={onDownloadZip}
        disabled={!favorites.length || isDownloadingZip}
      >
        {isDownloadingZip ? "Preparing ZIP..." : "Download all as ZIP"}
      </button>
      <label>
        <input
          type="checkbox"
          checked={convertTenorMp4ToGif}
          onChange={onToggleConvertTenorMp4ToGif}
        />
        Download true GIFs from Tenor instead of MP4?
      </label>
    </div>
  );
}
