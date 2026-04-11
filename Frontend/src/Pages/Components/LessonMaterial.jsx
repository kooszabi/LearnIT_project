import React from "react";
import './LessonMaterial.css';

export function LessonMaterial(props) {
    const lessonTitle = props.lessonTitle;
    const lessonMaterial = props.lessonMaterial;

    return (
        <>
            <div className="lesson-material-container">
                <h2 className="title">{lessonTitle}</h2>

                <p className="description">{lessonMaterial.description}</p>


                {lessonMaterial.content.map(block => {
                    switch(block.type){
                        case "text":
                            return <p className="text" key={block.id}>{block.value}</p>;
                        case "example":
                            return (
                                <div className="example-div">
                                    <pre className="example" key={block.id}><code className="example-content">{block.value}</code></pre>
                                </div>
                                )
                        case "note":
                            return <div className="note" key={block.id} >{block.value}</div>;
                        default:
                            return null;
                    }
                })}
            </div>
        </>
    )
}


