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
import type { ChartData } from "recharts/types/state/chartDataSlice";

type learningCategory = "accelerated" | "standard" | "supported" | "struggler"

// ─── utils/formatChartData.js ─────────────────────────────────────────────────
const formatChartData = (categoryDistribution: {
  accelerated: number, standard: number, supported: number, struggler: number
}) => [
  { subject: "Accelerated", value: categoryDistribution.accelerated, fullMark: 100 },
  { subject: "Standard",    value: categoryDistribution.standard,    fullMark: 100 },
  { subject: "Supported",   value: categoryDistribution.supported,   fullMark: 100 },
  { subject: "Struggler",   value: categoryDistribution.struggler,   fullMark: 100 },
];

// ─── utils/generateSummary.js ─────────────────────────────────────────────────
const SUMMARIES = {
  accelerated: {
    headline: "You're a Fast-Track Learner",
    description: "You absorb and process new information at a remarkable pace. Complex concepts rarely slow you down — you thrive on challenge and actively seek deeper understanding beyond the surface level.",
    recommendations: [
      "Tackle advanced material and stretch assignments to stay engaged.",
      "Mentor peers to reinforce your own mastery and build leadership skills.",
      "Explore interdisciplinary connections to broaden your knowledge base.",
    ],
  },
  standard: {
    headline: "You're a Steady, Reliable Learner",
    description: "You learn at a consistent, dependable pace and demonstrate solid comprehension across topics. You balance depth and breadth effectively, making you a well-rounded student.",
    recommendations: [
      "Set incremental goals to maintain your momentum.",
      "Use spaced repetition to consolidate what you've learned.",
      "Push yourself occasionally into challenging material to accelerate growth.",
    ],
  },
  supported: {
    headline: "You Thrive With Structure",
    description: "You learn best when guided by clear frameworks and supportive resources. With the right scaffolding in place, you consistently reach your goals and build lasting comprehension.",
    recommendations: [
      "Break larger topics into smaller, clearly defined steps.",
      "Leverage study groups, tutors, or guided learning paths.",
      "Focus on foundational concepts before advancing to complex material.",
    ],
  },
  struggler: {
    headline: "You're in a Growth Moment",
    description: "You're facing real challenges right now — and that's completely okay. Recognising where you struggle is the first, most important step toward meaningful improvement.",
    recommendations: [
      "Identify your weakest topic areas and dedicate focused time to them.",
      "Work with a mentor or instructor to build confidence steadily.",
      "Celebrate small wins to stay motivated throughout your journey.",
    ],
  },
};

const generateSummary = (dominantType: learningCategory) => SUMMARIES[dominantType] ?? SUMMARIES.standard;

// ─── Badge colors per category ────────────────────────────────────────────────
const BADGE_STYLES: Record<learningCategory, { bg: string, color: string, border: string }> = {
  accelerated: { bg: "rgba(52,211,153,0.1)",  color: "#34d399", border: "rgba(52,211,153,0.3)"  },
  standard:    { bg: "rgba(0,212,255,0.1)",   color: "#00d4ff", border: "rgba(0,212,255,0.3)"   },
  supported:   { bg: "rgba(245,158,11,0.1)",  color: "#f59e0b", border: "rgba(245,158,11,0.3)"  },
  struggler:   { bg: "rgba(248,113,113,0.1)", color: "#f87171", border: "rgba(248,113,113,0.3)" },
};

// ─── StatItem ─────────────────────────────────────────────────────────────────
const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
    <span style={{
      fontSize: "1.9rem", fontWeight: 700,
      color: "#fff", fontFamily: "'Space Mono', monospace",
      fontVariantNumeric: "tabular-nums",
    }}>{value}</span>
    <span style={{
      fontSize: "0.62rem", fontWeight: 600,
      textTransform: "uppercase", letterSpacing: "0.16em",
      color: "rgba(255,255,255,0.35)", fontFamily: "'Space Mono', monospace",
    }}>{label}</span>
  </div>
);

