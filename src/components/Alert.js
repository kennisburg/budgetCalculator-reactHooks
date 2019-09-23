import React from 'react'
import { type } from 'os'

const Alert = ({type, text}) => {
  return (
    <div className={`alert alert-${type}`}>
      {text}
    </div>
  )
}

export default Alert
