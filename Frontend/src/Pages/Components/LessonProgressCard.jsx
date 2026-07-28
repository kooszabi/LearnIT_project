import { PieChart, Pie, Label, ResponsiveContainer, Tooltip } from 'recharts';
import './LessonProgressCard.css';

export function LessonProgressCard(props) {
    //const colors = ["#4CAF50", "#E0E0E0"];
    const title = props.title;
    const completedLessons = props.completedLessons;
    const allLessons = props.allLessons;
    const remainingLessons = props.remainingLessons;
    const progress = props.progress;
    const image = props.image_url;
    /* const data = [
        {name: 'Completed', value: completedLessons, fill: "#4CAF50"},
        {name: 'Not Completed', value: remainingLessons, fill: "#E0E0E0"}
    ]; */
    const data = [
        {name: 'Completed', value: completedLessons, fill: "#2563EB"},
        {name: 'Not Completed', value: remainingLessons, fill: "#E5E7EB"}
    ];

    return (

        <div className='lesson-progress-card'>
            <div className='title-div'>
                <img className='card-image' src={image} />
                <h3 className='lesson-progress-title'>
                    {title}
                </h3>
            </div>

            <div className='piechart-container'>

                <ResponsiveContainer width='100%' height='100%' className='res'>
                    <PieChart>
                        <Pie data={data} dataKey="value" nameKey="name" outerRadius={110} innerRadius={85} startAngle={45} endAngle={-315} />
                        <Tooltip
                            contentStyle={{
                                border: '1px solid #212529',
                                backgroundColor: '#fff',
                                padding: "5px",
                                borderRadius: '5px'
                            }}
                            itemStyle={{
                                color: "#212529",
                                fontSize: "15px"
                            }}
                            formatter={(value, name) => [`${value} ${name}`]}
                        />

                        </PieChart>
                </ResponsiveContainer>
                <div className='progress-percent-container'>
                    <p className='progress-percent'>{progress}%</p>
                </div>
            </div>
            <div className='piechart-text'>
                <p className='progress-text'>
                    {completedLessons} / {allLessons}
                </p>

                <div className='piechart-legend-hline' />

                <div className='piechart-legend'>
                    <div className='completed-container'>
                        
                        <div className='completed-text-container'>
                            <div className='completed-color' />
                            <span className='completed-text'>Completed</span>
                        </div>
                        <p className='completed-number'>{completedLessons}</p>
                    </div>
                    <div className='completed-container'>
                        
                        <div className='completed-text-container'>
                            <div className='not-completed-color' />
                            <span className='completed-text'>Not Completed</span>
                        </div>
                        <p className='completed-number'>{remainingLessons}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}