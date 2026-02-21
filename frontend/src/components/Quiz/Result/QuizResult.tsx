import { Link } from "react-router-dom";
import type { Question } from "../../../types/interface";
import { ResultRow } from "./ResultRow";
import type React from "react";
import type { SetStateAction } from "react";

export function QuizResult({ score, totalQuestions, accuracy, answers, questions, timeSpent, section, setSection, totalSections }: {
  timeSpent: Record<number, number>, score: number, totalQuestions: number, accuracy: number, answers: string[], questions: Question[], section: number, setSection: React.Dispatch<SetStateAction<number>>, totalSections: number
}) {
  console.log(timeSpent)

  const grade =
    accuracy >= 90 ? { label: "Excellent!", color: "#34d399" } :
    accuracy >= 70 ? { label: "Good Job!", color: "#00d4ff" } :
    accuracy >= 50 ? { label: "Not Bad!", color: "#f59e0b" } :
                     { label: "Keep Practicing", color: "#f87171" };

  return (
    <div style={{ animation: "fade-in 0.5s ease forwards" }}>

      {/* ── Score Hero ── */}
      <div style={{
        textAlign: "center", marginBottom: "2.5rem",
        paddingBottom: "2rem",
        borderBottom: "1px solid rgba(0,212,255,0.12)",
      }}>
        {/* Score circle */}
        <div style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: "80px", height: "80px", borderRadius: "20px",
          background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,85,204,0.1))",
          border: "1px solid rgba(0,212,255,0.3)",
          boxShadow: "0 0 24px rgba(0,212,255,0.2)",
          marginBottom: "1rem",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)",
          }} />
          <span style={{
            fontSize: "1.8rem", fontWeight: 700,
            color: "#00d4ff", fontFamily: "'Space Mono', monospace",
          }}>{score}</span>
        </div>

        <p style={{
          color: "rgba(255,255,255,0.4)", fontSize: "0.8rem",
          fontFamily: "'DM Sans', sans-serif", marginBottom: "4px",
        }}>out of {totalQuestions} correct</p>

        <p style={{
          fontSize: "1.5rem", fontWeight: 700,
          color: grade.color, fontFamily: "'DM Sans', sans-serif",
          marginBottom: "4px",
        }}>{grade.label}</p>

        <p style={{
          color: "rgba(255,255,255,0.45)", fontSize: "0.85rem",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          You scored{" "}
          <strong style={{ color: "rgba(255,255,255,0.85)" }}>{accuracy}%</strong>
          {" "}accuracy
        </p>

        {/* Stat pills */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "1.2rem" }}>
          <span style={{
            padding: "6px 14px",
            background: "rgba(52,211,153,0.1)",
            border: "1px solid rgba(52,211,153,0.3)",
            borderRadius: "999px",
            fontSize: "0.72rem", fontWeight: 600,
            color: "#34d399", fontFamily: "'DM Sans', sans-serif",
          }}>
            ✓ {score} Correct
          </span>
          <span style={{
            padding: "6px 14px",
            background: "rgba(248,113,113,0.1)",
            border: "1px solid rgba(248,113,113,0.3)",
            borderRadius: "999px",
            fontSize: "0.72rem", fontWeight: 600,
            color: "#f87171", fontFamily: "'DM Sans', sans-serif",
          }}>
            ✗ {totalQuestions - score} Wrong
          </span>
        </div>
      </div>

      {/* ── Review Answers ── */}
      <h3 style={{
        fontSize: "0.62rem", fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.18em",
        color: "rgba(255,255,255,0.35)",
        fontFamily: "'Space Mono', monospace",
        marginBottom: "1rem",
      }}>
        Review Answers
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "2rem" }}>
        {questions.map((q, i) => (
          q.type ?
          <></> :
          <ResultRow
            key={q.id}
            question={q}
            timeSpent={timeSpent[q.id]}
            userAnswer={answers[q.id]}
            index={i}
          />
        ))}
      </div>

      {/* ── Action Button ── */}
      {section != totalSections ? (
        <button
          onClick={() => setSection(prev => prev + 1)}
          style={{
            width: "100%", padding: "14px",
            borderRadius: "12px", border: "none",
            background: "linear-gradient(135deg, #00d4ff, #0055cc)",
            color: "#fff", fontSize: "0.88rem", fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
            boxShadow: "0 0 20px rgba(0,212,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.55), inset 0 1px 0 rgba(255,255,255,0.15)"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"}
        >
          Move to Next Section
        </button>
      ) : (
        <Link to={"/result"}>
          <button
            style={{
              width: "100%", padding: "14px",
              borderRadius: "12px", border: "none",
              background: "linear-gradient(135deg, #00d4ff, #0055cc)",
              color: "#fff", fontSize: "0.88rem", fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
              boxShadow: "0 0 20px rgba(0,212,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.55), inset 0 1px 0 rgba(255,255,255,0.15)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"}
          >
            See Analysis
          </button>
        </Link>
      )}

    </div>
  );
}