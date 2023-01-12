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

const Header = ({ text }) => <h3>{text}</h3>

const Course = ({ course }) => {
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

export default Course