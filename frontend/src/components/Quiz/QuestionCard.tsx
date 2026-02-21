import type { Question } from "../../types/interface";
import { OptionButton } from "./OptionButton";

interface QuestionCardProps {
  question: Question
  selectedAnswer: string
  onSelect: (option: string) => void
}

export function QuestionCard({ question, selectedAnswer, onSelect }: QuestionCardProps) {
  return (
    <section aria-label="Question card">

      {/* "Question" label */}
      <p style={{
        fontSize: "0.65rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        color: "#00d4ff",
        fontFamily: "'Space Mono', monospace",
        marginBottom: "0.75rem",
      }}>
        Question
      </p>

      {/* Question text */}
      <h2 style={{
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "rgba(255,255,255,0.92)",
        lineHeight: 1.65,
        fontFamily: "'DM Sans', sans-serif",
        marginBottom: "2rem",
      }}>
        {question.question}
      </h2>

      {/* Options list */}
      <div
        role="radiogroup"
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        {question.options.map((option, i) => (
          <OptionButton
            key={option}
            option={option}
            index={i}
            isSelected={selectedAnswer === option}
            onSelect={onSelect}
          />
        ))}
      </div>

    </section>
  );
}