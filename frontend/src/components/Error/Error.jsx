import React from 'react';
import Lottie from 'react-lottie';

import classes from './Error.module.scss';
import { NotFound } from '../../animations';

const Error = ({msg, error}) => {
  const NotFoundAnimation =  { 
    loop: false,
    autoPlay: false,
    animationData: NotFound,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}

  return (
    <div className={classes.container}>
        {notFound && <Lottie options={NotFoundAnimation}/>}
        <h2 className={error && classes.error}>{msg}</h2>
    </div>
  )
}

export default Error;