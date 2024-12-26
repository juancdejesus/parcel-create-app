import React, { useState } from 'react'
import { Button } from 'antd'

type Props = {}

export default function App({}: Props) {
  
  const [counter, setCounter] = useState(0);
  
  const handleClick = () => {
    setCounter(counter + 1);
  }

  return (
    <>
      <div>Hello, React-Parcel TypeScript Template!</div>
      <p>
        <Button type="primary" onClick={handleClick}>Click me</Button>
      </p>
      <p>
        Clicks: {counter}
      </p>

    </>
    
  )
}