import React from 'react'

const Hello = () => {
  const inlineStyle = {
    backgroundColor: 'lightblue',
    color: 'darkblue',
    fontFamily: 'Arial, sans-serif'
  }
  return (
    <div>
      <h1 style={inlineStyle}>Hello using inlne style</h1>
    </div>
  )
}

export default Hello
