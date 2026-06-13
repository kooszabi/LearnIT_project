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
                    <Card key={1} lessonId={1}/>
                    <Card key={2} lessonId={2}/>

                </div>
                
                <div className="variable-title-container">
                    <h2 className="variable-title">Print</h2>
                    <div className="variable-title-hline"/>
                </div>
                <div className="variable-content-container">
                    <Card key={3} lessonId={3}/>
                    <Card key={4} lessonId={4}/>

                </div>

                <div className="variable-title-container">
                    <h2 className="variable-title">Conditions</h2>
                    <div className="variable-title-hline"/>
                </div>
                <div className="variable-content-container">
                    <Card key={5} lessonId={5}/>
                    <Card key={6} lessonId={6}/>

                </div>

                <div className="variable-title-container">
                    <h2 className="variable-title">Lists, Tuples, Sets and Dictionaries</h2>
                    <div className="variable-title-hline"/>
                </div>
                <div className="variable-content-container">
                    <Card key={7} lessonId={7}/>
                    {/* <Card key={8} lessonId={8}/>
                    <Card key={9} lessonId={9}/> */}

                </div>
            </div>
            
        </>
    )
}