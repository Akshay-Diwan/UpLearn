import { useState, useCallback } from "react";
import type { Question } from "../types/interface";

export function useQuiz(questions: Question[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const total = questions.length;
  const currentQuestion = questions[currentIndex]; 
  const selectedAnswer  = answers[currentQuestion.id] ?? null;
  const isFirst = currentIndex === 0;
  const isLast  = currentIndex === total - 1;
  const score   = questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const accuracy = Math.round((score / total) * 100);
  const [startTime, setStartTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState<Record<number, number>>({});
  
  const recordTime = ()=> {
     const delta = Date.now() - startTime;
      setTimeSpent(prev => {
        const updated = {...prev};
        if(! updated[questions[currentIndex].id] ) updated[questions[currentIndex].id] = 0;
        updated[questions[currentIndex].id] += delta;
        return updated;
      })
      setStartTime(Date.now());
  }


  const selectAnswer = useCallback((opt: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: opt }));
  }, [currentQuestion.id, submitted]);

  const goNext  = useCallback(() => { 
    if (!isLast){
      console.log("Start : " + startTime);
      console.log("Now : " + Date.now());
      console.log("Current index : ", currentIndex)
      recordTime();
      setCurrentIndex(i => i+1);
    }
     }, [isLast, currentIndex, startTime]);
  
  const goPrev  = useCallback(() => { if (!isFirst){recordTime(); setCurrentIndex(i => i-1);} }, [isFirst, currentIndex, startTime]);
  const submit  = useCallback(() => { recordTime(); setSubmitted(true)}, [currentIndex, startTime]);
  const restart = useCallback(() => { setCurrentIndex(0); setAnswers([]); setSubmitted(false); setStartTime(Date.now()) }, []);
  
  return { currentIndex, currentQuestion, selectedAnswer, answers, isFirst, isLast, submitted, total, score, accuracy, selectAnswer, goNext, goPrev, submit, restart, timeSpent };
}