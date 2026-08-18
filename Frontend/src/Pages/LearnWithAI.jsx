import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios"
import './LearnWithAI.css'

export function LearnWithAI() {
    const topicId = useParams().topicId;
    const [generatedFlashCards, setGeneratedFlashCards] = useState(null);
    const [generatedQuiz, setGeneratedQuiz] = useState([]);
    const [isLearningFlashCards, setIsLearningFlashCards] = useState(false);
    const [isLearningQuiz, setIsLearningQuiz] = useState(false);
    const [flashCardsIndex, setFlashCardsIndex] = useState(0);

    //generating flashcards/quizzes
    const [isGenerating, setIsGenerating] = useState(false);
    //if something goes wrong
    const [somethingWentWrong, setSomethingWentWrong] = useState(false);
    // false = question, true = answer;
    const [flashCardsState, setFlashCardsState] = useState(false);
    //flashcards progress variables
    const [numberOfFlashCards, setNumberOfFlashCards] = useState(null);
    const [progressNumber, setProgressNumber] = useState(1);
    //quiz questions progress variables
    const [numberOfQuizQuestions, setNumberOfQuizQuestions] = useState(null);
    const [isHint, setIsHint] = useState(false);
    const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [lock, setLock] = useState(false);
    const [selected, setSelected] = useState(null);

    useEffect( () => {
        if (isGenerating) {
            document.getElementById("flash_cards_loader_object_container_id").scrollIntoView({behavior: "smooth"});
        }
    }, [isGenerating])

    useEffect( () => {
        if (isLearningFlashCards) {
            document.getElementById("flash_cards_container_id").scrollIntoView({behavior: "smooth"});
        }
    }, [isLearningFlashCards]);

    useEffect( () => {
        if (isLearningQuiz) {
            document.getElementById("quiz_container").scrollIntoView({behavior: "smooth"});
        }
    })

    function generateFlashCardsOnClick() {
        setSomethingWentWrong(false);
        setIsGenerating(true);
        api.post(
            `http://localhost:5000/api/notebooklm/generate-flashcards/${topicId}`
        )
        .then( res => {
            setGeneratedFlashCards(res.data.cards);
            console.log(res.data.cards);
            setIsLearningFlashCards(true);
            setFlashCardsIndex(0);
            setIsGenerating(false);
            setNumberOfFlashCards(res.data.cards.length)
        })
        .catch( err => {
            console.log("Error fetching lesson data: ", err.response?.data);
            setSomethingWentWrong(true);
        })
        .finally( () => {
            setIsGenerating(false);
        })
    }

    function generateQuizOnClick() {
        setSomethingWentWrong(false);
        setIsGenerating(true);
        api.post(
            `http://localhost:5000/api/notebooklm/generate-quiz/${topicId}`
        )
        .then(res => {
            setGeneratedQuiz(res.data.questions);
            console.log(res.data.questions);
            setIsLearningQuiz(true);
            setIsGenerating(false);
            setShuffledOptions(shuffleOptions(res.data.questions[0].answerOptions));
            setNumberOfQuizQuestions(res.data.questions.length);
        })
        .catch(err => {
            console.log("Error fetching lesson data:", err.response?.data);
            setSomethingWentWrong(true);
        })
        .finally( () => {
            setIsGenerating(false);
            // scrool to quiz after generated ...
        })
    }

    function flipFlashCards() {
        setFlashCardsState(prev => !prev);
    }

    function previousFlashCards() {
        setFlashCardsIndex(prev => prev - 1);
        setFlashCardsState(false);
        setProgressNumber(prev => prev - 1);
    }

    function nextFlashCards() {
        if (flashCardsIndex === generatedFlashCards.length - 1) {
            setIsLearningFlashCards(false);
            setFlashCardsIndex(0);
            setProgressNumber(1);
            document.getElementById("learn_with_ai_title").scrollIntoView({behavior: "smooth"});
        }
        else {
            setFlashCardsIndex(prev => prev + 1);
            setFlashCardsState(false);
            setProgressNumber(prev => prev + 1);
        }
    }

    function cleanText(text) {
        return text
            .replace(/\$/g, "")
            .replace(/\\text\{([^}]*)\}/g, "$1")
            .replace(/\\_/g, "_")
            .replace(/`/g, "");
    }

    function nextQuizQuestion() {
        if (generatedQuiz.length - 1 === quizQuestionIndex) {
            setIsLearningQuiz(false);
            setQuizQuestionIndex(0);
            setProgressNumber(1);
            setIsHint(false);
            setShuffledOptions([])
            document.getElementById("learn_with_ai_title").scrollIntoView({behavior: "smooth"});
        }
        else {
            const nextIndex = quizQuestionIndex + 1;
            setQuizQuestionIndex(nextIndex);
            setProgressNumber(prev => prev + 1);
            setLock(false);
            setSelected(null);
            setIsHint(false);
            setShuffledOptions(shuffleOptions(generatedQuiz[nextIndex].answerOptions));
        }
    }

    function previousQuizQuestion() {
        const previousIndex = quizQuestionIndex - 1;
        setQuizQuestionIndex(previousIndex);
        setProgressNumber(prev => prev - 1);
        setLock(false);
        setSelected(null);
        setIsHint(false);
        setShuffledOptions(shuffleOptions(generatedQuiz[previousIndex].answerOptions));
    }

    function checkAns(qo) {
        if (!lock) {
            setSelected(qo.text);
            setLock(true);
        }
    }

    function shuffleOptions(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function setHint() {
        if (isHint) {
            setIsHint(false);
        }
        else {
            setIsHint(true);
        }
    }

    return (
        <div className="learn-with-ai-page-container">
            <h1 id="learn_with_ai_title" className="learn-with-ai-title">Learn with AI</h1>

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

                    <span className="cards-title">Flashcards</span>
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
                        <button disabled={isLearningFlashCards || isLearningQuiz} className="cards-button" onClick={() => generateQuizOnClick()}>
                            <div className="cards-button-label-container">
                                Generate <img className="cards-arrow-image" src="/images/learn_with_ai/icons8-right-arrow-100 (2).png" />
                            </div>
                        </button>
                    </div>
                </div>                

            </div>

            {isGenerating && (
                        <div className="flash-cards-loader-container">
                            <div id="flash_cards_loader_object_container_id" className="flash-cards-loader-object-container">
                                <div className="flash-cards-loader-object" />
                                <div className="flash-cards-loader-object" />
                                <div className="flash-cards-loader-object" />
                                <div className="flash-cards-loader-object" />
                                <div className="flash-cards-loader-object" />
                                <div className="flash-cards-loader-object" />
                                <div className="flash-cards-loader-object" />
                                <div className="flash-cards-loader-object" />
                            </div>
                            <div className="flash-cards-loader-text">
                                AI is doing its Magic...
                            </div>
                        </div>
            )}

            { isLearningFlashCards && (
                <div className="flash-cards-container">

                    <div className="flash-cards-container-hline" />

                    <div id="flash_cards_container_id" className="flash-cards-title-container">
                        <span className="flash-cards-title">
                            Flashcards
                        </span>
                        <div className="flash-cards-progress-container">
                            <span className="flash-cards-progress-text">
                                {progressNumber}/{numberOfFlashCards}
                            </span>
                            <progress className="flash-cards-progress-bar" max={numberOfFlashCards} value={progressNumber} />
                        </div>
                    </div>

                    <div className="flash-cards">
                        <div className="flash-card-front-or-back-text-container">
                            <span className="flash-cards-front-or-back-text">
                                {flashCardsState ? "Back" : "Front"}
                            </span>
                        </div>
                        <img className="flash-cards-image" src="/images/learn_with_ai/icons8-brain-100.png" />
                        <span className="flash-cards-text">
                            {flashCardsState ? 
                                cleanText(generatedFlashCards[flashCardsIndex].back) : cleanText(generatedFlashCards[flashCardsIndex].front)}
                        </span>
                    </div>
                    <div className="flash-cards-buttons-container">
                        <button className="flash-cards-button-previous" disabled={flashCardsIndex === 0} onClick={() => previousFlashCards()}>
                            <img className="flash-cards-button-images" src="/images/learn_with_ai/icons8-rewind-100.png"/>
                            Previous
                        </button>
                        <button className="flash-cards-button-flip" onClick={() => flipFlashCards()}>
                            <img className="flash-cards-button-images" src="/images/learn_with_ai/icons8-flip-50 (1).png" />
                            Flip
                        </button>
                        <button className="flash-cards-button-previous" onClick={() => nextFlashCards()}>
                            Next
                            <img className="flash-cards-button-images" src="/images/learn_with_ai/icons8-fast-forward-100.png" />
                        </button>
                    </div>
                </div>
            )}

            {/* don't forget to turn off disable after finishing with flashcards,quizzes!!!!!!! */}

            {somethingWentWrong && (
                <p className="something-went-wrong">
                    Ooops! Something went wrong...
                </p>
            )}

            {isLearningQuiz && (
                <div id="quiz_container" className="quiz-container">
                    <div className="quiz-card-container">

                        <div className="flash-cards-container-hline" />

                        <div className="quiz-card-title-container">
                            <img className="quiz-card-title-image" src="" />
                            <span className="quiz-card-title">Quiz</span>
                            <progress className="quiz-card-title-progress-bar" max={numberOfQuizQuestions} value={progressNumber} />
                            <span className="quiz-card-title-progress-text">Question {progressNumber} of {numberOfQuizQuestions}</span>
                        </div>

                        <div className="quiz-question-container">
                            <img className="quiz-question-image" src="" />
                            <span className="quiz-question-text">{cleanText(generatedQuiz[quizQuestionIndex].question)}</span>
                        </div>

                        <div className="quiz-question-options-container">
                            <ul className="quiz-question-options-list">
                                {shuffledOptions.map((qo) => {
                                    let classname = "";
                                    if (lock) {
                                        if (qo.isCorrect) {
                                            classname = "correct";
                                        } 
                                        else if (qo.text === selected) {
                                            classname = "wrong";
                                        }
                                    }
                                    return (
                                        <li
                                            key={qo.rationale}
                                            className={classname}
                                            onClick={() => checkAns(qo)}
                                        >{cleanText(qo.text)}</li>
                                    )
                                })}
                                

                            </ul>
                        </div>

                        <div className="quiz-card-buttons-container">
                            <button onClick={setHint} className="quiz-card-hint-button">
                                <img className="quiz-card-hint-image" src="" />
                                Hint
                            </button>
                            <button disabled={quizQuestionIndex === 0} onClick={previousQuizQuestion} className="quiz-card-hint-button">
                                <img className="quiz-card-hint-image" src="" />
                                Previous
                            </button>
                            <button disabled={!lock} onClick={nextQuizQuestion} className="quiz-card-hint-button">
                                Next
                                <img className="quiz-card-hint-image" src="" />
                            </button>
                        </div>

                        {isHint && (
                            <div className="quiz-card-hint-container">
                                <span className="quiz-card-hint-text">{generatedQuiz[quizQuestionIndex].hint}</span>
                            </div>
                        )}

                    </div>
                </div>
            )}

                
        </div>

    )
}