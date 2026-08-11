import Part from "./Part"

const Content = (props) => {
    
    return (
        <>
            <Part part={props.content[0].part} exercises={props.content[0].exercises}/>
            <Part part={props.content[1].part} exercises={props.content[1].exercises}/>
            <Part part={props.content[2].part} exercises={props.content[2].exercises}/>
        </>
    )
}

export default Content