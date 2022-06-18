import React from 'react';
import Lottie from 'react-lottie';

import classes from './Error.module.scss';
import { NotFound, noRecordsFound, ServerError } from '../../animations';

const Error = ({msg, error, notFound, serverError}) => {
  const ServerErrorAnimation =  { 
    loop: true,
    autoPlay: true,
    animationData: ServerError,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const NotFoundAnimation =  { 
    loop: true,
    autoPlay: true,
    animationData: NotFound,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const NoRecordsFoundAnimation =  { 
    loop: false,
    autoPlay: true,
    animationData: noRecordsFound,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div className={classes.container}>
        {serverError && !notFound &&
          <Lottie 
            options={ServerErrorAnimation} 
            isClickToPauseDisabled={true}
            width="auto" 
            height="auto"
          />
        }
        {!notFound && !serverError &&
          <Lottie 
            options={NotFoundAnimation} 
            isClickToPauseDisabled={true}
            width="auto" 
            height="auto"
          />
        }
        {notFound && noRecordsFound && !serverError &&
          <Lottie 
            options={NoRecordsFoundAnimation} 
            isClickToPauseDisabled={true}
            width="auto" 
            height="auto"
          />
        }
        <h2 className={error && classes.error}>{msg}</h2>
    </div>
  )
}

export default Error;