import React from 'react'
import { Link } from 'react-router-dom'
import AnimatedText from '../components/AniatedText'
import {HiSparkles} from 'react-icons/hi'

const Home = () => {
  return (
    <div className='page home'>
      <div className="content">
        <section className="first">
          <div className="img-container">
            <img width={400} src="./header-hero.jpg" alt="yeah" />
          </div>
          <div className="text-container">
            <h1 style={{marginBottom: "15px"}}>
              Quiz Hub
            </h1>
            <AnimatedText />
          </div>
        </section>
        <div className="cta">
          <Link to={'/quizzes'} className='goto'>
            <p>
              Take a Quiz
            </p>
            <HiSparkles />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home