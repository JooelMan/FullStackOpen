import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)
const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good}/>
        <StatisticLine text='neutral' value={props.neutral}/>
        <StatisticLine text='bad' value={props.bad}/>
        <StatisticLine text='all' value={props.all}/>
        <StatisticLine text='average' value={props.average}/>
        <StatisticLine text='positive' value={props.positive}/>
        </tbody>
    </table>
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