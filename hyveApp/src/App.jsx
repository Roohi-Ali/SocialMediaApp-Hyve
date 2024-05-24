
import './App.css'

import Register from './components/Register'
import Home from './components/Home'
import LoginComponent from './components/LoginComponent'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PageNotFound from './components/PageNotFound'



function App() {

  return (

    <div className='app'> 
        <Router>  
          <Routes>
          <Route path="/" element={ <LoginComponent/> } />
          <Route path="/login" element={<LoginComponent />}/>
          <Route path="/register" element={<Register />} /> 
          <Route path="/home" element={<Home />} />
          
          <Route path="*" element={<PageNotFound />} />  

          </Routes>
        </Router> 
    </div>

  )
}



export default App

{/* <Route path="/" element={ ()=>(!loggedin? <LoginComponent/> : <Home/>  ) } /> */}
{/* <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<Register />} /> */}