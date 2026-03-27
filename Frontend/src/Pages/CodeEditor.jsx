import Editor from '@monaco-editor/react'
import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import "./CodeEditor.css";

export function CodeEditor(props) {
    const [starterCode, setStarterCode] = useState(
        () => props.starter_code || ""
    );

    

    function CodingExerciseCorrection() {
        axios.post(
            "http://localhost:5000/api/fix-codes/fix-code",
            {
                "description": props.description,
                "code": starterCode
            }
        )
        .then(res => {
            const result = res.data.response;
            props.result(result);
            console.log("is_correct: ", result);
            }
        )
        .catch(err => {
            console.log("No result received...", err.response?.data);
            } 
        )
    }
    
    return (
        <>
            <Editor
                height="400px"
                width="600px"
                defaultLanguage="python"
                value={starterCode}
                onChange={value => setStarterCode(value || "")}
                theme='vs-dark'
            />
{/*             <button onClick={() => console.log(starterCode)}>Próba</button> */}
            <button className="submit-button" onClick={CodingExerciseCorrection}>
                <img className="submit-arrow" src='/images/component_icons/icons8-submit-progress-50.png' />
                Submit</button>
        </>
        
    )
}