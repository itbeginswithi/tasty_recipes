import React from 'react'

import classes from './Error.module.scss'

const Error = ({msg, error}) => {
  return (
    <div className={classes.container}>
        <h2 className={error && classes.error}>{msg}</h2>
    </div>
  )
}

export default Error;