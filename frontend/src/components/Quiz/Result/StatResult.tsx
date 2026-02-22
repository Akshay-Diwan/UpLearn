import { useState, useEffect } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
  type TooltipContentProps,
} from "recharts";
import NavButton from "../../button/NavButtons";

type learningCategory = "accelerated" | "standard" | "supported" | "struggler";

export default function ResultPage() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dominantType, setDominantType] = useState<learningCategory>("standard");
  const [aiAnalysis, setAiAnalysis] = useState<string>("");

  // Retrieve data saved after Quiz completion
  const score = Number(localStorage.getItem("score") || 0);
  const accuracy = Number(localStorage.getItem("accuracy") || 0);

  useEffect(() => {
    const getDetailedAnalysis = async () => {
      try {
        // 1. Get Category from Backend
        const catRes = await fetch("http://localhost:8000/quiz/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Accuracy: accuracy }),
        });
        const { category } = await catRes.json();
        const lowerCat = category.toLowerCase() as learningCategory;
        setDominantType(lowerCat);

        // 2. Get AI Analysis text from Backend
        const analysisRes = await fetch("http://localhost:8000/quiz_analysis/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ despo: category }),
        });
        const { Answer } = await analysisRes.json();
        setAiAnalysis(Answer);

        setLoading(false);
        setTimeout(() => setVisible(true), 60);
      } catch (error) {
        console.error("Error connecting to backend:", error);
        setLoading(false);
      }
    };

    getDetailedAnalysis();
  }, [accuracy]);

  // Dynamic Radar Data based on user accuracy
  const chartData = [
    { subject: "Accelerated", value: dominantType === "accelerated" ? accuracy : 30 },
    { subject: "Standard", value: dominantType === "standard" ? accuracy : 40 },
    { subject: "Supported", value: dominantType === "supported" ? accuracy : 40 },
    { subject: "Struggler", value: dominantType === "struggler" ? accuracy : 20 },
  ];

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#020810", display: "flex", justifyContent: "center", alignItems: "center", color: "#00d4ff", fontFamily: "'Space Mono', monospace" }}>
        GENERATING AI ANALYSIS...
      </div>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#020810", padding: "3.5rem 1rem", opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}>
      <div style={{ maxWidth: "896px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        
        <header style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "1.9rem", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>Your Learning Profile</h1>
        </header>

        {/* Stats Card */}
        <div style={{ background: "rgba(4,13,26,0.85)", borderRadius: "16px", padding: "1.75rem", border: "1px solid rgba(0,212,255,0.15)", display: "flex", justifyContent: "space-around" }}>
          <StatItem label="Score" value={score.toString()} />
          <StatItem label="Accuracy" value={`${accuracy}%`} />
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: "5px" }}>TYPE</span>
            <span style={{ padding: "5px 15px", borderRadius: "20px", background: "rgba(0,212,255,0.1)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.3)", textTransform: "capitalize" }}>{dominantType}</span>
          </div>
        </div>

        {/* Radar Chart */}
        <div style={{ background: "rgba(4,13,26,0.85)", borderRadius: "16px", padding: "2rem", border: "1px solid rgba(0,212,255,0.15)" }}>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={chartData}>
              <PolarGrid stroke="rgba(0,212,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} />
              <Radar name="Score" dataKey="value" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Analysis Output */}
        <div style={{ background: "rgba(4,13,26,0.85)", borderRadius: "16px", padding: "2rem", border: "1px solid rgba(0,212,255,0.15)", whiteSpace: "pre-wrap", color: "rgba(255,255,255,0.8)", lineHeight: "1.8", fontFamily: "'DM Sans', sans-serif" }}>
          <h3 style={{ color: "#00d4ff", marginBottom: "15px" }}>AI Evaluation</h3>
          {aiAnalysis}
        </div>

        <NavButton />
      </div>
    </main>
  );
}

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div style={{ textAlign: "center" }}>
    <span style={{ fontSize: "1.8rem", fontWeight: 700, color: "#fff", display: "block" }}>{value}</span>
    <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>{label}</span>
  </div>
);