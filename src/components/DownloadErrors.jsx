import React from "react";
import styles from "../styles";

export default function DownloadErrors({ errors }) {
  if (!errors.length) {
    return null;
  }

  return (
    <div style={styles.errorList}>
      <h3 style={styles.errorListTitle}>Failed downloads</h3>
      <p style={styles.errorListText}>
        Common Errors:
        <br />
        <br />
        HTTP_404 - GIF was likely deleted from hosting website. In rare cases,
        the MP4 version of a GIF can still be up, but the original GIF was
        deleted off Tenor, so you could have different errors depending on if
        you are downloading the true GIFs.
        <br />
        FETCH_ERROR - GIFs outside Discord CDNs and Tenor are more likely to
        fail, there's an explanation below to why this could happen. Or,
        something else went wrong.
        <br />
        <br />
      </p>
      <ul style={styles.errorListItems}>
        {errors.map((entry, index) => (
          <li key={`${index}-${entry}`}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}
