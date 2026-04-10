import Editor from '@monaco-editor/react'
import React from 'react'
import { useState } from 'react'
/* import axios from 'axios'; */
import "./CodeEditor.css";

export function CodeEditor(props) {
    const [starterCode, setStarterCode] = useState(
        () => props.starter_code || ""
    );

    const handleChange = (value) => {
        const code = value || "";
        setStarterCode(code);
        props.onCodeChange(code);
    }

    /* function CodingExerciseCorrection() {
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
    } */
    
    return (
        <>
            <div className="code-editor-container">
                <Editor
                height="400px"
                width="600px"
                defaultLanguage="python"
                value={starterCode}
                /* onChange={value => setStarterCode(value || "")} */
                onChange={handleChange}
                theme='vs-dark'
                />
                {/* <div className="code-editor-submit-button">
                    <button className="submit-button" onClick={CodingExerciseCorrection}>
                        <img className="submit-arrow" src='/images/component_icons/icons8-submit-progress-50.png' />
                        Submit
                    </button>
                </div> */}
                
            </div>
            
        </>
        
    )
}