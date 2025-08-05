import './App.css'
// import Header from "./Header"
// import { Card } from './Header'
import Header, {Card} from "./Header"
import reactLogo from "./assets/react.svg"
import {sum} from "./utility"
import data from "./data.json"
// import axios from axsios
import {useState} from "react"



function App() {

  // imported function from utility
  let result = sum(2,3);
  console.log(result);

  // imported json
  console.log(data);

  return (
    <>
      <Header />
      <Card />
      <img src="./vite.svg" alt="vite svg" />
      {/* <img src="./assets/react.svg" alt="react svg" /> */}
      <img src="./src/assets/react.svg" alt="react svg" />

      {/* import image */}
      <img src={reactLogo} alt="react svg" />
    </>
  )
}

export default App
