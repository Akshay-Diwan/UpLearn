export interface Question{
    id: number
    type?: "Instruction" | "Question"
    canReview?: boolean
    question: string
    options: string[]
    correctAnswer: string
}
export type ClassOptions =    "1st"| "2nd"| "3rd"| "4th"| "5th"| "6th"|
  "7th"| "8th"| "9th"| "10th"| "11th"| "12th"

export interface StudentForm{
    name: string,
    age: number,
    class : ClassOptions

}