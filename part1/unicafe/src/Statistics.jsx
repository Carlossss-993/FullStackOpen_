import Header from "./Header"

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
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
            <p>All: {total}</p>
            <p>Average: {(good-bad)/(total)}</p>
            <p>Positive: {good/(total)}</p>
        </div>
    )
}

export default Statistics