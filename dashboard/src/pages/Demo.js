import React, { useState } from 'react'

const Demo = () => {    
    const [color, setColor] = useState("");

  return (
    <div>
      <h1>My favorite color is {color}</h1>
      <button type='button' onClick={() => setColor("blue")}>blue</button>
    </div>
  )
}

export default Demo
