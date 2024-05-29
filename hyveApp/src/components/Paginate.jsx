
import React from 'react'
import PropTypes from 'prop-types';


const Paginate = ({itemsPerPage, totalItems, paginate}) => {

    
    const pageNumbers = []
    for (let i=1; i<= Math.ceil(totalItems/itemsPerPage); i++){
        pageNumbers.push(i)
    }
  return (
    <div>
      <nav>
        <ul>
            {pageNumbers.map((num, index)=>(
                <li key={index}>
                    <a onClick={()=>paginate(num)} >
                        {num}
                    </a>
                </li>
            ))}
        </ul>
      </nav>
    </div>
  )
}


Paginate.propTypes = {
    itemsPerPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    paginate: PropTypes.func
  }

export default Paginate
