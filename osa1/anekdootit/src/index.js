import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(6).fill(0));
  const [popularAnecdote, setPopularAnecdote] = useState(0);
  const [popularVotes, setPopularVotes] = useState(votes[popularAnecdote]);
  let anecdote = props.anecdotes[selected];
  
  const setRandomAnecdote = () => {
    const random = Math.ceil(Math.random() * 6) - 1;
    if (random === selected) {
      setRandomAnecdote();
      return;
    }
    setSelected(random);
    anecdote = props.anecdotes[selected];
  };
  
  const vote = i => {
    let copy = [...votes];
    copy[i]++;
    copy.forEach(function (value, index) {
      if (value > votes[popularAnecdote]) {
        setPopularAnecdote(index);
        setPopularVotes(value);
      }
    });
    setVotes(copy);
  };
  
  
  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        {anecdote}
      </div>
      <div>
        Has {votes[selected]} votes
      </div>
      <div>
        <button onClick={() => vote(selected)}>vote</button>
        <button onClick={setRandomAnecdote}> next anecdote</button>
      </div>
      <div>
        <h2>Anecdote with the most votes</h2>
        {anecdotes[popularAnecdote]}
      </div>
      <div>
        Has {popularVotes} votes
      </div>
    </div>
  )
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
);