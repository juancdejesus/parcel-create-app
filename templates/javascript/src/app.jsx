import React, { useState } from 'react'
import { Button } from 'antd'

export default function App() {
  
  const [counter, setCounter] = useState(0);
  
  const handleClick = () => {
    setCounter(counter + 1);
  }

  return (
    <>
      <div>Hello, React-Parcel JavaScript Template!</div>
      
      <p>
        <Button type="primary" onClick={handleClick}>Click me</Button>
      </p>
      <p>
        Clicks: {counter}
      </p>

    </>
    
  )
}