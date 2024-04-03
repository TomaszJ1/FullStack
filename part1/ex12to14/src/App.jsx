import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [mostVotedAnectode, setMostVotedAnectode] = useState(0);
  const [points, setPoints] = useState({
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0
   })
  const [selected, setSelected] = useState(0)

  const drawAnectode = () => {
    const drawnAnectode = Math.floor(Math.random() * 8)
    setSelected(drawnAnectode)
  }

  const upvoteAnectode = () => {
    const newPoints = {
      ...points,
      [selected]: points[selected] + 1
    }

    let mostVotes = 0;
    let mostVotesId = 0;

    for(let i = 0; i < 8; i++) {
      if(newPoints[i] > mostVotes){
        mostVotesId = i; 
        mostVotes = newPoints[i]
      } 
    }
    setMostVotedAnectode(mostVotesId);

    setPoints(newPoints)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <br /> <button onClick={drawAnectode}>next anecdote</button>
      <br /> <button onClick={upvoteAnectode}>upvote anectode</button>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[mostVotedAnectode]}
    </div>
  )
}

export default App