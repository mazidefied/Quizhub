import React, { useContext, useEffect, useState } from 'react'
import { HiSparkles } from 'react-icons/hi'
import { FaAppStore, FaArrowRight } from 'react-icons/fa'
import AppContext from '../quizContext/AppContext'
import { Link } from 'react-router-dom'

const Quizzes = () => {
  const appState = useContext(AppContext)
  const [quizzesData, setQuizzesData] = useState({
    collections: [],
    quizzes: [],
  })

  useEffect(()=>{
    const tests = appState.tests
    setQuizzesData((prev)=>{
      return ({
      ...prev,
      quizzes: [...tests]
    })})
  },[appState.tests])

  return (
    <div className='page quizzes'>
      <div className="content">
        
        <section style={{display: "none"}}>
          <div className="heading">
            <h1>
              Collections <FaAppStore />
            </h1>
            <p>
              Browse our Collections of Quizzes
            </p>
          </div>
          <div className="collection-container">
            <div className="collection">
              <div className="details">
              <h2>
              100 Level Quizzes 
              </h2>
              <Link to={"quizzes/collection/100level-quizzes"}>
              </Link>
              </div>
            </div>
            <div className="collection">
              <div className="details">
              <h2>
              200 Level Quizzes 
              </h2>
              <Link to={"quizzes/collection/200level-quizzes"}>
              </Link>
              </div>
            </div>
            <div className="collection">
              <div className="details">
              <h2>
              Miscellaneous Quizzes 
              </h2>
              <Link to={"quizzes/collection/miscellanous-quizzes"}>
              </Link>
              </div>
            </div>
            <div className="collection">
              <div className="details">
              <h2>
              Others 
              </h2>
              <Link to={"quizzes/collection/others"}>
              </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <div className="heading">
            <h1>
              Quizzes <HiSparkles />
            </h1>
            {/* <p>
              A catalogue of our latest Quizzes from top creators
            </p> */}
          </div>
          <div className="quiz-container">
            {quizzesData.quizzes.map((test)=>{
              return (
                <div className="quiz" key={test.id}>
                  {test.imgUrl?.length > 0 && <img src={test.imgUrl} alt="quiz-img" style={{background: "#666", color: "#0000"}} />}
                  <Link className="goto" to={`/quiz/${test.slug}`}>
                    <FaArrowRight />
                  </Link>
                  <div className="details">
                    <h2>
                      {test.name}
                    </h2>
                    <p>
                      ~ {test.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Quizzes