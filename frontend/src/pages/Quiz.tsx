import { useState } from "react";
import { QuizContainer } from "../components/Quiz/QuizContainer";
import {QuizSection} from "../components/Quiz/QuizSection";
import type { Question } from "../types/interface";


const QUESTIONS = [
  {
    id: 1,
    question: `
    Let 𝑓(𝑥)={ln⁡(1+𝑥)𝑥,	𝑥≠0𝑘,	𝑥=0f(x)=⎩⎨⎧	​xln(1+x)	​,k,	​x=0x=0	​

Find the value of 
𝑘
k such that 
𝑓
(
𝑥
)
f(x) is continuous at 
𝑥
=
0
x=0.

With this value of 
𝑘
k, evaluate:

lim
⁡
𝑥
→
0
𝑓
(
𝑥
)
−
𝑓
(
0
)
𝑥
x→0
lim
	​

x
f(x)−f(0)
	​


Hence determine whether 
𝑓
(
𝑥
)
f(x) is differentiable at 
𝑥
=
0
x=0, and find 
𝑓
′
(
0
)
f
′
(0).`,
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
     type: "Instruction",
     canReview: false,
     question: "This is a paragraph answer according to this.",
     options: ["none"],
     correctAnswer: "none"
 },
 {
    id: 5,
    question: "What is name of first computer?",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    correctAnswer: "Stack",
  },
  {
    id: 6,
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
    id: 7,
    question: "Which HTTP method is used to update an existing resource?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correctAnswer: "PUT",
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