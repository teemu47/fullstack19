import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = (good + (bad * -1)) / all;
  const positive = good / all * 100;
  
  const body =
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={'good'}/>
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'}/>
      <Button handleClick={() => setBad(bad + 1)} text={'bad'}/>
      <h2>Statistics</h2>
    </div>;
  
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        {body}
        <p>No feedback given</p>
      </div>
    )
  }
  
  return (
    <div>
      {body}
      <table>
        <tbody>
        <Statistics text={'Good'} value={good} />
        <Statistics text={'Neutral'} value={neutral} />
        <Statistics text={'Bad'} value={bad} />
        <Statistics text={'All'} value={all} />
        <Statistics text={'Average'} value={average} />
        <Statistics text={'Positive'} value={positive + ' %'} />
        </tbody>
      </table>
    </div>
  )
};

const Button = ({handleClick, text}) => {
  return (
    <>
      <button onClick={handleClick}>
        {text}
      </button>
    </>
  )
};

const Statistics = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));

