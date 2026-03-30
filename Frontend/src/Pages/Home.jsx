/* import { googleLogout } from "@react-oauth/google" */
import { useNavigate } from "react-router-dom"
/* import { useEffect, useState } from "react";
import axios from "axios"; */
/* import { Card } from "./Card"; */
import './Home.css';

export function Home() {
    const navigate = useNavigate();

    /* const [generatedQuestions, setGeneratedQuestions] = useState(null);
    useEffect(() => {
            axios.post(
                "http://localhost:5000/api/generates/generate",
                {
                    lessonId: 1
                }
            )
            .then(res => {
                console.log("api/generated/questions full response: ", res.data.response);
                try {
                    const parsed = JSON.parse(res.data.response);
                    console.log("parsed: ", parsed.questions);
                    setGeneratedQuestions(parsed.questions);
                } catch (err) {
                    console.error("JSON parse error: ", err);
                }
                setGeneratedQuestions(res.data.response);
            })
            .catch(err => {
                console.log("Error fetching card data: ", err);
            });
        }, []); */

    /* if (!generatedQuestions) return <p>Loading the generated questions...</p> */
    return (
        <>
        {/* {generatedQuestions && (<div>
            {generatedQuestions.questions.map((q, i) => (
                <div key={i}>
                    <h3>{q.text}</h3>
                    {q.options.map( (qo, j) => (
                        <p key={j}>{qo.question_option_text}</p>
                    ))}
                </div>
            ))}
            
        </div>)} */}
            <div className="home-page">
                <h1 className="home-page-title">
                    Coding Journeys
                </h1>
                <div className="home-page-hline"/>

                <div className="coding-journeys-container">
                    <div className="coding-journeys-card">
                        <img className="coding-journeys-image" src="/images/home_icons/icons8-python-96.png" />
                        <h3 className="coding-journeys-card-title">
                            Python
                        </h3>
                        <button onClick={() => navigate("/python")} className="coding-journeys-button">
                            Let's explore...
                            <img className="coding-journeys-button-image" src="/images/home_icons/icons8-explore-96.png" />
                        </button>
                    </div>

                    <div className="coding-journeys-card">
                        <img className="coding-journeys-image" src="/images/home_icons/icons8-c-sharp-logo-2-96.png" />
                        <h3 className="coding-journeys-card-title">
                            C#
                        </h3>
                        <button onClick={() => navigate("/home")} className="coding-journeys-button">
                            Let's explore...
                            <img className="coding-journeys-button-image" src="/images/home_icons/icons8-explore-96.png" />
                        </button>
                    </div>

                    <div className="coding-journeys-card">
                        <img className="coding-journeys-image" src="/images/home_icons/icons8-java-96.png" />
                        <h3 className="coding-journeys-card-title">
                            Java
                        </h3>
                        <button onClick={() => navigate("/home")} className="coding-journeys-button">
                            Let's explore...
                            <img className="coding-journeys-button-image" src="/images/home_icons/icons8-explore-96.png" />
                        </button>
                    </div>
                </div>
            </div>
            
        </>
    
    )
}
