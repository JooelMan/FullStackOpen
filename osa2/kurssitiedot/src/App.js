const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Total = ({ amounts }) => {
  const total = amounts.reduce((start, addition) => start + addition, 0)
  return (
    <h4>total of {total} exercises</h4>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
      <Total amounts={parts.map(p => p.exercises)} />
    </>
  )
}

const Header = ({ text }) => <h1>{text}</h1>

const Course = ({ course }) => {
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App