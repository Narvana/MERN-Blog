import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {About,Home,Signin,Signup,Dashboard,Projects} from './pages/Index'

function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/signin" element={<Signin />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/project" element={<Projects />}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
