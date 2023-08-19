import React, { useEffect, useState } from 'react'
import { BsRocketFill } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router'

const Submit = (props) => {
    const [pageInfo, setPageInfo] = useState({
        grade: 100,
        gradeString: "A",
        gradeStringLevel: "plus",
        correctAnswers: 20,
        wrongAnswers: 0,
        nullAnswers: 0,
        quizName: "...",
        quizSlug: "weird-questions-2023"
    })
    
    const [notFound, setNotFound] = useState(true)
    const [isFetching, setIsFetching] = useState(true)

    useEffect(()=>{
        const quizResults = props.submittedData.answeredQuestions
        if(isFetching){
            if(quizResults.length > 0){
                setNotFound(false)
                setIsFetching(false)
                const totalQuestions = quizResults.length;
                let correctAnswers = 0;
                let nullAnswers = 0;
        
                quizResults.forEach(result => {
                if (result.answerPicked === result.correctAnswer) {
                    correctAnswers++;
                }
                if (result.answerPicked === "") {
                    nullAnswers++;
                }
                if (result.answerPicked === null) {
                    nullAnswers++;
                }
                });
        
                const grade = ((correctAnswers / totalQuestions) * 100).toFixed(0);
        
                const wrongAnswers = totalQuestions - (correctAnswers + nullAnswers);

                let gradeString
                let gradeStringType

                if(grade < 30){
                    gradeString = "F"
                    gradeStringType = "minus"
                } else if(grade < 40){
                    gradeString = "F"
                    gradeStringType = "plus"
                } else if(grade < 45){
                    gradeString = "D"
                    gradeStringType = "minus"
                } else if(grade < 50){
                    gradeString = "D"
                    gradeStringType = "plus"
                } else if(grade < 55){
                    gradeString = "C"
                    gradeStringType = "minus"
                } else if(grade < 65){
                    gradeString = "C"
                    gradeStringType = "plus"
                } else if(grade < 70){
                    gradeString = "B"
                    gradeStringType = "minus"
                } else if(grade < 80){
                    gradeString = "B"
                    gradeStringType = "plus"
                } else if(grade < 90){
                    gradeString = "A"
                    gradeStringType = "minus"
                } else if(grade < 101){
                    gradeString = "A"
                    gradeStringType = "plus"
                } else{
                    gradeString = "F"
                    gradeStringType = "minus"
                }
        
                setPageInfo((prev)=>{
                    return({
                        ...prev,
                        grade: grade,
                        correctAnswers: correctAnswers,
                        wrongAnswers: wrongAnswers,
                        nullAnswers: nullAnswers,
                        quizName: props.submittedData.quizName,
                        gradeString: gradeString,
                        quizSlug: props.submittedData.quizSlug,
                        gradeStringLevel: gradeStringType,
                    })
                })
            } else{
                setNotFound(true)
            }
        }

    },[props.submittedData, isFetching])

    const navigate = useNavigate()

  return (
    <div className='page result-big'>
        {notFound === false && <div className="content">
            <div className="heading">
                <h2>
                    {pageInfo.quizName}
                </h2>
            </div>
            <div className="score">
                <div className="holder">
                    <p>
                        {pageInfo.grade}%
                    </p>
                    <h2>
                        {pageInfo.gradeString} {pageInfo.gradeStringLevel==="plus" && <FaPlus />}
                    </h2>
                </div>
            </div>
            <div className="summary-container">
                <div className="item">
                    <p>Correct Answers </p> <div className="value">{pageInfo.correctAnswers}</div>
                </div>
                <div className="item">
                    <p>Wrong Answers </p> <div className="value">{pageInfo.wrongAnswers}</div>
                </div>
                {pageInfo.nullAnswers > 0 && <div className="item">
                    <p>Not Answered</p> <div className="value">{pageInfo.nullAnswers}</div>
                </div>}
                <button onClick={()=>{
                    navigate("summary")
                }} className="open-summary">Correction</button>
                <div className="actions">
                    <div className="controls">
                        <button onClick={()=>{
                            navigate("/quizzes")
                        }}>
                            More Quizzes <BsRocketFill />
                        </button>
                        <button onClick={()=>{
                            navigate(`/quiz/${pageInfo.quizSlug}`)
                        }}>
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        </div>}
    </div>
  )
}

export default Submit