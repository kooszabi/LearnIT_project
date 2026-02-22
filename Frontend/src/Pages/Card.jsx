import { useState, useEffect } from 'react'
import axios from 'axios';
import './Card.css';
import { useNavigate } from 'react-router-dom';

export function Card(props) {
    const [lessonTitle, setLessonTitle] = useState(null);
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
            })
            .catch(err => {
                console.log("Error fetching card data: ", err.response?.data);
            });
        }, [props.lessonId]);

    return (
        <>
            <div className="card-container">
                <h2>{ lessonTitle }</h2>
                <button onClick={() => navigate(`/lesson/${props.lessonId}`)}>Start</button>
            </div>
        </>
    )
}