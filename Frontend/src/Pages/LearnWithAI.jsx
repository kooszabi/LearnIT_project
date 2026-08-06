import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios"
import './LearnWithAI.css'

export function LearnWithAI() {
    const topicId = useParams().topicId;
    const [generatedFlashCards, setGeneratedFlashCards] = useState(null);
    const [generatedQuiz, setGeneratedQuiz] = useState(null);
    const [isLearningFlashCards, setIsLearningFlashCards] = useState(false);
    const [isLearningQuiz, setIsLearningQuiz] = useState(false);
    const [flashCardsIndex, setFlashCardsIndex] = useState(0);

    //test flashcards mechanics

    // false = question, true = answer;
    const [flashCardsState, setFlashCardsState] = useState(false);

    function generateFlashCardsOnClick() {
        api.post(
            `http://localhost:5000/api/notebooklm/generate-flashcards/${topicId}`
        )
        .then( res => {
            setGeneratedFlashCards(res.data.cards);
            console.log(res.data.cards);
            setIsLearningFlashCards(true);
            setFlashCardsIndex(0);
        })
        .catch( err => {
            console.log("Error fetching lesson data: ", err.response?.data);
        })
    }

    function generateQuizOnClick() {
        api.post(
            `http://localhost:5000/api/notebooklm/generate-quiz/${topicId}`
        )
        .then(res => {
            setGeneratedQuiz(res.data.questions);
            console.log(res.data.questions);
            setIsLearningQuiz(true);   
        })
        .catch(err => {
            console.log("Error fetching lesson data:", err.response?.data);
        })
    }

    function flipFlashCards() {
        setFlashCardsState(prev => !prev);
    }

    function previousFlashCards() {
        setFlashCardsIndex(prev => prev - 1);
        setFlashCardsState(false);
    }

    function nextFlashCards() {
        if (flashCardsIndex === generatedFlashCards.length - 1) {
            setIsLearningFlashCards(false);
            setFlashCardsIndex(0);
        }
        else {
            setFlashCardsIndex(prev => prev + 1);
            setFlashCardsState(false);
        }
    }

    function cleanText(text) {
        return text
            .replace(/\$/g, "")
            .replace(/\\text\{([^}]*)\}/g, "$1")
            .replace(/\\_/g, "_");
    }


    return (
        <div className="learn-with-ai-page-container">
            <h1 className="learn-with-ai-title">Learn with AI</h1>

            <div className="cards-container">

                <div className="cards">
                    <img className="cards-image" src="/images/learn_with_ai/icons8-cards-100.png" />
                    
                    <div className="cards-property-container">
                        <div className="cards-property">
                            Easy
                        </div>
                        <div className="cards-property">
                            Theory
                        </div>
                    </div>

                    <span className="cards-title">FlashCards</span>
                    <span className="cards-description">Generate AI-powered flashcards to review key concepts, reinforce your understanding, and improve long-term memory through interactive learning.</span>

                    <div className="cards-button-container">
                        <button disabled={isLearningFlashCards || isLearningQuiz} className="cards-button" onClick={() => generateFlashCardsOnClick()}>
                            <div className="cards-button-label-container">
                                Generate <img className="cards-arrow-image" src="/images/learn_with_ai/icons8-right-arrow-100 (2).png" />
                            </div>
                        </button>
                    </div>
                </div>

                <div className="cards">
                    <img className="cards-image" src="/images/statistics/icons8-puzzle-100.png" />

                    <div className="cards-property-container">
                        <div className="cards-property">
                            Easy
                        </div>
                        <div className="cards-property">
                            Practical
                        </div>
                    </div>

                    <span className="cards-title">Quiz</span>
                    <span className="cards-description">Challenge yourself with AI-generated quiz questions to test your knowledge, identify weak areas, and reinforce what you've learned.</span>
                    
                    <div className="cards-button-container">
                        <button disabled={isLearningFlashCards || isLearningQuiz} className="cards-button" /* onClick={() => generateQuizOnClick()} */>
                            <div className="cards-button-label-container">
                                Generate <img className="cards-arrow-image" src="/images/learn_with_ai/icons8-right-arrow-100 (2).png" />
                            </div>
                        </button>
                    </div>
                </div>                

            </div>

            { isLearningFlashCards && (
                <div className="flash-cards-container">
                    <div className="flash-cards">
                        <span className="flash-cards-text">
                            {flashCardsState ? 
                                cleanText(generatedFlashCards[flashCardsIndex].back) : cleanText(generatedFlashCards[flashCardsIndex].front)}
                        </span>
                    </div>
                    <div className="flash-cards-buttons-container">
                        <button className="flash-cards-button-previous" disabled={flashCardsIndex === 0} onClick={() => previousFlashCards()}>Previous</button>
                        <button className="flash-cards-button-flip" onClick={() => flipFlashCards()}>Flip</button>
                        <button className="flash-cards-button-next" onClick={() => nextFlashCards()}>Next</button>
                    </div>
                </div>
            )}

            {/* don't forget to turn off disable after finishing with flashcards,quizzes!!!!!!! */}
        </div>

    )
}