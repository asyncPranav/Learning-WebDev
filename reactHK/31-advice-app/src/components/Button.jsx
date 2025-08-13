import React from 'react'

function Button({handleButton}) {
  return (
    <div className='button'>
      <button onClick={handleButton}>Get new advice</button>
    </div>
  )
}

export default Button;