import './App.css';
import React, {useState, useEffect} from 'react'

function App() {

  const [result, setResult] = useState()

  useEffect(() => {
      fetch('/classes').then(
        res => res.json()
      ).then(
        result => {
          setResult(result['South Campus'])
          console.log(result)
        }
      )
  }, [])

  return (
    <>
    {result}
    </>
  )
}

export default App
