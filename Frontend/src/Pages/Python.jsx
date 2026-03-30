import { Card } from "./Card";
import './Python.css'
export function Python() {


    return (
        <>
            <div className="python-container">
                <div className="variable-title-container">
                    <h2 className="variable-title">Variables</h2>
                    <div className="variable-title-hline"/>
                </div>
                <div className="variable-content-container">
                    <Card lessonId={1}/>
                    <Card lessonId={1}/>
                    <Card lessonId={1}/>
                </div>
                
                <div className="variable-title-container">
                    <h2 className="variable-title">Print</h2>
                    <div className="variable-title-hline"/>
                </div>
                <div className="variable-content-container">
                    <Card lessonId={1}/>
                    <Card lessonId={1}/>
                    <Card lessonId={1}/>
                    <Card lessonId={1}/>
                    <Card lessonId={1}/>
                </div>
            </div>
            
        </>
    )
}