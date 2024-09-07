import { useState } from 'react'
import './App.css'
import "./index.css"
import Header from './Components/Header/Header'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='App'>
       <Header/>  
    </div>
    </>
  )
}

export default App
