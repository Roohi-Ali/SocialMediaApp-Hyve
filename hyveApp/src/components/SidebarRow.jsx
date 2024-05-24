// eslint-disable-next-line no-unused-vars
import React from 'react'
import './SidebarRow.css'
import PropTypes from 'prop-types'
import { Avatar } from '@mui/material';

const SidebarRow = ( {src, Icon, title} ) => {
  return (
    <div className='sidebarRow'>
        {src && <Avatar src = {src}/>}
        {Icon && <Icon/>}
      <h4>{title}</h4>
    </div>
  )
}

SidebarRow.propTypes = {
    src: PropTypes.any,
    Icon: PropTypes.any,
    title: PropTypes.string
}

export default SidebarRow
