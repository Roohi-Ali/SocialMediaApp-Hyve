// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import UserContext from './UserContext'
import PropTypes from 'prop-types'

const UserContextProvider = ({children})=>{

    // const [user, setUser] = useState({});
    const [loggedin, setLoggedin] = useState(false)
    return(
    <UserContext.Provider value={{loggedin, setLoggedin}}>
        {children}
    </UserContext.Provider>
    )

}
UserContextProvider.propTypes = {
    children: PropTypes.any
  }
export default UserContextProvider;