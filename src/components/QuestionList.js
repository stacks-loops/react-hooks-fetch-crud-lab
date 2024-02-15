import React, {useEffect, useState } from "react";
import QuestionItem from "./QuestionItem"


function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((resp) => resp.json())
    .then((questionData) => setQuestions(questionData))
  }, [])

  function deleteQ(id) {
    
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE", 
        })
    .then((resp) => resp.json())
    .then(() => {
      const newList = questions.filter((question) => question.id !== id)
      setQuestions(newList)
        })
     }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
       <QuestionItem   key={question.id} question={question}  onDeleteQuestion={deleteQ} 
       />
       ))}
      </ul>
    </section>
  )
}

// const QuestionItem = ( { question } ) => {
//   const { id, prompt, answers, correctIndex } = question

//     return (
//       <li> 
//     <h3>{prompt}</h3>
//     <ul>
//       {answers.map((answer, index) => (
//         <li key={index} className={index === correctIndex ? "correct" : ""}>
//           {answer}
//       </li>
//       ))}
//     </ul>
//     </li>
//     )}


export default QuestionList;
