
// Method-01
/* function Navbar(props) {
  console.log(props) //props come as object
  return (
    // <h1>{JSON.stringify(props)}</h1>
    <div>
      <span>{props.title} - </span>
      <span>{props.number} - </span>
      <span>{props.link}</span>
    </div>
  )
} */

import { useState } from "react";

// Method-02 {Destructuring} - can change order but name must be same
/* function Navbar({title, number, link }) {
  console.log(title, number, link);
  return (
    <div>
      <span>{title} - </span>
      <span>{number} - </span>
      <span>{link}</span>
    </div>
  )
} */


// --------> data flow
/* function Navbar({data}) {
  return(
    <Button data={data}/>
  )
}

function Button({data}){
  return(
    <button>{data}</button>
  )
} */

function Navbar(){
  let [count, setCount] = useState(0);
  return(
    <div>
      {count}
    </div>
  )
}

export default Navbar;