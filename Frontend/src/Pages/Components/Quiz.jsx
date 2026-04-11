import React, { useState } from "react";
import { CodeEditor } from '../CodeEditor';
import { useNavigate } from "react-router-dom"; 
import './Quiz.css';
import axios from "axios";

export function Quiz(props) {
    const navigate = useNavigate();

    const lessonQuestions = props.lessonQuestions;
    const codingExercises = props.lessonCodingExercises;

    const [index, setIndex] = useState(0);
    const [lock, setLock] = useState(false);
    const [selected, setSelected] = useState(null);
    const [mode, setMode] = useState("quiz");
    const question = lessonQuestions[index];

    const [indexCoding, setIndexCoding] = useState(0);
    const [codingExerciseResult, setCodingExerciseResult] = useState(null);
    const codingExercise = codingExercises[indexCoding];

    const [points, setPoints] = useState(0);
    const [hasTried, setHasTried] = useState(false);
    const number = lessonQuestions.length + codingExercises.length;

    const email = localStorage.getItem("email");
    /* console.log("EMAIL", email); */
    const [progress, setProgress] = useState(1);

    /* const [apiResponseResult, setApiResponseResult] = useState(null); */
    const [userCode, setUserCode] = useState("");
    const checkAns = (qo) => {
        if (!lock) {
            setSelected(qo.id);
            setLock(true);
        }

        if (qo.is_correct) setPoints(points + 1);
    };

    const nextQuestion = () => {
        if (index < lessonQuestions.length -1) {
            setIndex(index+1);
            setLock(false);
            setSelected(null);
            setProgress(prev => prev + 1);
        } else {
            setMode("coding");
            setProgress(prev => prev + 1);
        }
    }


    const checkAnsCoding = (result) => {
            console.log("az eredmény: ", result);
            const isCorrect = result === true || result.toLowerCase() === "true";
            setCodingExerciseResult(isCorrect);

            if (!hasTried) {
                if (isCorrect) {
                    setPoints(prev => prev + 1);
                }
                setHasTried(true);
            }
        };
        

    const nextCoding = () => {
        if (indexCoding < codingExercises.length -1) {
            setIndexCoding(indexCoding+1);
            setCodingExerciseResult(null);
            setHasTried(false);
            setProgress(prev => prev + 1);

        } else {
            setMode("result");
        }
    }

    async function sendScoreToBackEnd() {
        // Fetch the lesson data based on the provided lessonId
        try {
            const res = await axios.post(
                "http://localhost:5000/api/progresses/progress",
                {
                    lessonId: props.lessonId,
                    score: points/number*100,
                    email: email
                }
            );
            console.log("api response: ", res.data);
            navigate("/home");
        } catch (err) {
            console.log("Error: ", err.response?.data);
        }
    }

    async function CodingExerciseCorrection() {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/fix-codes/fix-code",
                {
                    "description": codingExercise.description,
                    "code": userCode
                }
            )
            console.log("coding exercise correction api response: ", res.data);
            console.log("coding exercise correction api RESULT response: ", res.data.response);
            checkAnsCoding(res.data.response);
        } catch (err) {
            console.log("Error: ", err.response?.data);
            console.log("FULL ERROR:", err);
            console.log("RESPONSE:", err.response);
            console.log("REQUEST:", err.request);
        }
        
        }

    return (
        <>
            {mode==="quiz" && (
                <div className="container">

                    <div className="progress-bar-container">
                        <progress className="progress-bar" max={number} value={progress} />
                    </div>
                
                <h2 id={question.id}>
                    {question.text}
                </h2>
                <ul>
                    {question.options.map(qo => {
                        let className = "";
                        if (lock) {
                            if (qo.is_correct) {
                                className = "correct";
                            } else if (qo.id === selected) {
                                className = "wrong";
                            }
                        }
                        return (
                            <li 
                                key={qo.id}
                                className={className}
                                onClick={() => checkAns(qo)}
                            >
                                {qo.question_option_text}
                            </li>
                        );
                    })}
                </ul>


                    <div className="next-button-container">
                        <button className="next-button" disabled={!lock} onClick={(() => nextQuestion())}>
                            Next question
                            <img className="arrow-img"src="/images/component_icons/icons8-right-arrow-100.png" />
                        </button>
                    </div>
                

                
                </div>)}
            {mode==="coding" && (
                <div className="container">

                    <div className="progress-bar-container">
                        <progress className="progress-bar" max={number} value={progress} />
                    </div>

                    <h2 className="coding-exercise-title">{codingExercise.title}</h2>
                    <p className="coding-exercise-description">{codingExercise.description}</p>
                    <div className="coding-exercise-editor">
                        <CodeEditor 
                            key={codingExercise.id} 
                            starter_code={codingExercise.starter_code} 
                            description={codingExercise.description}
                            onCodeChange={setUserCode}
                            /* result={checkAnsCoding} */
                        />
                    </div>

                    <div className="code-editor-submit-next-buttons-container">
                        <button className="submit-button" onClick={CodingExerciseCorrection}>
                            Submit solution
                            <img className="submit-arrow" src="/images/component_icons/icons8-complete-100.png" />
                        </button>
                        <button className="next-button" disabled={codingExerciseResult === null} onClick={() => nextCoding()}>
                            Next question
                            <img className="arrow-img"src="/images/component_icons/icons8-right-arrow-100.png" />
                        </button>
                    </div>              
                    

                    {codingExerciseResult !== null && (
                        <div className={codingExerciseResult ? "correct-solution" : "wrong-solution"}>
                            <p>{codingExerciseResult ? "Correct solution" : "Incorrect solution"}</p>
                        </div>
                    )}
                </div>
            )}


            {mode==="result" && (
                <div className="container-2">
                    <div className="result-container">
                        <div className="result-div">
                            <img className="result-image" src="/images/component_icons/icons8-trophy-96.png" />
                            <p className="result-percent">{points === 0 ? "0%" : points/number*100+"%"}</p>
                            <p className="result-points">{points} out of {number}</p>
                            {points/number*100 <= 50 && (
                            <p className="result-text-50">Don't worry, you'll get it better next time!</p>
                            )}
                            {points/number*100 > 50 && points/number*100 < 80 && (
                                <p className="result-text-80">Good job!</p>
                            )}
                            {points/number*100 >= 80 && points/number*100 < 100 && (
                                <p className="result-text-99">Great work!</p>
                            )}
                            {points/number*100 === 100 && (
                                <p className="result-text-100">No mistake! Congratulations</p>
                            )}     

                        <button className="back-to-the-home-page-button" onClick={sendScoreToBackEnd}>
                            Back to Learning</button>
                        </div>
                    </div>
                </div>
                
            )}
        </>
        )
        
}