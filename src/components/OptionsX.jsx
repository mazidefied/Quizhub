import React, { useEffect, useState } from 'react'

const OptionsX = ({option, correctAnswer, selectedAnswer}) => {
    const [optionState, setOptionState] = useState(false)
    const [wrongAnswer, setWrongAnswer] = useState(false)
    const [nullAnswer, setNullAnswer] = useState(false)
    useEffect(()=>{
        if(correctAnswer === option){
            setOptionState(true)
        }
        else if(selectedAnswer === option){
            setWrongAnswer(true)
        }
        else if(selectedAnswer === ""){
            setNullAnswer(true)
        }
    }, [correctAnswer, optionState, option, selectedAnswer])
  return (
    <div key={option} className={`x ${optionState ? "option correct" : "option"} ${wrongAnswer ? "option wrong" : "option"} ${nullAnswer ? "option null" : "option"}`}>
        <div className="select"></div>
        <p>{option}</p>
    </div>
  )
}

export default OptionsX