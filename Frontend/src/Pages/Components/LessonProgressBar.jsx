import './LessonProgressBar.css';

export function LessonProgressBar(props) {
    const allTopicLesson = props.allTopicLesson;
    const completedTopicLesson = props.completedTopicLesson;
    const topicName = props.topicName;
    const topicProgress = props.topicProgress;
    const topicId = props.topicId;

    const completed = topicProgress === 100;
    return (
        <>
            {completed && (
                <div className='lesson-progress-bar-container'>

                    <div className='order-number-div'>
                        <span className='order-number'>
                            {topicId}.
                        </span>
                    </div>
                
                    <div className='lesson-progress-bar-container-2'>
                        {/* <div className='lesson-progress-vline' /> */}

                        <div className='information-div'>
                            <div className='progress-bar-title-container'>
                                <span className='progress-bar-title'>
                                    {topicName}
                                </span>
                            </div>

                            <div className='progress-bar-div'>
                                <div className='progress-bar'>
                                    <div className='progress-fill'
                                        style={{width: `${topicProgress}%`}}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='lesson-progress-completed-div'>
                            <div className='lesson-progress-completed-text-div'>
{/*                                 <span className='lesson-progress-completed-text'> */}
                                    <img className='lesson-progress-completed-image' src='\images\statistics\icons8-checkmark-100.png'/>Completed
{/*                                 </span> */}
                            </div>

                        </div>

                        <div className='progress-bar-text-div'>
                            <span className='progress-bar-progress-text'>
                                {topicProgress}%
                            </span>
                            <span className='progress-bar-progress-text'>
                                {completedTopicLesson}/{allTopicLesson} {allTopicLesson > 1 ? "Lessons" : "Lesson"}
                            </span>
                        </div>
                    </div>

                </div>)
            }

            {/* not completed */}
            {!completed && (
                <div className='lesson-progress-bar-container'>

                    <div className='order-number-div'>
                        <span className='order-number'>
                            {topicId}.
                        </span>
                    </div>
                
                    <div className='lesson-progress-bar-container-2'>
                        {/* <div className='lesson-progress-vline' /> */}

                        <div className='information-div'>
                            <div className='progress-bar-title-container'>
                                <span className='progress-bar-title'>
                                    {topicName}
                                </span>
                            </div>

                            <div className='progress-bar-div'>
                                <div className='progress-bar'>
                                    <div className='progress-fill'
                                        style={{width: `${topicProgress}%`}}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='progress-bar-text-div'>
                            <span className='progress-bar-progress-text'>
                                {topicProgress}%
                            </span>
                            <span className='progress-bar-progress-text'>
                                {completedTopicLesson}/{allTopicLesson} {allTopicLesson > 1 ? "Lessons" : "Lesson"}
                            </span>
                        </div>
                    </div>

                </div>)
            }
        </>
    )
}