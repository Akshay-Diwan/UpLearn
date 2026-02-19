// import type { Question } from "../../../types/interface";
// import { ResultRow } from "./ResultRow";

// export function QuizResult({ score, total, accuracy, answers, questions, onRestart }: {
//     score: number, total: number, accuracy: number, answers: string[], questions: Question[], onRestart: () => void
// }) {
//   const grade =
//     accuracy >= 90 ? { label: "Excellent!", color: "text-emerald-500" } :
//     accuracy >= 70 ? { label: "Good Job!", color: "text-blue-500" } :
//     accuracy >= 50 ? { label: "Not Bad!", color: "text-amber-500" } :
//                      { label: "Keep Practicing", color: "text-red-400" };

//   return (
//     <div className="animate-in fade-in duration-500">
//       {/* Score Hero */}
//       <div className="text-center mb-10 pb-8 border-b border-slate-100">
//         <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-50 mb-4">
//           <span className="text-3xl font-bold text-blue-500">{score}</span>
//         </div>
//         <p className="text-slate-400 text-sm mb-1">out of {total} correct</p>
//         <p className={`text-2xl font-bold mb-1 ${grade.color}`}>{grade.label}</p>
//         <p className="text-slate-500 text-sm">You scored <strong className="text-slate-700">{accuracy}%</strong> accuracy</p>

//         {/* Stat pills */}
//         <div className="flex items-center justify-center gap-3 mt-5">
//           <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-700">
//             ✓ {score} Correct
//           </span>
//           <span className="px-3 py-1.5 bg-red-50 border border-red-200 rounded-full text-xs font-semibold text-red-600">
//             ✗ {total - score} Wrong
//           </span>
//         </div>
//       </div>
      
//       {/* Answer Review */}
//       <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-4">
//         Review Answers
//       </h3>
//       <div className="flex flex-col gap-3 mb-8">
//         {questions.map((q, i) => (
//           <ResultRow
//             key={q.id}
//             question={q}
//             userAnswer={answers[q.id]}
//             index={i}
//           />
//         ))}
//       </div>

//       {/* Restart */}
//       <button
//         onClick={onRestart}
//         className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md"
//       >
//         Retake Quiz
//       </button>
//     </div>
//   );
// }

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

type learningCategory  = "accelerated" | "standard" | "supported" | "struggler"

// ─── utils/formatChartData.js ────────────────────────────────────────────────
const formatChartData = (categoryDistribution:{
    accelerated: number,
    standard: number,
    supported: number,
    struggler: number
}) => [
  { subject: "Accelerated", value: categoryDistribution.accelerated, fullMark: 100 },
  { subject: "Standard",    value: categoryDistribution.standard,    fullMark: 100 },
  { subject: "Supported",   value: categoryDistribution.supported,   fullMark: 100 },
  { subject: "Struggler",   value: categoryDistribution.struggler,   fullMark: 100 },
];

// ─── utils/generateSummary.js ────────────────────────────────────────────────
const SUMMARIES = {
  accelerated: {
    headline: "You're a Fast-Track Learner",
    description:
      "You absorb and process new information at a remarkable pace. Complex concepts rarely slow you down — you thrive on challenge and actively seek deeper understanding beyond the surface level.",
    recommendations: [
      "Tackle advanced material and stretch assignments to stay engaged.",
      "Mentor peers to reinforce your own mastery and build leadership skills.",
      "Explore interdisciplinary connections to broaden your knowledge base.",
    ],
  },
  standard: {
    headline: "You're a Steady, Reliable Learner",
    description:
      "You learn at a consistent, dependable pace and demonstrate solid comprehension across topics. You balance depth and breadth effectively, making you a well-rounded student.",
    recommendations: [
      "Set incremental goals to maintain your momentum.",
      "Use spaced repetition to consolidate what you've learned.",
      "Push yourself occasionally into challenging material to accelerate growth.",
    ],
  },
  supported: {
    headline: "You Thrive With Structure",
    description:
      "You learn best when guided by clear frameworks and supportive resources. With the right scaffolding in place, you consistently reach your goals and build lasting comprehension.",
    recommendations: [
      "Break larger topics into smaller, clearly defined steps.",
      "Leverage study groups, tutors, or guided learning paths.",
      "Focus on foundational concepts before advancing to complex material.",
    ],
  },
  struggler: {
    headline: "You're in a Growth Moment",
    description:
      "You're facing real challenges right now — and that's completely okay. Recognising where you struggle is the first, most important step toward meaningful improvement.",
    recommendations: [
      "Identify your weakest topic areas and dedicate focused time to them.",
      "Work with a mentor or instructor to build confidence steadily.",
      "Celebrate small wins to stay motivated throughout your journey.",
    ],
  },
};

