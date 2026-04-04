import styles from "../styles";
import { isTypeVideo } from "../lib/urlUtils";

export default function GifCard({ item }) {
  return (
    <div style={styles.card}>
      <div style={styles.mediaFrame}>
        {isTypeVideo(item) ? (
          <video
            src={item.assetUrl}
            muted
            loop
            playsInline
            controls
            preload="metadata"
            style={styles.media}
          />
        ) : (
          <img
            src={item.assetUrl}
            alt={`GIF ${item.sourceOrder}`}
            loading="lazy"
            style={styles.media}
          />
        )}
      </div>

      <div style={styles.cardBody}>
        <div style={styles.row}>{item.displayNumber}</div>
        <div style={styles.row}>
          {item.width} × {item.height}
        </div>
        <div>
          <a
            href={item.sourcePageUrl}
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            {item.sourcePageUrl}
          </a>
        </div>
      </div>
    </div>
  );
}
