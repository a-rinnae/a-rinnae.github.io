import React, { useMemo, useRef, useState } from "react";
import styles from "./styles";
import GifCard from "./components/GifCard";
import Toolbar from "./components/Toolbar";
import DownloadFailures from "./components/DownloadFailures";
import WritingSection from "./components/WritingSection";
import { decodeFavorites } from "./lib/decodeFavorites";
import { downloadFavoritesZip } from "./lib/downloadFavoritesZip";
export default function App() {
  const [favoritesInput, setFavoritesInput] = useState("");
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("oldest");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isDownloadingArchive, setIsDownloadingArchive] = useState(false);
  const [downloadFailures, setDownloadFailures] = useState([]);
  const [downloadProgressPercent, setDownloadProgressPercent] = useState(0);
  const [downloadProgressLabel, setDownloadProgressLabel] = useState("");
  const [preferTenorGif, setPreferTenorGif] = useState(false);

  const successMessageTimeoutRef = useRef(null);

  const visibleFavorites = useMemo(() => {
    const sortedItems = [...favoriteItems].sort((left, right) =>
      sortOrder === "oldest"
        ? left.sourceOrder - right.sourceOrder
        : right.sourceOrder - left.sourceOrder,
    );

    return sortedItems.map((favoriteItem, index) => ({
      ...favoriteItem,
      displayNumber: index + 1,
    }));
  }, [favoriteItems, sortOrder]);

  function clearSuccessMessageTimer() {
    if (successMessageTimeoutRef.current) {
      clearTimeout(successMessageTimeoutRef.current);
      successMessageTimeoutRef.current = null;
    }
  }

  function showTemporarySuccessMessage(message) {
    clearSuccessMessageTimer();
    setSuccessMessage(message);
    successMessageTimeoutRef.current = setTimeout(() => {
      setSuccessMessage("");
      successMessageTimeoutRef.current = null;
    }, 2000);
  }

  function clearFeedbackMessages() {
    clearSuccessMessageTimer();
    setErrorMessage("");
    setSuccessMessage("");
  }

  function resetDownloadFeedback() {
    setDownloadFailures([]);
    setDownloadProgressPercent(0);
    setDownloadProgressLabel("");
  }

  function handleDecodeFavorites() {
    clearFeedbackMessages();
    resetDownloadFeedback();

    try {
      const decodedFavorites = decodeFavorites(favoritesInput);
      setFavoriteItems(decodedFavorites);
    } catch (error) {
      setFavoriteItems([]);
      setErrorMessage(
        error instanceof Error ? error.message : "Could not decode favorites.",
      );
    }
  }

  function handleToggleSortOrder() {
    setSortOrder((currentSortOrder) =>
      currentSortOrder === "oldest" ? "newest" : "oldest",
    );
  }

  async function copyFavoriteLinks(getUrl, successText, failureText) {
    try {
      const text = visibleFavorites.map(getUrl).join("\n");
      await navigator.clipboard.writeText(text);
      showTemporarySuccessMessage(successText);
    } catch {
      showTemporarySuccessMessage(failureText);
    }
  }

  async function handleCopyAssetLinks() {
    await copyFavoriteLinks(
      (favoriteItem) => favoriteItem.assetUrl,
      "Copied asset links.",
      "Could not copy asset links.",
    );
  }

  async function handleCopySourceLinks() {
    await copyFavoriteLinks(
      (favoriteItem) => favoriteItem.sourcePageUrl,
      "Copied source links.",
      "Could not copy source links.",
    );
  }

  async function handleDownloadArchive() {
    clearFeedbackMessages();
    resetDownloadFeedback();
    setDownloadProgressLabel("Starting download...");
    setIsDownloadingArchive(true);

    try {
      const result = await downloadFavoritesZip(
        visibleFavorites,
        ({ percent, label }) => {
          setDownloadProgressPercent(percent);
          setDownloadProgressLabel(label);
        },
        { convertTenorMp4ToGif: preferTenorGif },
      );

      setDownloadFailures(result.failedDownloads);

      if (result.addedCount > 0) {
        setSuccessMessage("Downloaded ZIP.");
      } else {
        setErrorMessage("Could not download ZIP.");
      }
    } catch {
      setErrorMessage("Could not download ZIP.");
    } finally {
      setDownloadProgressPercent(0);
      setDownloadProgressLabel("");
      setIsDownloadingArchive(false);
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Discord Favorite GIFs Tool</h1>
      <div>
        <b>INSTRUCTIONS:</b>
        <ol>
          <li>Go to the web version of Discord at discord.com and sign in.</li>
          <li>Open Developer Tools by pressing Ctrl+Shift+I or F12.</li>
          <li>Select the Network tab.</li>
          <li>Reload the page.</li>
          <li>In Discord, click any server in the left sidebar.</li>
          <li>
            In the Network tab, look for a request named <b>2</b>. If you do not
            see it, open the GIF picker in Discord and it should appear.
          </li>
          <li>
            Click the request named <b>2</b>, then open the Response tab.
          </li>
          <li>
            Right-click the long text string in the response and select Copy
            value.
          </li>
          <li>Paste the copied value into the box below.</li>
        </ol>
      </div>
      <textarea
        value={favoritesInput}
        onChange={(event) => setFavoritesInput(event.target.value)}
        placeholder="Follow the instructions and paste the base64"
        style={styles.textarea}
      />

      <Toolbar
        favoritesInput={favoritesInput}
        favoriteItems={favoriteItems}
        sortOrder={sortOrder}
        isDownloadingArchive={isDownloadingArchive}
        preferTenorGif={preferTenorGif}
        onDecodeFavorites={handleDecodeFavorites}
        onToggleSortOrder={handleToggleSortOrder}
        onCopyAssetLinks={handleCopyAssetLinks}
        onCopySourceLinks={handleCopySourceLinks}
        onDownloadArchive={handleDownloadArchive}
        onTogglePreferTenorGif={() =>
          setPreferTenorGif((currentValue) => !currentValue)
        }
      />

      {isDownloadingArchive ? (
        <div style={styles.progressText}>
          {downloadProgressLabel} {Math.round(downloadProgressPercent)}%
        </div>
      ) : null}

      {errorMessage ? <div style={styles.errorText}>{errorMessage}</div> : null}
      {successMessage ? (
        <div style={styles.successText}>{successMessage}</div>
      ) : null}

      <DownloadFailures failures={downloadFailures} />

      <div style={styles.countText}>
        <b>
          <ul>
            <li>
              You may have GIFs that have been deleted off the hosting platform
              but still remain favorited. Dead links will fail to load and will
              be listed as download failures if you do not unfavorite them prior
              to obtaining the base64. It's not necessary to unfavorite, but
              just double check everything matches what you expect.
            </li>
            <li>
              All GIFs sent through Tenor links on Discord are MP4s, not
              actually .gifs. Some of the reasons behind this is explained in
              section "Will Tenor GIFs still work?" below. You can download the
              true GIFs, but the download time does increase significantly. I
              assume downloading the MP4 won't be much help for you, so you'll
              likely want to check the option. Other GIFs outside Tenor will be
              left in whatever format they're in, which is likely .gif, .webm,
              or .webp.
            </li>
          </ul>
        </b>
        <br />
        <br />
        {visibleFavorites.length > 0 && (
          <>{visibleFavorites.length} GIFs loaded.</>
        )}{" "}
      </div>

      <div style={styles.grid}>
        {visibleFavorites.map((favoriteItem) => (
          <GifCard
            key={`${favoriteItem.sourceOrder}-${favoriteItem.assetUrl}`}
            item={favoriteItem}
          />
        ))}
      </div>

      <WritingSection />
    </div>
  );
}