// ─── StatsCard ────────────────────────────────────────────────────────────────
const StatsCard = ({ totalScore, accuracy, dominantType }: { totalScore: number, accuracy: number, dominantType: learningCategory }) => {
  const badge = BADGE_STYLES[dominantType] ?? BADGE_STYLES.standard;
  return (
    <div style={{
      background: "rgba(4,13,26,0.85)",
      borderRadius: "16px", border: "1px solid rgba(0,212,255,0.15)",
      padding: "1.75rem 2rem",
      backdropFilter: "blur(20px)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)",
      }} />
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          <StatItem label="Total Score" value={"" + totalScore} />
          <div style={{ width: "1px", background: "rgba(0,212,255,0.12)", alignSelf: "stretch" }} />
          <StatItem label="Accuracy" value={`${accuracy}%`} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "6px" }}>
          <span style={{
            fontSize: "0.6rem", fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.16em",
            color: "rgba(255,255,255,0.35)", fontFamily: "'Space Mono', monospace",
          }}>Dominant Type</span>
          <span style={{
            padding: "5px 16px", borderRadius: "999px",
            fontSize: "0.8rem", fontWeight: 600,
            background: badge.bg, color: badge.color,
            border: `1px solid ${badge.border}`,
            fontFamily: "'DM Sans', sans-serif",
            textTransform: "capitalize",
          }}>{dominantType}</span>
        </div>
      </div>
    </div>
  );
};

// ─── CustomTooltip ────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload }: TooltipContentProps) => {
  if (!active || !payload?.length) return null;
  const { subject, value } = payload[0].payload;
  return (
    <div style={{
      background: "rgba(4,13,26,0.95)",
      border: "1px solid rgba(0,212,255,0.3)",
      borderRadius: "10px", padding: "8px 14px",
      boxShadow: "0 0 16px rgba(0,212,255,0.2)",
    }}>
      <p style={{ fontWeight: 600, color: "rgba(255,255,255,0.85)", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}>{subject}</p>
      <p style={{ color: "#00d4ff", fontWeight: 700, fontSize: "0.85rem", fontFamily: "'Space Mono', monospace" }}>{value}%</p>
    </div>
  );
};

// ─── RadarChartComponent ──────────────────────────────────────────────────────
const RadarChartComponent = ({ data }: { data: ChartData }) => (
  <div style={{
    background: "rgba(4,13,26,0.85)",
    borderRadius: "16px", border: "1px solid rgba(0,212,255,0.15)",
    padding: "2rem 1.5rem",
    backdropFilter: "blur(20px)",
    position: "relative", overflow: "hidden",
  }}>
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: "1px",
      background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)",
    }} />
    <h2 style={{
      fontSize: "0.62rem", fontWeight: 600,
      textTransform: "uppercase", letterSpacing: "0.18em",
      color: "rgba(255,255,255,0.35)", fontFamily: "'Space Mono', monospace",
      marginBottom: "1.5rem", textAlign: "center",
    }}>Category Breakdown</h2>
    <ResponsiveContainer width="100%" height={340}>
      <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
        <PolarGrid stroke="rgba(0,212,255,0.12)" strokeDasharray="4 4" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 500 }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }}
          axisLine={false}
        />
        <Radar
          name="Score"
          dataKey="value"
          stroke="#00d4ff"
          strokeWidth={2}
          fill="#00d4ff"
          fillOpacity={0.1}
          isAnimationActive
          animationDuration={900}
          animationEasing="ease-out"
          dot={{ r: 4, fill: "#00d4ff", strokeWidth: 0 }}
        />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);

