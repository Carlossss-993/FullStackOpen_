const Total = ({ parts }) => {
    
    return (
        <p>
            <strong>Number of exercises {
                parts.reduce((acum, part) => {
                    return (
                        acum + part.exercises
                    )
                }, 0)
                }
            </strong>
        </p>
    )
}

export default Total