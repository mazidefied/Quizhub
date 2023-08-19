import React, { useEffect, useRef, useState } from 'react'
import { BsCalculatorFill } from 'react-icons/bs'
import { FaArrowLeft, FaChevronDown, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import QuizQuestionX from '../components/QuizQuestionX'

const Summary = (props) => {
    const [pageInfo, setPageInfo] = useState({
        grade: 100,
        gradeString: "A",
        gradeStringLevel: "plus",
        correctAnswers: 20,
        wrongAnswers: 0,
        nullAnswers: 0,
        quizName: "...",
        quizSlug: "weird-questions-2023",
        questions: []
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
                        questions: [...quizResults],
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

    const swiperNextAll = document.querySelectorAll(".swiper-button-next")
  const swiperPrevAll = document.querySelectorAll(".swiper-button-prev")

  function nextQuestion(){
    swiperNextAll.forEach((button)=>{
      button.click()
    })
  }
  
  function prevQuestion(){
    swiperPrevAll.forEach((button)=>{
      button.click()
    })
  }

  const [showPaginationContent, setShowPaginationContent] = useState(false)

  function togglePaginationContent(value){
    setShowPaginationContent(value)
  }

  const swiperRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0); // Initialize with default active index

  useEffect(() => {
    const interval = setInterval(()=>{
      if (swiperRef.current) {
        const newActiveIndex = swiperRef.current.swiper.activeIndex;
        setActiveIndex(newActiveIndex);
      }
    }, 200)
    return () => clearInterval(interval);
  }, [swiperRef.current?.swiper.activeIndex]);

  const calculateProgress = () => {
    const totalQuestions = pageInfo?.questions?.length || 0;

    if (activeIndex >= 0 && totalQuestions > 0) {
      return `${activeIndex + 1}/${totalQuestions}`;
    }

    return '0/0';
  };


  return (
    <>
        {notFound === false && <div className="page summary quiz-big">
        <div className="content">
            <div className="quiz-started">
            <button className="back" onClick={()=>{
                navigate("/result", {replace: true})
            }}>
                <FaArrowLeft /> Back
            </button>
            <div className="heading.x">
                <h1 style={{width: "100%", textAlign: "center"}}>Summary</h1>
                <div className="bubble-holder">
                    <div className="bubble"></div>
                </div>
            </div>
            <div className="heading">
            <div className="quiz-name">
              <p>
                {pageInfo.quizName}
              </p>
              <div className={showPaginationContent ? "quiz-progress close-pagination" : "quiz-progress "} onClick={()=>{
                togglePaginationContent(!showPaginationContent)
              }}>
                <p>
                  {calculateProgress()}
                </p>
                <button onClick={(e)=>{
                  e.stopPropagation()
                  togglePaginationContent(false)
                }}  className="close"><FaTimes />
                </button>
                <button onClick={(e)=>{
                  e.stopPropagation()
                  togglePaginationContent(true)
                }}  className="open"><FaChevronDown />
                </button>
              </div>
            </div>

            <div className="calculator">
              <BsCalculatorFill />
            </div>
          </div>
            <div className={`questions-container ${showPaginationContent ? "show-pagination" : ""}`}>
            <Swiper
            ref={swiperRef}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
                {
                  pageInfo.questions && pageInfo.questions.map((question, index)=>{
                    return (<SwiperSlide key={index}>
                      <QuizQuestionX id={index} question={question} />
                    </SwiperSlide>)
                  })
                }
            </Swiper>
            <div className="actions">
              <div className="controls">
                <button className="prev" onClick={prevQuestion} id='prev'>
                  Back
                </button>
                <button className="next" onClick={nextQuestion} id='next'>
                  Next
                </button>
              </div>
            </div>
            </div>
            </div>

        </div>
    </div>}
    </>
  )
}

export default Summary