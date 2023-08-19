// import React, { useContext, useEffect, useRef, useState } from 'react'
import React, { useContext,  useEffect,  useRef, useState} from 'react'
import { FaArrowRight, FaChevronDown, FaTimes } from 'react-icons/fa'
import { BsCalculatorFill } from 'react-icons/bs'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import AppContext from '../quizContext/AppContext';
import QuizQuestion from '../components/QuizQuestion';
import { useParams } from 'react-router';
import { BiAlarmOff } from 'react-icons/bi';


const Quiz = () => {
  const appState = useContext(AppContext)
  const [quizData, setQuizData] = useState({
    imgUrl: "",
    quizSlug: "",
    quizName: "...",
    description: "....",
    timer: {
      minutes: 99,
      seconds: 99
    },
    quizType: "normal",
    quizTypeId: 0,
    questions: [],
    questionsX: [],
    rules: [],
    moreInfo: [],
  })
  const [showPagination, setShowPagination] = useState(false)

  const [showPaginationContent, setShowPaginationContent] = useState(false)

  function togglePaginationContent(value){
    setShowPaginationContent(value)
  }

  function answerQuestion(id, option){
    const questionsX = quizData.questions.filter((question, index)=>{
      return (id === index)
    })
    const answeredQuestion = questionsX.map((question)=>{
      return ({
        ...question,
        answerPicked: option,
      })
    })
    const filteredQuestions = quizData.questionsX.filter((question, index)=>{
      return id !== index
    })

    const newQuestionsX = [
      ...answeredQuestion,
      ...filteredQuestions,
    ]

    console.clear()
    
    setQuizData((prev)=>{
      return({
        ...prev,
        questionsX: newQuestionsX
      })
    })

    setQuizData((prev)=>{
      return({
        ...prev,
        questionsX: newQuestionsX
      })
    })
  }
  
  const params = useParams()
  
  const [isFetching, setIsFetching] = useState(true)
  
  useEffect(()=>{
    function shuffleArray(array) {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray.slice(0, 30)
    }

    const quizId = params.quizId
    const possibleQuizzes = appState.tests.filter((test)=>{
      return test.slug === quizId
    })
    if(possibleQuizzes.length > 0 && isFetching){
      if(possibleQuizzes.length > 10){
        setShowPagination(true)
      }
      const thisQuiz = possibleQuizzes[0]
      const shuffled = shuffleArray(thisQuiz.questions)
      const questionsXX = shuffled
      const questionsXXX = questionsXX.map((question, index)=>{
        return ({
          ...question,
          id: index,
        })
      })
      setQuizData((prev)=>{
        return ({
          ...prev,
          quizSlug: quizId,
          imgUrl: thisQuiz.imgUrl,
          quizName: thisQuiz.name,
          description: thisQuiz.description,
          questions: [
            ...questionsXX
          ],
          questionsX: [
            ...questionsXXX
          ],
          timer: {
            minutes: thisQuiz.timer.minutes,
            seconds: thisQuiz.timer.seconds
          },
        })
      })
      setIsFetching(false)
    }
  }, [params, appState.tests, isFetching])
  // const [answersState, setAnswersState] = useState({
    //   answers: [
  //   ],
  //   selectedAnswers: [

  //   ]
  // })

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
    const totalQuestions = quizData?.questions?.length || 0;

    if (activeIndex >= 0 && totalQuestions > 0) {
      return `${activeIndex + 1}/${totalQuestions}`;
    }

    return '0/0';
  };

  return (
    <div className={`page quiz-big ${appState.uiState.quizPage.startedQuiz ? 'started' : ''} ${appState.uiState.quizPage.timeUp ? 'time-up' : ''}`}>
      <div className="content">
        
        <div className="intro">
          <div className="welcome">
            <p>
              Welcome, <b>Guest</b>
            </p>
          </div>

          {quizData.imgUrl.length > 0 && <div className="quiz-image">
            <img src={quizData.imgUrl} alt="" />
          </div>}

          <div className="quiz-details">
            <h1>
              {quizData.quizName} <i>{quizData.questions.length} Questions</i>
            </h1>
            <p>
              ~ {quizData.description}
            </p>
          </div>
          
          <div className="rules">
            <h2>
              Rules
            </h2>
            <ul>
              <li>You have <b>{quizData.timer.minutes}</b> minutes{quizData.timer.seconds > 0 && <b>{`, ${quizData.timer.seconds} seconds `}</b>} to complete this quiz </li>
              {/* <li>Your calculator will be turned off 👍 </li> */}
            </ul>
          </div>

          {/* <div className="more-info">
            <h2>
              More info
            </h2>
            <ul>
              <li>Vote <span>Wole</span> for <b>SOC AGS</b> </li>
            </ul>
          </div> */}
          <div className="footer">
            {quizData.questions.length > 0 && <button onClick={()=>{
              appState.functions.startQuiz({minutes: quizData.timer.minutes, seconds: quizData.timer.seconds})
            }}>Start Quiz <FaArrowRight /> </button>}
          </div>


        </div>



        <div className={`quiz-started ${showPagination ? "handle-pagination" : ""}`}>
          <div className="heading">
            <div className="quiz-name">
              <p>
                {quizData.quizName}
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
              // direction={deviceWidth < 660 && 'vertical'}
              ref={swiperRef}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
                {
                  quizData.questions && quizData.questions.map((question, index)=>{
                    return (<SwiperSlide key={index}>
                      <QuizQuestion answerQuestion={answerQuestion} id={index} question={question} />
                    </SwiperSlide>)
                  })
                }
            </Swiper>
            <div className="actions">
              <div className="controls">
                {quizData.questions.length > 1 && <button className="prev" onClick={prevQuestion} id='prev'>
                  Back
                </button>}
                {(activeIndex + 1) < quizData.questions.length ? <button className="next" onClick={nextQuestion} id='next'>
                  Next
                </button> : <button className="next submit" onClick={()=>{
                  appState.functions.toggleLoader(true)
                  setTimeout(()=>{
                    appState.functions.submitTest(quizData)
                  },1500)
                }} id='submit'>
                  Submit
                </button>}
              </div>
            </div>
            <div className="spacer"></div>
          </div>
        </div>

        <div className="time-up-page">
          <h2>Time up!!</h2>
          <div className="container">
            <div className="animated-clock">
              <BiAlarmOff />
              <div className="slash"></div>
            </div>
          </div>
          <div className="footer">
            <button onClick={()=>{
                  appState.functions.toggleLoader(true)
                  setTimeout(()=>{
                    appState.functions.submitTest(quizData)
                  },1500)
                }}>
              Check Result
            </button>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Quiz