import './Statistics.css';
import { useEffect, useState } from 'react';
import api from "../api/axios";
import { LessonProgressCard } from './Components/LessonProgressCard';

export function Statistics() {
    // username
    const [username, setUsername] = useState(null);
    // overall statistics
    // lessons
    const [completedLessons, setCompletedLessons] = useState(0);
    const [allLessons, setAllLessons] = useState(0);
    const [remainingLessons, setRemainigLessons] = useState(0);
    const [overallProgress, setOverallProgress] = useState(0);
    // questions
    const [allQuestions,setAllQuestions] = useState(0);
    const [completedQuestions, setCompletedQuestions] = useState(0);
    const [questionProgress, setQuestionProgress] = useState(0);
    const [remainingQuestions,setRemainingQuestions] = useState(0);
    // coding exercises
    const [allCodingExercises,setAllCodingExercises] = useState(0);
    const [completedCodingExercises, setCompletedCodingExercises] = useState(0);
    const [codingExercisesProgress, setCodingExercisesProgress] = useState(0);
    const [remainingCodingExercises,setRemainingCodingExercises] = useState(0);
    //const []
    useEffect(() => {
        api.get(
            "http://localhost:5000/api/statistics/get-statistics"
        )
        .then(res => {
            console.log(res.data)
            setUsername(res.data.username)
            //overall progress
            setCompletedLessons(res.data.overall_statistics.completed_lessons)
            setAllLessons(res.data.overall_statistics.all_lessons)
            setRemainigLessons(res.data.overall_statistics.remaining_lessons)
            setOverallProgress(res.data.overall_statistics.overall_progress)
            //questions
            setCompletedQuestions(res.data.overall_statistics.completed_questions)
            setAllQuestions(res.data.overall_statistics.all_questions)
            setRemainingQuestions(res.data.overall_statistics.remaining_questions)
            setQuestionProgress(res.data.overall_statistics.question_progress)
            //coding exercises
            setCompletedCodingExercises(res.data.overall_statistics.completed_coding_exercises)
            setAllCodingExercises(res.data.overall_statistics.all_coding_exercises)
            setRemainingCodingExercises(res.data.overall_statistics.remaining_coding_exercises)
            setCodingExercisesProgress(res.data.overall_statistics.coding_exercise_progress)
        })
    }, [])

    return (
        <div className='statistics-container'>
            <h1>Welcome back, {username}</h1>
            <div className='overall_statistics'>
                
                <LessonProgressCard 
                    title="Lessons"
                    completedLessons={completedLessons}
                    allLessons={allLessons}
                    remainingLessons={remainingLessons}
                    progress={overallProgress}
                    image_url="/images/statistics/icons8-books-100 (1).png"
                />
                <LessonProgressCard 
                    title="Questions"
                    completedLessons={completedQuestions}
                    allLessons={allQuestions}
                    remainingLessons={remainingQuestions}
                    progress={questionProgress}
                    image_url="/images/statistics/icons8-puzzle-100.png"
                />
                <LessonProgressCard 
                    title="Coding Exercises"
                    completedLessons={completedCodingExercises}
                    allLessons={allCodingExercises}
                    remainingLessons={remainingCodingExercises}
                    progress={codingExercisesProgress}
                    image_url="/images/statistics/icons8-coding-100.png"
                />

            </div>
        </div>
    )
}