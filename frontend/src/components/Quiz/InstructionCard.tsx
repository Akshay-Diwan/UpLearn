import React from 'react'
import type { Question } from '../../types/interface'

const InstructionCard = ({ question }: {question: Question}) => {
  return (
        <section aria-label="Question card">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
            Question
          </p>
          <h2 className="text-xl font-semibold text-slate-800 leading-snug mb-8">
            {question.question}
          </h2>
        </section>
  )
}

export default InstructionCard
