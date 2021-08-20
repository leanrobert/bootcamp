import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistics = (props) => {
  return(
    <div>
      <h1>statistics</h1>
      {(props.good + props.neutral + props.bad) > 0 ? (
        <table>
          <tbody>
            <Statistic text="good" value={props.good} />
            <Statistic text="neutral" value={props.neutral} />
            <Statistic text="bad" value={props.bad} />
            <Statistic text="all" value={props.good + props.neutral + props.bad} />
            <Statistic text="average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
            <Statistic text="positive" value={props.good / (props.good + props.neutral + props.bad) * 100} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  )
}

const Statistic = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.funciton}>{props.text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button funciton={() => setGood(good + 1)} text="good" />
      <Button funciton={() => setNeutral(neutral + 1)} text="neutral" />
      <Button funciton={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
