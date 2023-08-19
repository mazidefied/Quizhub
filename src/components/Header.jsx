import React, { useContext } from 'react'
import { NavLink, useLocation, useNavigate} from 'react-router-dom'
import {IoMdAlarm} from "react-icons/io"
import AppContext from '../quizContext/AppContext'
import logoOne from "../assets/logo512.png"
import logoTwo from "../assets/logo512-black.png"

const Header = () => {
    const appState = useContext(AppContext)
    const uiState = appState.uiState
    const timeLeft = uiState.notification.timer.timeLeft
    const formatTime = (value) => {
        return value.toString().padStart(2, '0');
    };
      
    const formattedMinutes = formatTime(timeLeft.minutes);
    const formattedSeconds = formatTime(timeLeft.seconds);

    const navigate = useNavigate()

    const location = useLocation()

    return (
    <nav className='header'>
        <div className={`notification-bar ${uiState.notification.state} ${timeLeft.minutes < 5 ? "late" : "start"}`}>
            <div className="nil">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
            <div className="time">
                <IoMdAlarm /> {formattedMinutes}:{formattedSeconds}
            </div>
            <div className="savinger">
                Saving <div className="loader"><div className="loader-circle"></div></div>
            </div>
            <div className="errorer">
                Error!! 
            </div>
        </div>
        <div className="content">
            <div className="logo" onClick={()=>{
                navigate("/")
            }}>
                <img src={logoOne} alt="thunder" />
                <img src={logoTwo} alt="thunder" />
                <p>
                    Quiz <br />Hub
                </p>
            </div>
            

            <div className="links-holder">
                <NavLink to={"/"} className={"goto"}>
                    Home
                </NavLink>
                <NavLink to={"/quizzes"} className={"goto"}>
                    Quizzes
                </NavLink>
                {/* <NavLink to={"/about"} className={"goto"}>
                    About
                </NavLink> */}
            </div>

            <div className="last-section">
                <div className="menu" onClick={()=>{
                    appState.functions.toggleMenu(true)
                }}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <div className="menu x" onClick={()=>{
                    appState.functions.toggleMenu(true)
                }}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <button style={location.pathname.includes("/result") ? {opacity: "0", pointerEvents: "none"} : {width: "fit-content"}} className='to-share' onClick={()=>{
                    appState.functions.sharePage()
                }}>
                    Share
                </button>
            </div>
        </div>
    </nav>
  )
}

export default Header