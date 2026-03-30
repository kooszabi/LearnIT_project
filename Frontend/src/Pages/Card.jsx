import { useState, useEffect } from 'react'
import axios from 'axios';
import './Card.css';
import { useNavigate } from 'react-router-dom';

export function Card(props) {
    const [lessonTitle, setLessonTitle] = useState(null);
    const [questionNumber, setQuestionNumber] = useState(null);
    const [codingExerciseNumber, setCodingExerciseNumber] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch the lesson data based on the provided lessonId
            axios.post(
                "http://localhost:5000/api/cards/card",
                {
                    lessonId: props.lessonId
                }
            )
            .then(res => {
                console.log("api/card/card response: ", res.data);
                setLessonTitle(res.data.lessonTitle);
                setQuestionNumber(res.data.questionNumber);
                setCodingExerciseNumber(res.data.codingExerciseNumber);
            })
            .catch(err => {
                console.log("Error fetching card data: ", err.response?.data);
            });
        }, [props.lessonId]);

    return (
        <>
            <div className="card-container">
                <div className="card-title-container">
                    <img className="card-title-image" src="/images/home_icons/icons8-python-96.png" />
                    <h3 className="card-title">{lessonTitle}</h3>
                </div>
                <div className="card-numbers-container">
                    <p className="card-numbers-paragraph">{questionNumber} Questions</p>
                    {/* <p className="card-numbers-paragraph">|</p> */}
                    <p className="card-numbers-paragraph">{codingExerciseNumber} Coding exercises</p>
                </div>
                <div className="card-progress-container">
                    <p className="card-progress-paragraph">Score</p>
                    <progress className="card-progress" max={100} value={76} />
                    <p className="card-progress-percent">76%</p>
                </div>
                <div className="card-button-container">
                    <p className="card-button-paragraph">
                        <img className="card-difficulty-image" src="/images/card_images/icons8-speed-96.png" />
                        Beginner
                    </p>
                    <button className="card-button" onClick={() => navigate(`/lesson/${props.lessonId}`)}>
                        <img className="card-button-image" src="/images/card_images/icons8-continue-96.png" />
                        Start lesson
                    </button>
                </div>
                
            </div>
        </>
    )
}