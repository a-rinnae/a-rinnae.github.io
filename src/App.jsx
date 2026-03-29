import React, { useMemo, useState } from "react";
import styles from "./styles";
import GifCard from "./components/GifCard";
import Controls from "./components/Controls";
import DownloadErrors from "./components/DownloadErrors";
import WritingSection from "./components/WritingSection";
import { decodeFavorites } from "./lib/decodeFavorites";
import { downloadFavoritesZip } from "./lib/downloadZip";

export default function App() {
  const [input, setInput] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [sortOrder, setSortOrder] = useState("oldest");
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [downloadErrors, setDownloadErrors] = useState([]);
  const [zipProgress, setZipProgress] = useState(0);
  const [zipProgressLabel, setZipProgressLabel] = useState("");
  const [convertTenorMp4ToGif, setConvertTenorMp4ToGif] = useState(false);

  const sortedFavorites = useMemo(() => {
    const nextFavorites = [...favorites];

    nextFavorites.sort((left, right) =>
      sortOrder === "oldest"
        ? left.order - right.order
        : right.order - left.order,
    );

    return nextFavorites;
  }, [favorites, sortOrder]);

  function handleDecode() {
    setErrorMessage("");
    setSuccessMessage("");
    setDownloadErrors([]);

    try {
      const decodedFavorites = decodeFavorites(input);
      setFavorites(decodedFavorites);
    } catch (error) {
      setFavorites([]);
      setErrorMessage(
        error instanceof Error ? error.message : "Could not decode favorites.",
      );
    }
  }

  async function handleCopyAssetLinks() {
    try {
      await navigator.clipboard.writeText(
        sortedFavorites.map((item) => item.assetUrl).join("\n"),
      );
      setSuccessMessage("Copied asset links.");
    } catch {
      setSuccessMessage("Could not copy asset links.");
    }

    setTimeout(() => setSuccessMessage(""), 2000);
  }

  async function handleCopySourceLinks() {
    try {
      await navigator.clipboard.writeText(
        sortedFavorites.map((item) => item.sourcePageUrl).join("\n"),
      );
      setSuccessMessage("Copied source links.");
    } catch {
      setSuccessMessage("Could not copy source links.");
    }

    setTimeout(() => setSuccessMessage(""), 2000);
  }

  async function handleDownloadZip() {
    setZipProgress(0);
    setZipProgressLabel("Starting download...");
    setIsDownloadingZip(true);
    setErrorMessage("");
    setSuccessMessage("");
    setDownloadErrors([]);

    try {
      const result = await downloadFavoritesZip(
        sortedFavorites,
        ({ percent, label }) => {
          setZipProgress(percent);
          setZipProgressLabel(label);
        },
        { convertTenorMp4ToGif },
      );

      setDownloadErrors(result.failedDownloads);

      if (result.addedCount > 0) {
        setSuccessMessage("Downloaded ZIP.");
      } else {
        setErrorMessage("Could not download ZIP.");
      }
    } catch {
      setErrorMessage("Could not download ZIP.");
    } finally {
      setZipProgress(0);
      setZipProgressLabel("");
      setIsDownloadingZip(false);
    }
  }

  function handleToggleSort() {
    setSortOrder((currentOrder) =>
      currentOrder === "oldest" ? "newest" : "oldest",
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Discord Favorite GIFs Tool</h1>
      <p>
        <b>INSTRUCTIONS:</b>
        <br />
        <br />
      </p>

      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Follow the instructions and paste the base64"
        style={styles.textarea}
      />

      <Controls
        input={input}
        favorites={favorites}
        sortOrder={sortOrder}
        isDownloadingZip={isDownloadingZip}
        onDecode={handleDecode}
        onToggleSort={handleToggleSort}
        onCopyAssetLinks={handleCopyAssetLinks}
        onCopySourceLinks={handleCopySourceLinks}
        onDownloadZip={handleDownloadZip}
        convertTenorMp4ToGif={convertTenorMp4ToGif}
        onToggleConvertTenorMp4ToGif={() =>
          setConvertTenorMp4ToGif((value) => !value)
        }
      />
      {isDownloadingZip ? (
        <div style={styles.progressText}>
          {zipProgressLabel} {Math.round(zipProgress)}%
        </div>
      ) : null}

      {errorMessage ? <div style={styles.errorText}>{errorMessage}</div> : null}
      {successMessage ? (
        <div style={styles.successText}>{successMessage}</div>
      ) : null}

      <DownloadErrors errors={downloadErrors} />

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
              section "Will Tenor GIFs still work". You can download the true
              GIFs, but the download time may increase by a lot. I assume
              downloading the MP4 won't be much help for you, so you'll likely
              want to check the option. Other GIFs will be left in whatever
              format they're in, like .webp or .webm.
            </li>
          </ul>
        </b>
        <br />
        <br />
        {sortedFavorites.length} GIFs loaded.
      </div>

      <div style={styles.grid}>
        {sortedFavorites.map((item) => (
          <GifCard key={`${item.order}-${item.assetUrl}`} item={item} />
        ))}
      </div>

      <WritingSection />
    </div>
  );
}
