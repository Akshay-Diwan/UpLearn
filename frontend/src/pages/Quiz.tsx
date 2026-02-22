import { useState } from "react";
import { QuizContainer } from "../components/Quiz/QuizContainer";
import {QuizSection} from "../components/Quiz/QuizSection";
import type { Question } from "../types/interface";


const QUESTIONS = [
  {
    id: 1,
    question: "If x + 1/x = 3, find x³ + 1/x³",
    options: ["9", "18", "21", "27"],
    correctAnswer: "18",
  },
  {
    id: 2,
    question: "The HCF of two numbers is 12 and their LCM is 360. If one number is 60, the other number is:",
    options: ["48", "6", "90", "72"],
    correctAnswer: "72",
  },
  {
    id: 3,
    question: "If √(5 + 2√6) = √a + √b, then a + b =",
    options: ["5", "6", "7", "8"],
    correctAnswer: "5",
  },
  {
    id: 4,
    question: "Find the next term in the sequence: 3, 9, 27, 81, 243, ?",
    options: ["486", "729", "972", "6561"],
    correctAnswer: "729",
  },
  {
    id: 5,
    question: "Find the next term in the sequence: AZ, BY, CX, DW, ?",
    options: ["EV", "FU", "DU", "EW"],
    correctAnswer: "EV",
  },
  {
    id: 6,
    question: "If 2^x = 8^(x-1), find x",
    options: ["2", "3", "4", "1"],
    correctAnswer: "3",
  },
   {
     id: 7,
     type: "Instruction",
     canReview: false,
     question: `
     In a small town where every street seemed to know its own history, a library stood untouched by time. While the world outside measured progress in speed and efficiency, the library valued patience. Students who entered expecting quick answers often left with better questions instead. The old librarian believed that information was abundant but understanding was rare. He would often rearrange books in ways that made no obvious sense, yet readers somehow discovered ideas they were not searching for. One day the electricity failed, and the digital catalog stopped working. Strangely, that was the busiest day the library had seen in years. People spoke to each other, recommended books, and explored unfamiliar sections. By evening, no new technology had arrived, yet the librarian claimed the library had become more modern than ever before.
     `,
     options: ["none"],
     correctAnswer: "none"
 },
 {
  id: 8,
  question: "Why does the librarian rearrange the books in unusual ways?",
  options: [
    "To confuse readers",
    "To encourage accidental discovery",
    "To save space",
    "To follow a catalog rule",
  ],
  correctAnswer: "To encourage accidental discovery",
},
{
  id: 9,
  question: "The library was “most modern” when:",
  options: [
    "new computers were installed",
    "more students visited for exams",
    "people interacted and explored manually",
    "the catalog was upgraded",
  ],
  correctAnswer: "people interacted and explored manually",
},
{
  id: 10,
  question: "Which statement is closest to the central idea?",
  options: [
    "Technology reduces knowledge",
    "Silence improves concentration",
    "Understanding grows through exploration and human interaction",
    "Libraries should avoid digital tools",
  ],
  correctAnswer: "Understanding grows through exploration and human interaction",
},
{
  id: 11,
  question: "The busiest day occurred because:",
  options: [
    "electricity attracted more people",
    "students had assignments",
    "digital dependence was removed",
    "new books arrived",
  ],
  correctAnswer: "digital dependence was removed",
},
{
  id: 12,
  question: "The phrase “left with better questions instead” implies:",
  options: [
    "they were dissatisfied",
    "their curiosity deepened",
    "the librarian refused to help",
    "the books were incomplete",
  ],
  correctAnswer: "their curiosity deepened",
},
  
  // {
  //   id: 4,
  //   question: "In JavaScript, which keyword declares a block-scoped variable?",
  //   options: ["var", "let", "const", "function"],
  //   correctAnswer: "let",
  // },
  // {
  //   id: 5,
  //   question: "What is the time complexity of binary search?",
  //   options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
  //   correctAnswer: "O(log n)",
  // },
  // {
  //   id: 6,
  //   question: "Which of the following is NOT a React hook?",
  //   options: ["useEffect", "useState", "useContext", "useDOM"],
  //   correctAnswer: "useDOM",
  // },
  // {
  //   id: 7,
  //   question: "What does SQL stand for?",
  //   options: [
  //     "Structured Query Language",
  //     "Simple Query Language",
  //     "Standard Query Logic",
  //     "Sequential Query Language",
  //   ],
  //   correctAnswer: "Structured Query Language",
  // },
  // {
  //   id: 8,
  //   question: "Which protocol is used to send emails?",
  //   options: ["FTP", "HTTP", "SMTP", "TCP"],
  //   correctAnswer: "SMTP",
  // },
  // {
  //   id: 9,
  //   question: "What is the output of `typeof null` in JavaScript?",
  //   options: ["null", "undefined", "object", "string"],
  //   correctAnswer: "object",
  // },
  // {
  //   id: 10,
  //   question: "Which sorting algorithm has an average time complexity of O(n log n)?",
  //   options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
  //   correctAnswer: "Merge Sort",
  // },
];
const QUESTIONS2: Question[] = [
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


export default function Quiz() {
const [section, setSection] = useState<number>(1);

  return (
    <QuizContainer title="Quick Quiz">

        <QuizSection key={section} section = {section} setSection = {setSection} totalSections={1} QUESTIONS={QUESTIONS}/>

    </QuizContainer>
  );
}