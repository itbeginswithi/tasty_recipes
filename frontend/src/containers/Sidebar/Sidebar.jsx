import React, {useEffect, useState} from 'react'
import Lottie from 'react-lottie';
// import { MdDelete } from "react-icons/md";
// import { MdOutlineContentCopy } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";


import classes from './Sidebar.module.scss';
// import { useBookmarkContext } from '../../context/contextProvider';
import noDataAnimation from '../../animations/89841-no-records-found.json';
import './keyframes.scss';

const Sidebar = ({isOpen, setIsOpen}) => {
  // const {toggleFav, increment, advice} = useBookmarkContext();
  const [favourites, setFavourites] = useState([]);

  // useEffect(() =>{
  //   setFavourites(JSON.parse(localStorage.getItem('advices')));
  // }, [increment])

  const animationOptions = { 
    loop: false,
    autoPlay: true,
    animationData: noDataAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
      <div className={classes.container}>
        <button className={classes.close} type="button" onClick={() => setIsOpen(false)}><FiChevronRight/></button>
        <div className={classes.sidebar__container}>
          <ul className={classes.sidebar}>
            {
              favourites.map((advice, index) => (
                <li className={classes.advice} key={index}>
                     {/* Recipe Div Goes Here */}
                </li>
              ))
            }

            {/* Display a lottie animation if no advice is saved */}
            {!favourites.length &&  (
                <div style={{height: '100%' ,display: 'flex', justifyContent: 'center', alignItems: "center"}}> 
                  <Lottie  options={animationOptions} width={'25rem'} height="auto"/>
                </div>
              )
            }
          </ul>
        </div>
      </div>
  )
}

export default Sidebar