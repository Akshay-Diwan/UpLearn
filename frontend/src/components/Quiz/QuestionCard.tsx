import type { Question } from "../../types/interface";
import { OptionButton } from "./OptionButton";

interface QuestionCardProps{
    question: Question
    selectedAnswer: string
    onSelect: (option: string)=> void

}
export function QuestionCard({ question, selectedAnswer, onSelect }: QuestionCardProps) {
  return (
    <section aria-label="Question card">
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
        Question
      </p>
      <h2 className="text-xl font-semibold text-slate-800 leading-snug mb-8">
        {question.question}
      </h2>
      <div className="flex flex-col gap-3" role="radiogroup">
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