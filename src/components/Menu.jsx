import React, { useContext } from 'react'
import { FaBolt, FaChevronDown, FaHome, FaPowerOff, FaQuestion, FaRetweet, FaShare } from 'react-icons/fa'
import AppContext from '../quizContext/AppContext'
import { BsCalculator, BsGearFill } from 'react-icons/bs'
import { NavLink, useLocation } from 'react-router-dom'

const Menu = () => {
    const appState = useContext(AppContext)
    const location = useLocation()
    function closeMenu(){
        appState.functions.toggleMenu(false)
    }
  return (
    <div className='menu-big'>
        <div className="content">
            {/* <h2>Menu</h2>
            <div className="bubble-holder">
                <div className="bubble"></div>
            </div> */}
            {(location.pathname.includes("quiz/")&& appState.uiState.quizPage.startedQuiz) ? <div className="container">
                <button onClick={()=>{
                    window.location.reload()
                    closeMenu()
                }}><FaRetweet /> <p>Restart</p></button>
                <NavLink to={"/quizzes"} onClick={closeMenu}><FaPowerOff /> <p>Quit</p></NavLink>
                <button onClick={()=>{
                    appState.functions.sharePage()
                    closeMenu()
                }}><FaShare /> <p>Share</p></button>
                <button onClick={closeMenu} className='disabled'><BsCalculator /> <p>Calculator</p></button>
            </div> : <div className="container">
                <NavLink onClick={closeMenu} to={"/"}><FaHome /> <p>Home</p></NavLink>
                <NavLink onClick={closeMenu} to={"/quizzes"}><FaQuestion /> <p>Quizzes</p></NavLink>
                <button onClick={()=>{
                    closeMenu()
                    appState.functions.sharePage()
                }} className={location.pathname.includes("/result")?"disabled":""}><FaShare /> <p>Share</p></button>
                <NavLink onClick={closeMenu} className='disabled' to={"/settings"}><BsGearFill /> <p>Settings</p></NavLink>
            </div>}
            
        </div>
        <div className="footer">
            <a href="https://wa.me/+2347035658853" target='_blank' rel='noreferrer'><div className="code"><FaBolt /></div> Ignition Labz.ng</a>
        </div>
        <div className="close" onClick={()=>{
                    appState.functions.toggleMenu(false)
                }}>
            <FaChevronDown />
        </div>
    </div>
  )
}

export default Menu