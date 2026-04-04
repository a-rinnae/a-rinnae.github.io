import React from "react";
import styles from "../styles";

export default function Toolbar({
  favoritesInput,
  favoriteItems,
  sortOrder,
  isDownloadingArchive,
  preferTenorGif,
  onDecodeFavorites,
  onToggleSortOrder,
  onCopyAssetLinks,
  onCopySourceLinks,
  onDownloadArchive,
  onTogglePreferTenorGif,
}) {
  const hasFavorites = favoriteItems.length > 0;

  return (
    <div style={styles.controls}>
      <button onClick={onDecodeFavorites} disabled={!favoritesInput.trim()}>
        Decode
      </button>

      <button onClick={onToggleSortOrder} disabled={!hasFavorites}>
        {sortOrder === "oldest" ? "Show newest first" : "Show oldest first"}
      </button>

      <button onClick={onCopyAssetLinks} disabled={!hasFavorites}>
        Copy all links
      </button>

      <button onClick={onCopySourceLinks} disabled={!hasFavorites}>
        Copy all links (source)
      </button>

      <button
        onClick={onDownloadArchive}
        disabled={!hasFavorites || isDownloadingArchive}
      >
        {isDownloadingArchive ? "Preparing ZIP..." : "Download all as ZIP"}
      </button>

      <label>
        <input
          type="checkbox"
          checked={preferTenorGif}
          onChange={onTogglePreferTenorGif}
        />
        Download true GIFs from Tenor instead of MP4?
      </label>
    </div>
  );
}
