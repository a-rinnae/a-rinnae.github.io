import React from "react";
import styles from "../styles";

export default function DownloadFailures({ failures = [] }) {
  if (!failures.length) {
    return null;
  }

  return (
    <div style={styles.failureList}>
      <h3 style={styles.failureListTitle}>Failed downloads</h3>
      <p style={styles.failureListText}>
        Common failure types:
        <br />
        <br />
        HTTP_404 - GIF was likely deleted from hosting website. In rare cases,
        the MP4 version of a GIF may still be hosted by Tenor but the original
        GIF is deleted off Tenor, so you could have different errors depending
        on if you are downloading the true GIFs.
        <br />
        FETCH_ERROR - GIFs outside Discord CDNs and Tenor are more likely to
        fail, there's an explanation below to why this could happen. Or,
        something else went wrong. Please manually download these or use the
        script provided.
        <br />
        <br />
      </p>
      <ul style={styles.errorListItems}>
        {failures.map((entry, index) => (
          <li key={`${index}-${entry}`}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}