const generateSummary = (dominantType: learningCategory) => SUMMARIES[dominantType] ?? SUMMARIES.standard;

// ─── components/StatsCard ────────────────────────────────────────────────────
const BADGE_STYLES = {
  accelerated: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  standard:    "bg-blue-50   text-blue-700   ring-1 ring-blue-200",
  supported:   "bg-amber-50  text-amber-700  ring-1 ring-amber-200",
  struggler:   "bg-rose-50   text-rose-700   ring-1 ring-rose-200",
};

const StatItem = ({ label, value }: {label: string, value: string}) => (
  <div className="flex flex-col items-center gap-1">
    <span className="text-3xl font-bold text-gray-800 tabular-nums">{value}</span>
    <span className="text-xs font-medium uppercase tracking-widest text-gray-400">{label}</span>
  </div>
);

const StatsCard = ({ totalScore, accuracy, dominantType }: {totalScore: number, accuracy: number, dominantType: learningCategory}) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-7">
    <div className="flex flex-wrap items-center justify-between gap-6">
      <div className="flex gap-10">
        <StatItem label="Total Score" value={"" + totalScore} />
        <div className="w-px bg-gray-100 self-stretch" />
        <StatItem label="Accuracy" value={`${accuracy}%`} />
      </div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
          Dominant Type
        </span>
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
            BADGE_STYLES[dominantType] ?? BADGE_STYLES.standard
          }`}
        >
          {dominantType}
        </span>
      </div>
    </div>
  </div>
);

// ─── components/RadarChartComponent ─────────────────────────────────────────
const CustomTooltip = ({ active, payload}: TooltipContentProps) => {
  if (!active || !payload?.length) return null;
  const { subject, value } = payload[0].payload;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md px-4 py-2 text-sm">
      <p className="font-semibold text-gray-700">{subject}</p>
      <p className="text-blue-500 font-bold">{value}%</p>
    </div>
  );
};

const RadarChartComponent = ( {data} : {data: ChartData} ) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-8">
    <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6 text-center">
      Category Breakdown
    </h2>
    <ResponsiveContainer width="100%" height={340}>
      <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
        <PolarGrid stroke="#e5e7eb" strokeDasharray="4 4" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "#6b7280", fontSize: 13, fontWeight: 500 }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fill: "#d1d5db", fontSize: 10 }}
          axisLine={false}
        />
        <Radar
          name="Score"
          dataKey="value"
          stroke="#3b82f6"
          strokeWidth={2}
          fill="#3b82f6"
          fillOpacity={0.12}
          isAnimationActive
          animationDuration={900}
          animationEasing="ease-out"
          dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
        />
        <Tooltip content={<CustomTooltip  />} />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);

// ─── components/SummaryCard ──────────────────────────────────────────────────
const SummaryCard = ({ dominantType }: {dominantType: learningCategory}) => {
  const { headline, description, recommendations } = generateSummary(dominantType);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8 transition-shadow duration-200 hover:shadow-md group">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 shrink-0 w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{headline}</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-5">{description}</p>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Recommendations
            </p>
            {recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-xs font-bold">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-600">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

type CategoryScores = {
  [K in learningCategory]: number;
};

interface CustomChartData{
    totalScore: number,
    accuracy: number,
    dominantType: learningCategory,
    categoryDistribution: CategoryScores
}
// ─── ResultPage ───────────────────────────────────────────────────────────────
const SAMPLE_DATA = {
  totalScore: 84,
  accuracy: 91,
  dominantType: "accelerated",
  categoryDistribution: {
    accelerated: 88,
    standard: 72,
    supported: 45,
    struggler: 20,
  },
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
      className="min-h-screen bg-gray-50 py-14 px-4"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <header className="text-center mb-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Your Learning Profile
          </h1>
          <p className="text-sm text-gray-400 mt-1 font-medium">
            Here's how you performed across all categories
          </p>
        </header>

        {/* Stats */}
        <StatsCard
          totalScore={totalScore}
          accuracy={accuracy}
          dominantType={dominantType}
        />

        {/* Chart */}
        <RadarChartComponent data={chartData} />

        {/* Summary */}
        <SummaryCard dominantType={dominantType} />
      </div>
    </main>
  );
}