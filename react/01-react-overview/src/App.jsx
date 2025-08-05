import { useState } from 'react';
import './App.css'
import Navbar from './Navbar'

/* function App() {
  return (
    <div>
      My first react app
      <p>2+2</p>
      <p>{2+2}</p>
    </div>
  )
}
export default App */


/* function Component() {
  return (
    <div>
      <h1>This is component</h1>
      <Component2/>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum excepturi reprehenderit cum eius voluptatibus doloremque cupiditate vero quae ipsam. Sit ut veniam doloribus ipsa nesciunt doloremque natus soluta quis fugit?
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum excepturi reprehenderit cum eius voluptatibus doloremque cupiditate vero quae ipsam. Sit ut veniam doloribus ipsa nesciunt doloremque natus soluta quis fugit?
      </p>
    </div>
  )
} */
// export default Component

/* function Component2() {
  return (
    <div>
      <img src="https://cdn.pixabay.com/photo/2025/04/13/21/14/woman-9532283_1280.jpg" alt="" width="200"/>
    </div>
  )
} */


//---------->Understand component

/* function App() {
  return (
    <div>
      <Component/>
      <Component/>
      <Component2/>
    </div>
  );
} */


//----------> Understand props

/* function App() {
  return (
    <div>
      <Navbar title="Navbar" link="google.com" number={1}/>
      <Navbar title="Navbar" link="asyncPranav.netlify.app" number={2}/>
      <Navbar title="Navbar" link="nam-jap.netlify.app" number={3}/>
      <Navbar title="Navbar" link="nam-jap.netlify.app"/>
    </div>
  );
} */


//----------> Understand states

/* function App() {
  const [count, setCount] = useState(0);

  function incrementCount() {
    setCount(count + 1);
  }
  console.log(count)
  return (
    <div>
      <button onClick={incrementCount}>Increment</button>
      {count}
    </div>
  )
} */

//-----------> data flow

/* function App(){
  const [count, setCount] = useState(0);
  return (
    <div>
      <Navbar data={count}/>
    </div>
  )
} */

// State is local to the component
function App(){
  return(
    <div>
      <Navbar /> {/* all these components will have their own state of count */}
      <Navbar /> {/* all these components will have their own state of count */}
      <Navbar /> {/* all these components will have their own state of count */}
    </div>
  )
}
export default App;