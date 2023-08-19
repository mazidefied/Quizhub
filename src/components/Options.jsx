import React, { useEffect, useState } from 'react'

const Options = ({option, handleAnswer, selectedOption}) => {
    const [optionState, setOptionState] = useState(false)
    useEffect(()=>{
        if(selectedOption !== option){
            setOptionState(false)
        }
        else{
            setOptionState(true)
        }
    }, [selectedOption, optionState, option])
  return (
    <div key={option} className={`${optionState ? "option selected" : "option"}`} onClick={()=>{
        handleAnswer(option)
    }}>
        <div className="select"></div>
        <p>{option}</p>
    </div>
  )
}

export default Options