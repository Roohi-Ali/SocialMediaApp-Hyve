// eslint-disable-next-line no-unused-vars
import React , {useState, useEffect} from 'react'
import Feed from './Feed'
import Header from './Header'
import Sidebar from './Sidebar'
import '../App.css'
import LogOut from './LogOut'
// import { auth } from '../firebase/firebaseConfig'


const Home = () => {
    // const { user, setUser, loggedin, setLoggedin } = useContext(UserContext)
    // const navigate = useNavigate()
    return (
        <div>
            <Header />
            <LogOut/>
            <div className='appBody'>
                <Sidebar />
                <Feed />
            </div>
        </div>
    )
    
}

export default Home
