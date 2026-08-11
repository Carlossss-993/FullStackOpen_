const Total = (props) => {
    
    let total = 0
    props.parts.forEach(part => total+=part.exercises)
    return (
        <p>
            <strong>Number of exercises {total}</strong>
        </p>
    )
}

export default Total