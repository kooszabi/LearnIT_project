import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
/* import { CodeEditor } from './CodeEditor'; */
import { Quiz } from './Components/Quiz';
import { LessonMaterial } from './Components/LessonMaterial';
import './Lesson.css';

export function Lesson() {
    const lessonId = useParams().lessonId;
    const [lessonTitle, setLessonTitle] = useState(null);
    const [lessonMaterial, setLessonMaterial] = useState(null);
    const [lessonQuestions, setLessonQuestions] = useState(null);
    const [lessonCodingExercises, setLessonCodingExercises] = useState(null);

    // console.log("lessonId from params:", lessonId, typeof lessonId);

    useEffect(() => {
        // Fetch the lesson data based on the provided lessonId
        axios.get(
            `http://localhost:5000/api/lessons/${lessonId}`
        )
        .then(res => {
            // console.log("api/lessons response: ", res.data);
            setLessonTitle(res.data.content.title);
            setLessonMaterial(res.data.content);
            console.log("Lesson title: ", res.data.content.title);
            console.log("Lesson content: ", res.data.content);
        })
        .catch(err => {
            console.log("Error fetching lesson data: ", err.response?.data);
        })
    }, [lessonId]);

    useEffect(() => {
        axios.post(
            "http://localhost:5000/api/questions/question",
            {
                lesson_id: lessonId
            }
        )
        .then(res => {
            setLessonQuestions(res.data.questions);
            console.log('setLessonQuestions: ', res.data.questions);
        })
        .catch(err => {
            console.log("Error fetching questions data: ", err.response?.data);
        })
    }, [lessonId]);

    useEffect(() => {
        axios.post(
            "http://localhost:5000/api/coding-exercises/coding-exercise",
            {
                lesson_id: lessonId
            }
        )
        .then(res => {
            setLessonCodingExercises(res.data.coding_exercises);
            console.log('setLessonCodingExercises: ', res.data.coding_exercises);
        })
        .catch(err => {
            console.log("Error fetching coding exercises data: ", err.response?.data);
        })
    }, [lessonId]);


    if (!lessonMaterial) return <p>Loading the lesson...</p>;
    if (!lessonQuestions) return <p>Loading the questions...</p>;
    if (!lessonCodingExercises) return <p>Loading the coding exercises...</p>

    return (
        <>
            <div className='lesson-container'>
                <div className='lesson-material'>
                    <LessonMaterial 
                                lessonTitle={lessonTitle}
                                lessonMaterial={lessonMaterial} />
                </div>


                <div className='exercises-container'>
                    <Quiz 
                        lessonQuestions={lessonQuestions}
                        lessonCodingExercises={lessonCodingExercises}
                        lessonId={lessonId}
                    />

                </div>
            </div>
            

            
        </>
    )
}