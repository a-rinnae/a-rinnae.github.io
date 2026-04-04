const styles = {
  page: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: 24,
    fontFamily: "system-ui, sans-serif",
    lineHeight: 1.4,
  },
  title: {
    fontSize: 28,
    margin: "0 0 8px",
  },
  instructions: {
    color: "#000",
    margin: "0 0 16px",
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    minHeight: 180,
    padding: 12,
    fontFamily: "monospace",
    fontSize: 12,
    border: "1px solid #ccc",
    borderRadius: 10,
    resize: "none",
  },
  controls: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    margin: "12px 0",
  },
  progressText: {
    marginTop: 12,
  },
  successText: {
    color: "#0a7a2f",
    margin: "0 0 12px",
  },
  errorText: {
    color: "#b00020",
    margin: "0 0 12px",
  },
  failureListText: {
    margin: 0,
    fontFamily: "monospace",
    fontSize: 12,
    fontWeight: 700,
  },
  countText: {
    color: "#555",
    margin: "0 0 16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 12,
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: 10,
    overflow: "hidden",
    background: "#fff",
  },
  mediaFrame: {
    aspectRatio: "16 / 9",
    background: "#f5f5f5",
  },
  media: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  cardBody: {
    padding: 12,
  },
  row: {
    margin: "0 0 6px",
  },
  link: {
    wordBreak: "break-all",
    fontSize: 12,
  },
  failureList: {
    margin: "12px 0 16px",
    padding: 12,
    border: "1px solid #f0b3b3",
    borderRadius: 10,
    background: "#fff8f8",
  },
  failureListTitle: {
    margin: "0 0 8px",
    color: "#b00020",
    fontSize: 14,
  },
  errorListItems: {
    margin: 0,
    paddingLeft: 18,
    maxHeight: 220,
    overflow: "auto",
    fontFamily: "monospace",
    fontSize: 12,
  },
  writingSection: {
    padding: 16,
    borderRadius: 10,
    background: "#fafafa",
  },
  writingTitle: {
    fontSize: 18,
    margin: "0 0 12px",
  },
  writingSummary: {
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 700,
  },
  writingSubSummary: {
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
  },
  writingContent: {
    marginTop: 12,
  },
};

export default styles;
