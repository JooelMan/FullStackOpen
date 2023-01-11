import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const Stat = ({ text, value }) => <p>{text} {value}</p>

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
      const res = good / all
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
      <Stat text='good' value={good}/>
      <Stat text='neutral' value={neutral}/>
      <Stat text='bad' value={bad}/>
      <Stat text='all' value={all}/>
      <Stat text='average' value={average}/>
      <Stat text='positive' value={positive}/>
    </div>
  )
}

export default App