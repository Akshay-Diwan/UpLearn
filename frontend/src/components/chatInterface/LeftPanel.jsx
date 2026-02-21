import { useState, useRef } from "react";

const pdfColors = ["#00d4ff", "#a78bfa", "#34d399", "#fb923c", "#f472b6", "#facc15"];

// Props:
//   onPdfCountChange(count) — tells App how many PDFs are loaded so RightPanel stats update

export default function LeftPanel({ onPdfCountChange }) {
  const [pdfs, setPdfs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);

  const addFiles = (files) => {
    const valid = Array.from(files).filter(f => f.type === "application/pdf");
    if (!valid.length) return;
    const newPdfs = valid.map((file, i) => ({
      id: Date.now() + i,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      color: pdfColors[(pdfs.length + i) % pdfColors.length],
    }));
    setPdfs(prev => {
      const updated = [...prev, ...newPdfs];
      if (!selected) setSelected(newPdfs[0].id);
      onPdfCountChange && onPdfCountChange(updated.length);
      return updated;
    });
  };

  const removePdf = (e, id) => {
    e.stopPropagation();
    setPdfs(prev => {
      const updated = prev.filter(p => p.id !== id);
      if (selected === id) setSelected(updated[0]?.id ?? null);
      onPdfCountChange && onPdfCountChange(updated.length);
      return updated;
    });
  };

  return (
    <aside style={{
      width: "255px", minWidth: "255px",
      background: "var(--panel)",
      borderRight: "1px solid var(--border)",
      display: "flex", flexDirection: "column",
      padding: "1.2rem", gap: "1rem",
      backdropFilter: "blur(20px)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: "20%", bottom: "20%", width: "2px",
        background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.5), transparent)",
      }} />

      {/* Title */}
      <div style={{ paddingLeft: "4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <div style={{
            width: "16px", height: "16px", borderRadius: "4px",
            background: "linear-gradient(135deg, #00d4ff, #0055cc)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px",
          }}>📚</div>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.65rem",
            color: "var(--cyan)", letterSpacing: "0.2em", textTransform: "uppercase",
          }}>PDF Library</span>
        </div>
        <p style={{ fontSize: "0.7rem", color: "var(--text-dim)", fontFamily: "var(--font-body)", paddingLeft: "24px" }}>
          {pdfs.length === 0 ? "No documents yet" : `${pdfs.length} document${pdfs.length > 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        onClick={() => fileRef.current?.click()}
        style={{
          border: `1.5px dashed ${dragging ? "rgba(0,212,255,0.8)" : "rgba(0,212,255,0.25)"}`,
          borderRadius: "14px", padding: "1.1rem",
          textAlign: "center", cursor: "pointer",
          background: dragging
            ? "rgba(0,212,255,0.07)"
            : "linear-gradient(135deg, rgba(0,212,255,0.03), rgba(0,85,204,0.03))",
          transition: "all 0.25s", position: "relative", overflow: "hidden",
        }}>
        {/* Shimmer on drag */}
        {dragging && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.08), transparent)",
            backgroundSize: "200% 100%", animation: "shimmer 1s infinite",
          }} />
        )}
        <div style={{ fontSize: "1.6rem", marginBottom: "6px" }} className={dragging ? "float" : ""}>
          {dragging ? "📂" : "📄"}
        </div>
        <p style={{ color: "var(--text-dim)", fontSize: "0.7rem", marginBottom: "10px", fontFamily: "var(--font-body)" }}>
          {dragging ? "Release to upload" : "Drag & drop PDF here"}
        </p>
        {!dragging && (
          <span style={{
            display: "inline-block",
            background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)",
            borderRadius: "8px", padding: "5px 14px",
            color: "var(--cyan)", fontSize: "0.7rem",
            fontFamily: "var(--font-body)", fontWeight: "600", letterSpacing: "0.03em",
          }}>Browse Files</span>
        )}
        <input
          ref={fileRef} type="file" accept=".pdf" multiple hidden
          onChange={e => { addFiles(e.target.files); e.target.value = ""; }}
        />
      </div>

      {/* PDF List */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "6px" }}>
        {pdfs.length === 0 ? (
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: "10px", padding: "2rem 0",
          }}>
            <div style={{ fontSize: "2.2rem", opacity: 0.25 }}>🗂️</div>
            <p style={{ fontSize: "0.7rem", color: "var(--text-dim)", textAlign: "center", lineHeight: 1.5, fontFamily: "var(--font-body)" }}>
              Upload PDFs to start your AI study session
            </p>
          </div>
        ) : pdfs.map((pdf, idx) => (
          <div
            key={pdf.id}
            className="pdf-card"
            onClick={() => setSelected(pdf.id)}
            style={{
              padding: "10px 12px", borderRadius: "12px", cursor: "pointer",
              background: selected === pdf.id
                ? `linear-gradient(135deg, ${pdf.color}12, rgba(0,85,204,0.08))`
                : "rgba(255,255,255,0.025)",
              border: `1px solid ${selected === pdf.id ? pdf.color + "50" : "rgba(255,255,255,0.06)"}`,
              display: "flex", alignItems: "center", gap: "10px",
              animation: `fade-up 0.3s ${idx * 0.05}s both`,
            }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "9px",
              background: `linear-gradient(135deg, ${pdf.color}25, ${pdf.color}10)`,
              border: `1px solid ${pdf.color}35`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "15px", flexShrink: 0,
              boxShadow: selected === pdf.id ? `0 0 12px ${pdf.color}30` : "none",
            }}>📑</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                margin: 0, fontSize: "0.72rem", fontWeight: "600",
                color: selected === pdf.id ? "#fff" : "rgba(255,255,255,0.6)",
                fontFamily: "var(--font-body)",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>{pdf.name}</p>
              <p style={{ margin: 0, fontSize: "0.62rem", color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>
                {pdf.size} · {pdf.date}
              </p>
            </div>
            <button
              onClick={e => removePdf(e, pdf.id)}
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.2)", fontSize: "11px",
                flexShrink: 0, padding: "2px 4px", borderRadius: "4px", transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "transparent"; }}
            >✕</button>
          </div>
        ))}
      </div>

      {/* Active document footer */}
      <div style={{
        padding: "10px 12px", borderRadius: "12px",
        background: "linear-gradient(135deg, rgba(0,212,255,0.07), rgba(0,85,204,0.05))",
        border: "1px solid rgba(0,212,255,0.15)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)",
        }} />
        <p style={{ margin: "0 0 3px", fontSize: "0.58rem", color: "var(--cyan)", fontFamily: "var(--font-mono)", letterSpacing: "0.15em" }}>▶ ACTIVE</p>
        <p style={{ margin: 0, fontSize: "0.7rem", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)", fontWeight: 500 }}>
          {selected ? pdfs.find(p => p.id === selected)?.name : "No document selected"}
        </p>
      </div>
    </aside>
  );
}