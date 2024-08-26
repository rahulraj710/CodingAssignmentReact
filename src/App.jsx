import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './RecipeList.jsx'
import RecipeDetail from './RecipeDetail.jsx'
// import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Recipe Home</h1>
        </header>
    <Routes>
      <Route path="/" element={<RecipeList />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
    </Routes>
    </div>
  </Router>
  )
}

export default App
