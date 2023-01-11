import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const Stat = ({ text, value }) => <p>{text} {value}</p>
const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>
  }
  return (
    <>
      <Stat text='good' value={props.good}/>
      <Stat text='neutral' value={props.neutral}/>
      <Stat text='bad' value={props.bad}/>
      <Stat text='all' value={props.all}/>
      <Stat text='average' value={props.average}/>
      <Stat text='positive' value={props.positive}/>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const countAverage = () => {
    if (all === 0) {
      return 0
    }
    return (good - bad) / all
  }
  const average = countAverage()
  const countPositive = () => {
    if (all === 0 || good === 0) {
      return '0 %'
    } else {
      const res = (good / all) * 100
      return `${res} %`
    }
  }
  const positive = countPositive()

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App