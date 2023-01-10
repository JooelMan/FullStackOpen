const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = (props) => {
  const p1 = props.parts[0]
  const p2 = props.parts[1]
  const p3 = props.parts[2]
  return (
    <div>
      <Part part={p1.name} exercises={p1.exercises}/>
      <Part part={p2.name} exercises={p2.exercises}/>
      <Part part={p3.name} exercises={p3.exercises}/>
    </div>
  )
}

const Total = (props) => {
  const first = props.parts[0].exercises
  const second = props.parts[1].exercises
  const third = props.parts[2].exercises
  return (
    <p>Number of exercises {first + second + third}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App