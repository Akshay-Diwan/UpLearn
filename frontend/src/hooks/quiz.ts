import { useState, useCallback } from "react";
import type { Question } from "../types/interface";
// const QUESTIONS = [
//   { id:1, question:"Which data structure follows the Last-In-First-Out (LIFO) principle?", options:["Queue","Stack","Linked List","Tree"], correctAnswer:"Stack" },
//   { id:2, question:"What does CSS stand for?", options:["Computer Style Sheets","Creative Style Sheets","Cascading Style Sheets","Colorful Style Sheets"], correctAnswer:"Cascading Style Sheets" },
//   { id:3, question:"Which HTTP method is used to update an existing resource?", options:["GET","POST","PUT","DELETE"], correctAnswer:"PUT" },
//   { id:4, question:"In JavaScript, which keyword declares a block-scoped variable?", options:["var","let","const","function"], correctAnswer:"let" },
//   { id:5, question:"What is the time complexity of binary search?", options:["O(n)","O(n²)","O(log n)","O(1)"], correctAnswer:"O(log n)" },
//   { id:6, question:"Which of the following is NOT a React hook?", options:["useEffect","useState","useContext","useDOM"], correctAnswer:"useDOM" },
//   { id:7, question:"What does SQL stand for?", options:["Structured Query Language","Simple Query Language","Standard Query Logic","Sequential Query Language"], correctAnswer:"Structured Query Language" },
//   { id:8, question:"Which protocol is used to send emails?", options:["FTP","HTTP","SMTP","TCP"], correctAnswer:"SMTP" },
//   { id:9, question:"What is the output of `typeof null` in JavaScript?", options:["null","undefined","object","string"], correctAnswer:"object" },
//   { id:10, question:"Which sorting algorithm has an average time complexity of O(n log n)?", options:["Bubble Sort","Insertion Sort","Merge Sort","Selection Sort"], correctAnswer:"Merge Sort" },
// ];
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

  const selectAnswer = useCallback((opt: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: opt }));
  }, [currentQuestion.id, submitted]);

  const goNext  = useCallback(() => { if (!isLast)  setCurrentIndex(i => i+1); }, [isLast]);
  const goPrev  = useCallback(() => { if (!isFirst) setCurrentIndex(i => i-1); }, [isFirst]);
  const submit  = useCallback(() => setSubmitted(true), []);
  const restart = useCallback(() => { setCurrentIndex(0); setAnswers([]); setSubmitted(false); }, []);

  return { currentIndex, currentQuestion, selectedAnswer, answers, isFirst, isLast, submitted, total, score, accuracy, selectAnswer, goNext, goPrev, submit, restart };
}