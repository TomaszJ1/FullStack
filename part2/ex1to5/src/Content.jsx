const Content = (props) => {
    const total = props.course.parts.reduce((s, p) => s + p.exercises, 0)
    const partsToDisplay = props.course.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)
    return (
        <>
            {partsToDisplay}
            <p>total of {total}</p>
        </>
    )
}

const Part = (props) => {
    return (
    <p>
        {props.part} {props.exercises}
    </p>
    )
}

export default Content