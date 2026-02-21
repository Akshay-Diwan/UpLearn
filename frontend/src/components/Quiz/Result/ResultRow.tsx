import type { Question } from "../../../types/interface";
import { convertToMinutesAndSeconds } from "../../../utils/timeConversions";

export function ResultRow({ question, userAnswer, index, timeSpent }: { question: Question, userAnswer: string, index: number, timeSpent: number }) {
  const isCorrect = userAnswer === question.correctAnswer;
  const timeTaken = convertToMinutesAndSeconds(timeSpent);

  return (
    <div style={{
      padding: "1.1rem 1.25rem",
      borderRadius: "12px",
      border: isCorrect ? "1px solid rgba(52,211,153,0.3)" : "1px solid rgba(248,113,113,0.3)",
      background: isCorrect
        ? "linear-gradient(135deg, rgba(52,211,153,0.07), rgba(52,211,153,0.03))"
        : "linear-gradient(135deg, rgba(248,113,113,0.07), rgba(248,113,113,0.03))",
      position: "relative", overflow: "hidden",
    }}>
      {/* Top shimmer line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: isCorrect
          ? "linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)"
          : "linear-gradient(90deg, transparent, rgba(248,113,113,0.5), transparent)",
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>

        {/* Correct / Wrong icon badge */}
        <span style={{
          marginTop: "2px", flexShrink: 0,
          width: "20px", height: "20px", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isCorrect ? "#34d399" : "#f87171",
          boxShadow: isCorrect ? "0 0 8px rgba(52,211,153,0.4)" : "0 0 8px rgba(248,113,113,0.4)",
        }}>
          {isCorrect ? (
            <svg style={{ width: "11px", height: "11px", color: "#fff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg style={{ width: "11px", height: "11px", color: "#fff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Question text */}
          <p style={{
            fontSize: "0.82rem", fontWeight: 600,
            color: "rgba(255,255,255,0.85)",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: "6px", lineHeight: 1.5,
          }}>
            Q{index + 1}. {question.question}
          </p>

          {/* User's answer */}
          <p style={{
            fontSize: "0.8rem",
            color: isCorrect ? "#34d399" : "#f87171",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: "2px",
          }}>
            Your answer:{" "}
            <span style={{ fontWeight: 600 }}>
              {userAnswer ?? <em style={{ fontWeight: 400 }}>Not answered</em>}
            </span>
          </p>

          {/* Correct answer (only shown when wrong) */}
          {!isCorrect && (
            <p style={{
              fontSize: "0.8rem", color: "#34d399",
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: "2px",
            }}>
              Correct answer:{" "}
              <span style={{ fontWeight: 600 }}>{question.correctAnswer}</span>
            </p>
          )}

          {/* Time taken */}
          <p style={{
            fontSize: "0.72rem", fontWeight: 600,
            color: "rgba(255,255,255,0.35)",
            fontFamily: "'Space Mono', monospace",
            marginTop: "6px",
          }}>
            ◷ {timeTaken[0] + " m , " + timeTaken[1] + "s"}
          </p>

        </div>
      </div>
    </div>
  );
}