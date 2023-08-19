import { useEffect, useReducer, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Quizzes from "./pages/Quizzes";
import AppContext from "./quizContext/AppContext";
import tests from "./secured-frontend/tests";
import Submit from "./pages/Submit";
import Summary from "./pages/Summary";

function App() {
  const initialState = {
    functions: {
      toggleMenu: (value)=>{
        dispatch({type: "toggle-menu", value: value})
      },
      startQuiz: (value)=>{
        dispatch({type: "start-quiz", value: value})
      },
      stopQuiz: ()=>{
        dispatch({type: "stop-quiz"})
      },
      submitTest: (value)=>{
        dispatch({type: "submit-test", value: value})
      },
      restartQuiz: ()=>{
        dispatch({type: "restart-quiz"})
      },
      toggleOptions: ()=>{
        dispatch({type: "toggle-options"})
      },
      toggleLoader: (value)=>{
        dispatch({type: "toggle-loader", value: value})
      },
      sharePage: ()=>{
        dispatch({type: "share-page"})
      },
    },
    preferences: {
      darkTheme: false,
      fontSize: 0,
      animations: true,
    },
    isLoggedIn: false,
    user: {
      name: "guest",
      department: ".....",
      faculty: ".......",
      school: "F.U.T.A",
      bio: "",
      isCreator: false,
    },
    creators: [],
    tests: [],
    uiState: {
      loader: {
        showMe: false,
      },

      device: {
        width: 1080
      },

      notification: {
        showMe: false,
        state: "null",
        timer: {
          timeLeft: {
            minutes: 20,
            seconds: 20
          },
          isCounting: false,
        }
      },

      quizPage: {
        showIntro: true,
        startedQuiz: false,
        showQuitMenu: false,
        showCalc: false,
        timeUp: false,
      },

      menu:{
        showMe: false,
      }
    }
  }

  const [submittedData, setSubmittedData] = useState({
    answeredQuestions: [],
    quizName: "",
    quizSlug: "",
  })

  const navigate = useNavigate()

  const updateAppState = (state, action)=>{
    switch (action.type){
      case ("fetch-tests"):
        const testsFromJson = tests
        return {
          ...state,
          tests: testsFromJson
        }

      case ("toggle-menu"):
        const menuValue = action.value
        return {
          ...state,
          uiState:{
            ...state.uiState,
            menu:{
              showMe: menuValue
            }
          }
        }

      case ("toggle-loader"):
        const loaderValue = action.value
        return {
          ...state,
          uiState:{
            ...state.uiState,
            loader:{
              showMe: loaderValue
            }
          }
        }

      case ("start-quiz"):
        const testTimerValue = action.value
        return {
          ...state,
          uiState:{
            ...state.uiState,
            quizPage: {
              ...state.uiState.quizPage,
              startedQuiz: true,
            } ,
            notification:{
              ...state.uiState.notification,
              state: "timer",
              timer: {
                isCounting: true,
                timeLeft: {
                  minutes: testTimerValue.minutes,
                  seconds: testTimerValue.seconds,
                },
              }
            }
          }
        }

      case ("update-timer"):
        const timerValue = action.value
        return {
          ...state,
          uiState:{
            ...state.uiState,
            notification:{
              ...state.uiState.notification,
              timer: {
                isCounting: true,
                timeLeft: {
                  minutes: timerValue.minutes,
                  seconds: timerValue.seconds,
                },
              }
            }
          }
        }

      case ("time-up"):
        return {
          ...state,
          uiState:{
            ...state.uiState,
            notification:{
              ...state.uiState.notification,
              timer: {
                ...state.uiState.notification.timer,
                isCounting: false,
              }
            },
            quizPage: {
              ...state.uiState.quizPage,
              timeUp: true,
            }
          },
        }
        
      case ("end-test"):
        return {
          ...state,
          uiState:{
            ...state.uiState,
            quizPage: {
              ...state.uiState.quizPage,
              startedQuiz: false,
            } ,
            notification:{
              ...state.uiState.notification,
              state: "null",
              timer: {
                ...state.uiState.notification.timer,
                isCounting: false,
              }
            }
          }
        }

      case ("new-quiz"):
        return {
          ...state,
          uiState:{
            ...state.uiState,
            quizPage: {
              ...state.uiState.quizPage,
              startedQuiz: false,
              timeUp: false,
            },
            notification:{
              ...state.uiState.notification,
              state: "null",
            }
          }
        }

      case ("submit-test"):
        const quizData = action.value
        setSubmittedData({
          quizName: quizData.quizName,
          answeredQuestions: quizData.questionsX,
          quizSlug: quizData.quizSlug
        })
        console.clear()
        navigate("/result")
        return {
          ...state,
          uiState:{
            ...state.uiState,
            loader:{
              showMe: false
            },
            quizPage: {
              ...state.uiState.quizPage,
              startedQuiz: false,
              showIntro: false,
              showQuitMenu: false,
              showCalc: false,
              timeUp: false,
            } ,
            notification:{
              ...state.uiState.notification,
              state: "null",
              timer: {
                ...state.uiState.notification.timer,
                isCounting: false,
              }
            }
          }
        }


      case ("device-width"):
        const deviceWidth = action.value
        return {
          ...state,
          uiState: {
            ...state.uiState,
            device: {
              ...state.uiState.device,
              width: deviceWidth
            }
          }
        }

      case ("share-page"):
        const pageUrl = window.location.href
        async function sharePageUrl(){
          if (navigator.share) {
            try {
                await navigator.share({
                    url: pageUrl
                  });
                console.log('Link shared successfully');
            } catch (error) {
                console.error('Error sharing link:', error);
            }
          } else {
            console.log('Web Share API is not supported in this browser.');
          }
        }

        sharePageUrl()

        return {
          ...state,
        }
      default:
        return state
    }
  }

  const location = useLocation()

  useEffect(()=>{
    dispatch({type: "fetch-tests"})
  },[])

  useEffect(()=>{
    if(location.pathname.includes("quiz/") === false){
      dispatch({type: "end-test"})
    }
  },[location.pathname])

  useEffect(() => {
    const handleResize = () => {
      dispatch({type: "device-width", value: window.innerWidth});
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this effect only runs once after the initial render

  const [appState, dispatch] = useReducer(updateAppState, initialState)

  useEffect(()=>{
    dispatch({type: "new-quiz"})
    if(location.pathname.includes("quiz/") === false){
      dispatch({type: "hide-menu", value: false})
    }
  },[location.pathname])
  
  useEffect(() => {
    let interval;
    
    if (appState.uiState.notification.timer.isCounting) {
      interval = setInterval(() => {
        const calculateNewTimerValue = () => {
          const currentMinutes = appState.uiState.notification.timer.timeLeft.minutes;
          const currentSeconds = appState.uiState.notification.timer.timeLeft.seconds;
          
          if (currentMinutes === 0 && currentSeconds === 0) {
            dispatch({type: "time-up"})
            return {
              minutes: 0,
              seconds: 0,
            };
          } else if (currentSeconds === 0) {
            return {
              minutes: currentMinutes - 1,
              seconds: 59,
            };
          } else {
            return {
              minutes: currentMinutes,
              seconds: currentSeconds - 1,
            };
          }
        };
        dispatch({ type: 'update-timer', value: calculateNewTimerValue() });
      }, 1000);
    }

    else{
      clearInterval(interval)
    }


    return () => {
      clearInterval(interval);
    };
  }, [appState.uiState.notification.timer]);

  // useEffect(()=>{
  //   if(submi)
  // },[location.pathname])


  return (
    <AppContext.Provider value={appState}>
      <div className={`App ${location.pathname.includes("quiz/")? "showing-quiz-page" : ""} ${appState.uiState.menu.showMe ? "show-menu" : ""} ${appState.uiState.loader.showMe ? "show-loader" : ""}`}>

        <Header />
        <Menu />
        <div className="backdrop" onClick={()=>{
                    appState.functions.toggleMenu(false)
                }}></div>

        <div className="loader">
          <div className="circle"></div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
          <Route path="/result" element={<Submit submittedData={submittedData} />} />
          <Route path="/result/summary" element={<Summary submittedData={submittedData} />} />
          <Route path="/*" element={<Error />} />
        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;