// ─── SummaryCard ──────────────────────────────────────────────────────────────
const SummaryCard = ({ dominantType }: { dominantType: learningCategory }) => {
  const { headline, description, recommendations } = generateSummary(dominantType);
  return (
    <div style={{
      background: "rgba(4,13,26,0.85)",
      borderRadius: "16px", border: "1px solid rgba(0,212,255,0.15)",
      padding: "2rem",
      backdropFilter: "blur(20px)",
      position: "relative", overflow: "hidden",
      transition: "box-shadow 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.08)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)",
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        {/* Icon */}
        <div style={{
          marginTop: "2px", flexShrink: 0,
          width: "36px", height: "36px", borderRadius: "10px",
          background: "linear-gradient(135deg, #00d4ff, #0055cc)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 14px rgba(0,212,255,0.35)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)" }} />
          <svg style={{ width: "18px", height: "18px", color: "#fff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: "1.05rem", fontWeight: 700,
            color: "#fff", fontFamily: "'DM Sans', sans-serif",
            marginBottom: "8px",
          }}>{headline}</h3>
          <p style={{
            color: "rgba(255,255,255,0.45)", fontSize: "0.85rem",
            lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif",
            marginBottom: "1.25rem",
          }}>{description}</p>

          {/* Recommendations */}
          <p style={{
            fontSize: "0.6rem", fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Space Mono', monospace",
            marginBottom: "0.75rem",
          }}>Recommendations</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {recommendations.map((rec, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{
                  marginTop: "1px", flexShrink: 0,
                  width: "20px", height: "20px", borderRadius: "50%",
                  background: "rgba(0,212,255,0.12)",
                  border: "1px solid rgba(0,212,255,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#00d4ff", fontSize: "0.65rem", fontWeight: 700,
                  fontFamily: "'Space Mono', monospace",
                }}>{i + 1}</span>
                <p style={{
                  fontSize: "0.83rem", color: "rgba(255,255,255,0.6)",
                  fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6,
                }}>{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Types ────────────────────────────────────────────────────────────────────
type CategoryScores = { [K in learningCategory]: number; };

interface CustomChartData {
  totalScore: number, accuracy: number,
  dominantType: learningCategory, categoryDistribution: CategoryScores
}

// ─── ResultPage ───────────────────────────────────────────────────────────────
const SAMPLE_DATA = {
  totalScore: 84, accuracy: 91,
  dominantType: "accelerated" as learningCategory,
  categoryDistribution: { accelerated: 88, standard: 72, supported: 45, struggler: 20 },
};

export default function ResultPage() {
  const { totalScore, accuracy, dominantType, categoryDistribution } = SAMPLE_DATA;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const chartData = formatChartData(categoryDistribution);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020810",
        padding: "3.5rem 1rem",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
        position: "relative",
      }}
    >
      {/* Background glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-10%", left: "20%",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(0,100,200,0.1) 0%, transparent 65%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", right: "15%",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)",
          borderRadius: "50%",
        }} />
        {[...Array(40)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 37 + 13) % 100}%`, top: `${(i * 53 + 7) % 100}%`,
            width: `${(i % 3) + 1}px`, height: `${(i % 3) + 1}px`,
            background: i % 7 === 0 ? "#00d4ff" : "#fff",
            borderRadius: "50%", opacity: ((i % 5) + 1) * 0.07,
          }} />
        ))}
      </div>

      <div style={{ maxWidth: "896px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          <h1 style={{
            fontSize: "1.9rem", fontWeight: 700,
            letterSpacing: "-0.02em", color: "#fff",
            fontFamily: "'DM Sans', sans-serif",
          }}>Your Learning Profile</h1>
          <p style={{
            fontSize: "0.82rem", color: "rgba(255,255,255,0.35)",
            marginTop: "6px", fontWeight: 500,
            fontFamily: "'DM Sans', sans-serif",
          }}>Here's how you performed across all categories</p>
        </header>

        {/* Stats */}
        <StatsCard totalScore={totalScore} accuracy={accuracy} dominantType={dominantType} />

        {/* Chart */}
        <RadarChartComponent data={chartData} />

        {/* Summary */}
        <SummaryCard dominantType={dominantType} />

      </div>
    </main>
  );
}