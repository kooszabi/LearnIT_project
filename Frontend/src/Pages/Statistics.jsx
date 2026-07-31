import './Statistics.css';
import { useEffect, useState } from 'react';
import api from "../api/axios";
import { LessonProgressCard } from './Components/LessonProgressCard';
import { LessonProgressBar } from './Components/LessonProgressBar';

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
    // topics progress list
    const [topicProgressList, setTopicProgressList] = useState([]);
    // best topic result
    const [bestTopicResult, setBestTopicResult] = useState([]);
    // worst topic result
    const [worstTopicResult, setWorstTopicResult] = useState([]);

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
            // topics progress list for the progress bar
            setTopicProgressList(res.data.topics_progress_list)
            console.log("topics_progress_list", res.data.topics_progress_list)
            console.log("topics_progress_list_id", res.data.topics_progress_list[0].topic_id)
            // best topic result-
            setBestTopicResult(res.data.best_topic_result);
            console.log("Best topic result:", res.data.best_topic_result)>
            // worst topic result
            setWorstTopicResult(res.data.wort_topic_result);
            console.log("Worst topic result: ", res.data.wort_topic_result);
        })
    }, [])

    function averageBestWidth() {
        if (bestTopicResult.length === 0) {
            return 0
        }
        let sumOfTheScores = 0;
        bestTopicResult.map(score => {
            sumOfTheScores += score.topic_result;
        })
        return sumOfTheScores / bestTopicResult.length;
    }

    function averageWorstWidth() {
        if (worstTopicResult.length === 0) {
            return 0
        }
        let sumOfTheScores = 0;
        worstTopicResult.map(score => {
            sumOfTheScores += score.topic_result;
        })
        return sumOfTheScores / worstTopicResult.length;
    }

    if (!topicProgressList) return <p>Loading the statistics...</p>
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

            <div className='topic-specific-statistics-title-container'>
                <div className='topic-specific-statistics-hline' />
                <span className='topic-specific-statistics-title'>
                    Topics Progresses
                </span>
                <div className='topic-specific-statistics-hline' />
            </div>

            <div className='topic-specific-statistics'>

                {topicProgressList.map(topic => {
                    return (
                        <LessonProgressBar 
                            allTopicLesson={topic?.all_topic_lesson}
                            completedTopicLesson={topic?.completed_topic_lesson}
                            topicName={topic?.topic_name}
                            topicProgress={topic?.topic_progress}
                            topicId={topic?.topic_id}
                        />
                    )
                })}

            </div>

            <div className='best-and-worst-topics'>

                <div className='best-topic-container'>
                    
                    <div className='best-topic-information-container'>
                        <div className='best-topic-information-image-container'>
                            <div className='best-topic-image-div'>
                                <img className='best-topic-information-image' src='/images/statistics/icons8-trophy-100.png' />
                            </div>
                        </div>

                        <div className='best-topic-information-div'>
                            <div className='best-topic-sign-container'>
                                <img className='best-topic-sign-image' src='/images/statistics/icons8-up-right-100.png' />
                                <span className='best-topic-sign'>
                                    {bestTopicResult.length > 1 ? "BEST TOPICS" : "BEST TOPIC"}
                                </span>
                            </div>

                            <span className='best-topic-title'>
                                {bestTopicResult.length > 1 ? "Best Topics" : "Best Topic"}
                            </span>

                            {bestTopicResult.map(best => {
                                return (
                                    <span className='best-topic-name'>
                                        {best.topic_name}
                                    </span>
                                )
                            })}

                            {bestTopicResult.map(best => {
                                return (
                                    <span className='best-topic-result'>
                                        {best.topic_result}%
                                    </span>
                                )
                            })}

                        </div>

                    </div>

                    <div className='best-topic-progress-bar-container'>

                        <div className='best-topic-progress'>
                            <div className='best-topic-progress-fill' style={{width: `${averageBestWidth()}%`}} />
                        </div>

                    </div>

                </div>

                <div className='best-topic-container'>
                    
                    <div className='best-topic-information-container'>
                        <div className='best-topic-information-image-container'>
                            <div className='worst-topic-image-div'>
                                <img className='best-topic-information-image' src='/images/statistics/icons8-decrease-100.png' />
                            </div>
                        </div>

                        <div className='best-topic-information-div'>
                            <div className='worst-topic-sign-container'>
                                <img className='best-topic-sign-image' src='/images/statistics/icons8-down-right-100.png' />
                                <span className='worst-topic-sign'>
                                    {worstTopicResult.length > 1 ? "WORST TOPICS" : "WORST TOPIC"}
                                </span>
                            </div>

                            <span className='best-topic-title'>
                                {worstTopicResult.length > 1 ? "Worst Topics" : "Worst Topic"}
                            </span>

                            {worstTopicResult.map(worst => {
                                return (
                                    <span className='best-topic-name'>
                                        {worst.topic_name}
                                    </span>
                                )
                            })}

                            {worstTopicResult.map(worst => {
                                return (
                                    <span className='worst-topic-result'>
                                        {worst.topic_result}%
                                    </span>
                                )
                            })}

                        </div>

                    </div>

                    <div className='best-topic-progress-bar-container'>

                        <div className='best-topic-progress'>
                            <div className='worst-topic-progress-fill' style={{width: `${averageWorstWidth()}%`}} />
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}