import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CodeEditor } from './CodeEditor';

export function Lesson() {
    const lessonId = useParams().lessonId;
    const [lessonTitle, setLessonTitle] = useState(null);
    const [lessonContent, setLessonContent] = useState(null);
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
            setLessonContent(res.data.content);
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


    if (!lessonContent) return <p>Loading the lesson...</p>;
    if (!lessonQuestions) return <p>Loading the questions...</p>;
    if (!lessonCodingExercises) return <p>Loading the coding exercises...</p>

    return (
        <>
            <h2>{lessonTitle}</h2>

            <p>{lessonContent.description}</p>

            
            {lessonContent.content.map(block => {
                switch(block.type){
                    case "text":
                        return <p key={block.id}>{block.value}</p>;
                    case "example":
                        return <pre key={block.id}><code>{block.value}</code></pre>;
                    case "note":
                        return <div key={block.id} style={{background: "#fff3cd", padding:"10px", margin:"10px 0"}}>{block.value}</div>;
                    default:
                        return null;
                }
            })}

            {lessonQuestions.map(q => (
                <div key={q.id}>
                    <p>{q.text}</p>

                    {q.options.map(opt => (
                        <div key={opt.id}>
                            {opt.question_option_text}
                        </div>
                    ))}
                </div>
            ))}

            {lessonCodingExercises.map(cd => (
                <div key={cd.id}>
                    <h6>{cd.title}</h6>
                    <p>{cd.description}</p>

                    <CodeEditor key={lessonId} starter_code={cd.starter_code} description={cd.description}/>
                </div>
            ))}
        </>
    )
}