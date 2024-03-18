import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {About,Home,Signin,Signup,Dashboard,Projects} from './pages/Index'
import {Header,Footer} from './component/Index'

function App() {

  return (
    <BrowserRouter>
    <Header/>
     <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/signin" element={<Signin />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/project" element={<Projects />}/>
     </Routes>
     <Footer/>
    </BrowserRouter>
  )
}

export default App
