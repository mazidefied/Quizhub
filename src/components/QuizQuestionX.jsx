import React from 'react'
import OptionsX from './OptionsX';

const QuizQuestionX = ({question, id,}) => {
    const options = question.options
    const optionsEl = options.map((option)=>{
        return(<OptionsX selectedAnswer={question.answerPicked} key={option} correctAnswer={question.correctAnswer} option={option} />)
    })
  return (
    <>
        <div className="question">
            <p>
                {question.name}
            </p>
        </div>
        <div className="options-holder">
            {optionsEl}
        </div>
    </>
  )
}

export default QuizQuestionX