import Editor from '@monaco-editor/react'
import React from 'react'
import { useState } from 'react'
import axios from 'axios';

export function CodeEditor(props) {
    const [starterCode, setStarterCode] = useState(
        () => props.starter_code || ""
    );
    const [isCorrect, setIsCorrect] = useState(null);

    

    function CodingExerciseCorrection() {
        axios.post(
            "http://localhost:5000/api/fix-codes/fix-code",
            {
                "description": props.description,
                "code": starterCode
            }
        )
        .then(res => {
            setIsCorrect(res.data.response);
            console.log("is_correct: ", res.data.response);
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
                defaultLanguage="python"
                value={starterCode}
                onChange={value => setStarterCode(value || "")}
                theme='vs-dark'
            />
            <button onClick={() => console.log(starterCode)}>Próba</button>
            <button onClick={CodingExerciseCorrection}>Submit</button>
            <p>Result: {isCorrect}</p>
        </>
        
    )
}