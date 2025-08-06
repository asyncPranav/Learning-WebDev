import { useState } from 'react'
import './App.css'

function App() {
  const [upvote, setUpvote] = useState(0);
  const [downvote, setDownvote] = useState(0);

  return (
    <div>
      <h2>Upvote : {upvote}</h2>
      <h2>Downvote : {downvote}</h2>
      <h2>Total votes : {upvote+downvote}</h2>
      <h2>Net Score : {upvote-downvote}</h2>
      <br />
      <button onClick={() => setUpvote(upvote+1)}>Upvote</button>
      <button onClick={() => setDownvote(downvote+1)}>Downvote</button>
    </div>
  )
}

export default App
