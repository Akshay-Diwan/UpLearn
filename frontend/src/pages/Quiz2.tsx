import { ProgressBar } from "../components/ProgressBar";
import InstructionCard from "../components/Quiz/InstructionCard";
import { NavigationButtons } from "../components/Quiz/Navigation";
import { QuestionCard } from "../components/Quiz/QuestionCard";
import { QuizContainer } from "../components/Quiz/QuizContainer";
import {QuizResult} from "../components/Quiz/Result/QuizResult";
import { useQuiz } from "../hooks/quiz";
import type { Question } from "../types/interface";

const QUESTIONS: Question[] = [
 {
     id: 0,
     type: "Instruction",
     canReview: false,
     question: "This is a paragraph answer according to this.",
     options: ["none"],
     correctAnswer: "none"
 },
 {
    id: 1,
    question: "What is name of first computer?",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    correctAnswer: "Stack",
  },
  {
    id: 2,
    question: "what is x if x + 2 = 1?",
    options: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
    ],
    correctAnswer: "Cascading Style Sheets",
  },
  {
    id: 3,
    question: "Which HTTP method is used to update an existing resource?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correctAnswer: "PUT",
  },
]

export default function Quiz2() {
  const {
    currentIndex,
    currentQuestion,
    selectedAnswer,
    answers,
    isFirst,
    isLast,
    submitted,
    total,
    score,
    accuracy,
    selectAnswer,
    goNext,
    goPrev,
    submit,
    restart,
    timeSpent
  } = useQuiz  (QUESTIONS);

  return (
    <QuizContainer title="Quick Quiz">
      {submitted ? (
        <QuizResult
          score={score}
          total={total}
          accuracy={accuracy}
          answers={answers}
          questions={QUESTIONS}
          timeSpent = {timeSpent}
          onRestart={restart}
        />
      ) : (
        <>
          <ProgressBar current={currentIndex} total={total} />
          {
            currentQuestion.type ?
            <InstructionCard question = {currentQuestion}/>
            :
                      <QuestionCard
                        question={currentQuestion}
                        selectedAnswer={selectedAnswer}
                        onSelect={selectAnswer}
                        />
          }
          <NavigationButtons
            isFirst={isFirst}
            isLast={isLast}
            canProceed={true}
            onPrev={goPrev}
            onNext={goNext}
            onSubmit={submit}
          />
        </>
      )}
    </QuizContainer>
  );
}