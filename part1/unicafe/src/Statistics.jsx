import Header from "./Header"
import StatisticLine from "./StatisticLine"

const Statistics = ({ good, neutral, bad }) => {

    const total = good + neutral + bad

    return (
        total === 0 ? 
        <div>
            <Header text="Statistics"/>
            <p>No feedback given</p>
        </div> :
        <div>
            <Header text="Statistics"/>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={(good-bad)/(total)} />
            <StatisticLine text="Positive" value={good/(total)} />
        </div>
    )
}

export default Statistics