// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useState, useEffect } from 'react'
//import Paginate from './Paginate'


import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { getAllFriends } from '../firebase/firebaseConfig'
import { Avatar } from '@mui/material'
import './ViewFriends.css'

const ViewFriends = () => {



    const [friends, setFriends] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = friends.slice(firstIndex, lastIndex)
    const npage = Math.ceil(friends.length / recordsPerPage)



    useEffect(() => {
        getAllFriends()
            .then((data) => { setFriends(data) })
    }, [])

    //const paginate = (pageNumber)=> setCurrentPage(pageNumber)

    const handleChange = (event, value) => {
        setCurrentPage(value)
    }
    return (

        <div>
            <h1>List of all Friends in Hyve Network</h1>
            <br />
            <div className="tableContainer">
                <table>
                    <thead>
                        <tr><th>Avatar</th><th>Display Name</th><th>Email address</th></tr>
                    </thead>
                    <tbody>
                        {records.map((el, index) => {
                            return (
                                <tr key={index}>
                                    <td><Avatar src={el.photoURL} /></td>
                                    <td>{el.displayName}</td>
                                    <td>{el.email}</td>
                                </tr>)
                        })}
                    </tbody>
                </table>
                {/* <Paginate itemsPerPage={recordsPerPage} totalItems={friends.length} paginate={paginate}/> */}


                <Stack spacing={2}>

                    <Pagination count={npage} onChange={handleChange} />
                </Stack>
            </div>


        </div>
    )
}

export default ViewFriends
