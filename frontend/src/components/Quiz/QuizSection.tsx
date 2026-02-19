import type { SetStateAction } from 'react';
import { useQuiz } from '../../hooks/quiz';
import type { Question } from '../../types/interface';
import { ProgressBar } from "../ProgressBar";
import { NavigationButtons } from "./Navigation";
import { QuestionCard } from "./QuestionCard";
import {QuizResult} from "./Result/QuizResult";
import InstructionCard from './InstructionCard';

export const QuizSection = ({QUESTIONS, section, setSection, totalSections}: {QUESTIONS: Question[], section: number, setSection: React.Dispatch<SetStateAction<number>>, totalSections: number}) => {
      const {
    currentIndex,
    currentQuestion,
    selectedAnswer,
    answers,
    isFirst,
    isLast,
    submitted,
    total,
    numberOfQuestions,
    score,
    accuracy,
    selectAnswer,
    goNext,
    goPrev,
    submit,
    timeSpent
  } = useQuiz (QUESTIONS);
  return (
    <>
         {submitted ? (
        <QuizResult
          score={score}
          totalQuestions={numberOfQuestions}
          accuracy={accuracy}
          answers={answers}
          questions={QUESTIONS}
          timeSpent = {timeSpent}
          // onRestart={restart}
          section={section}
          setSection={setSection}
          totalSections={totalSections}
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
    </>
  )
}
