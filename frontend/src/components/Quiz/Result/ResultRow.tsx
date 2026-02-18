import type { Question } from "../../../types/interface";

export function ResultRow({ question, userAnswer, index }: {question: Question, userAnswer: string, index: number}) {
  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <div className={[
      "p-5 rounded-xl border",
      isCorrect ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50",
    ].join(" ")}>
      <div className="flex items-start gap-3">
        <span className={[
          "mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
          isCorrect ? "bg-emerald-500" : "bg-red-400",
        ].join(" ")}>
          {isCorrect ? (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-700 mb-1">
            Q{index + 1}. {question.question}
          </p>
          <p className={["text-sm", isCorrect ? "text-emerald-700" : "text-red-600"].join(" ")}>
            Your answer:{" "}
            <span className="font-medium">{userAnswer ?? <em className="font-normal">Not answered</em>}</span>
          </p>
          {!isCorrect && (
            <p className="text-sm text-emerald-700">
              Correct answer:{" "}
              <span className="font-medium">{question.correctAnswer}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}