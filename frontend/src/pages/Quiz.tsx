import { ProgressBar } from "../components/ProgressBar";
import { NavigationButtons } from "../components/Quiz/Navigation";
import { QuestionCard } from "../components/Quiz/QuestionCard";
import { QuizContainer } from "../components/Quiz/QuizContainer";
import QuizResult from "../components/Quiz/Result/QuizResult";
import { useQuiz } from "../hooks/quiz";

const QUESTIONS = [
  {
    id: 1,
    question: "Which data structure follows the Last-In-First-Out (LIFO) principle?",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    correctAnswer: "Stack",
  },
  {
    id: 2,
    question: "What does CSS stand for?",
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
  {
    id: 4,
    question: "In JavaScript, which keyword declares a block-scoped variable?",
    options: ["var", "let", "const", "function"],
    correctAnswer: "let",
  },
  {
    id: 5,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    correctAnswer: "O(log n)",
  },
  {
    id: 6,
    question: "Which of the following is NOT a React hook?",
    options: ["useEffect", "useState", "useContext", "useDOM"],
    correctAnswer: "useDOM",
  },
  {
    id: 7,
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Simple Query Language",
      "Standard Query Logic",
      "Sequential Query Language",
    ],
    correctAnswer: "Structured Query Language",
  },
  {
    id: 8,
    question: "Which protocol is used to send emails?",
    options: ["FTP", "HTTP", "SMTP", "TCP"],
    correctAnswer: "SMTP",
  },
  {
    id: 9,
    question: "What is the output of `typeof null` in JavaScript?",
    options: ["null", "undefined", "object", "string"],
    correctAnswer: "object",
  },
  {
    id: 10,
    question: "Which sorting algorithm has an average time complexity of O(n log n)?",
    options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
    correctAnswer: "Merge Sort",
  },
];

export default function Quiz() {
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
          onRestart={restart}
        />
      ) : (
        <>
          <ProgressBar current={currentIndex} total={total} />
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onSelect={selectAnswer}
          />
          <NavigationButtons
            isFirst={isFirst}
            isLast={isLast}
            canProceed={selectedAnswer !== null}
            onPrev={goPrev}
            onNext={goNext}
            onSubmit={submit}
          />
        </>
      )}
    </QuizContainer>
  );
}