// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./Story.css"
import { Avatar } from '@mui/material'
import PropTypes from 'prop-types'

const Story = ({image, profileSrc, title}) => {
  return (
    <div className='story' style={{backgroundImage:`url(${image})`}}>
      <Avatar className = 'storyAvatar' src = {profileSrc}/>
      <h4>{title}</h4>
    </div>
  )
}

Story.propTypes = {
  image: PropTypes.any,
  profileSrc: PropTypes.any,
  title: PropTypes.string.isRequired
}
export default Story
