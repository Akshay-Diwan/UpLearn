 import { Link } from "react-router-dom";
import type { Question } from "../../../types/interface";
 import { ResultRow } from "./ResultRow";
import type React from "react";
import type { SetStateAction } from "react";

 export function QuizResult({ score, totalQuestions, accuracy, answers, questions, timeSpent,section, setSection, totalSections }: {
     timeSpent: Record<number, number>, score: number, totalQuestions: number, accuracy: number, answers: string[], questions: Question[], section: number, setSection: React.Dispatch<SetStateAction<number>>, totalSections: number
 }) {
  console.log(timeSpent)
   const grade =
     accuracy >= 90 ? { label: "Excellent!", color: "text-emerald-500" } :
     accuracy >= 70 ? { label: "Good Job!", color: "text-blue-500" } :
     accuracy >= 50 ? { label: "Not Bad!", color: "text-amber-500" } :
                      { label: "Keep Practicing", color: "text-red-400" };
  return (
    <div className="animate-in fade-in duration-500">
      {/* Score Hero */}
      <div className="text-center mb-10 pb-8 border-b border-slate-100">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-50 mb-4">
          <span className="text-3xl font-bold text-blue-500">{score}</span>
        </div>
        <p className="text-slate-400 text-sm mb-1">out of {totalQuestions} correct</p>
        <p className={`text-2xl font-bold mb-1 ${grade.color}`}>{grade.label}</p>
        <p className="text-slate-500 text-sm">You scored <strong className="text-slate-700">{accuracy}%</strong> accuracy</p>

         {/* Stat pills */}
         <div className="flex items-center justify-center gap-3 mt-5">
           <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-700">
             ✓ {score} Correct
           </span>
           <span className="px-3 py-1.5 bg-red-50 border border-red-200 rounded-full text-xs font-semibold text-red-600">
             ✗ {totalQuestions - score} Wrong
           </span>
         </div>
       </div>
      
       {/* Answer Review */}
       <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-4">
         Review Answers
       </h3>
       <div className="flex flex-col gap-3 mb-8">
         {questions.map((q, i) => (
            q.type?
            <></>:
           <ResultRow
             key={q.id}
             question={q}
             timeSpent={timeSpent[q.id]}
             userAnswer={answers[q.id]}
             index={i}
           />
         ))}
       </div>

      {/* Restart */}
       {/* <button
         onClick={onRestart}
        className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md"
      >
         Retake Quiz
       </button> */}
         {
          section != totalSections?
        <button 
         onClick={() => setSection(prev => prev + 1)}
         className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md">
            Move to Next Section
         </button>
          :
          <Link to={'/result'}>
          <button
         className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            See Analysis
          </button>
          </Link>
         }


     </div>
   );
 }

