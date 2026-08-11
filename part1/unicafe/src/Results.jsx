import Header from "./Header"

const Statistics = ({ good, neutral, bad }) => {

    const total = good + neutral + bad

    return (
        <div>
            <Header text="Statistics"/>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
            <p>All: {total}</p>
            <p>Average: {total === 0 ? 0 : (good-bad)/(total)}</p>
            <p>Positive: {total === 0 ? 0 : good/(total)}</p>
        </div>
    )
}

export default Statistics