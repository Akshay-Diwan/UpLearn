import { useState } from "react";
import GlobalStyles from "../components/chatInterface/GlobalStyles";
import Header from "../components/chatInterface/Header";
import LeftPanel from "../components/chatInterface/LeftPanel";
import ChatInterface from "../components/chatInterface/ChatInterface";
import RightPanel from "../components/chatInterface/RightPanel";


export default function Dashboard() {
  const [suggestionInput, setSuggestionInput] = useState("");
  const [queryHistory, setQueryHistory]       = useState([]);
  const [pdfCount, setPdfCount]               = useState(0);
  const [sessionTime, setSessionTime]         = useState("00:00");

  const addToHistory = (text) => {
    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    setQueryHistory(prev => [...prev, { q: text, time }]);
  };

  return (
    <>
      <GlobalStyles />
      <div style={{
        height: "100vh", background: "var(--dark)",
        display: "flex", flexDirection: "column",
        overflow: "hidden", position: "relative",
      }}>
        {/* Deep space background */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10%", left: "25%", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(0,100,200,0.1) 0%, transparent 65%)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: "-15%", right: "15%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", top: "30%", right: "-5%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 65%)", borderRadius: "50%" }} />
          {[...Array(55)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${(i * 37 + 13) % 100}%`, top: `${(i * 53 + 7) % 100}%`,
              width: `${(i % 3) + 1}px`, height: `${(i % 3) + 1}px`,
              background: i % 7 === 0 ? "#00d4ff" : "#fff",
              borderRadius: "50%", opacity: ((i % 5) + 1) * 0.07,
            }} />
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.04), transparent)", animation: "scan 12s linear infinite" }} />
        </div>

        {/* Layout */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
          <Header />
          <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            <LeftPanel onPdfCountChange={setPdfCount} />
            <ChatInterface
              externalInput={suggestionInput}
              clearExternalInput={() => setSuggestionInput("")}
              onMessageSent={addToHistory}
            />
            <RightPanel
              onSuggestionClick={setSuggestionInput}
              history={queryHistory}
              queryCount={queryHistory.length}
              pdfCount={pdfCount}
              sessionTime={sessionTime}
            />
          </div>
        </div>
      </div>
    </>
  );
}