export interface Question{
    id: number
    type?: "Instruction" | "Question"
    canReview?: boolean
    question: string
    options: string[]
    correctAnswer: string
}