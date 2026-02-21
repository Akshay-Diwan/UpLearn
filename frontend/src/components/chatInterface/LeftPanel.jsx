import { useState, useRef } from "react";

const pdfColors = ["#00d4ff", "#a78bfa", "#34d399", "#fb923c", "#f472b6", "#facc15"];

// Props:
//   onPdfCountChange(count) — tells App how many PDFs are loaded so RightPanel stats update

export default function LeftPanel({ onPdfCountChange, diagramRef }) {
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
      width: "500px", minWidth: "255px",
      background: "var(--panel)",
      borderRight: "1px solid var(--border)",
      display: "flex", flexDirection: "column",
      padding: "1.2rem", gap: "1rem",
      backdropFilter: "blur(20px)",
      position: "relative", overflowX: "hidden",
    }}>
      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: "20%", bottom: "20%", width: "2px",
        background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.5), transparent)",
      }} />

        <div className="app-diagram-inner" ref={diagramRef}/>
      
    </aside>
  );
}