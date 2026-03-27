import { googleLogout } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
/* import { useEffect, useState } from "react";
import axios from "axios"; */
import { Card } from "./Card";
import './Home.css';
export function Home() {

    const navigate = useNavigate();

    function handleLogout() {
        googleLogout();
        navigate("/");
    }

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

            <nav>
                <ul>
                    <li><a href="#"></a>Home</li>   
                    <li><a href="#"></a>Variables</li>    
                    <li><a href="#"></a>Print</li>    
                    <li><a href="#"></a>...</li>    
                    <li><a href="#"></a>Log Out</li>    
                </ul>
            </nav>

            <p>Welcome to the Home page!</p>
            <button onClick={handleLogout}>Log out</button> 

            <div>
                <Card lessonId={1} />
            </div>
        </>
    
    )
}
