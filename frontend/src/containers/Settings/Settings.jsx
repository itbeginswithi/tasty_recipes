import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdOutlineDone } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authUpdatePassword } from '../../api/auth';

import classes from './Settigns.module.scss';

const Settings = () => {
  const {isSignedIn} = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [curPassword, setCurPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [secondNewPassword, setSecondNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [cpError, setCPError] = useState([]);
  const [npError, setNPError] = useState([]);

  useEffect(() => {
    if(isSuccessful) {
      setTimeout(() => setIsSuccessful(false), 3000);
    }
  }, [isSuccessful])

  const updatePassword = async () => {
    //*Check if cur Password is right
    
    //New Password checks
    if(!curPassword.length){
      const errorMessage = cpError.find(error => error === 'Password input shouldn\'t be empty');
      if(errorMessage === undefined){
        setCPError(prevState => [...prevState, 'Password input shouldn\'t be empty']);
      }
    }else{
      const errorMessage = cpError.find(error => error === 'Password input shouldn\'t be empty');
      if(errorMessage){
        setCPError(prevState => prevState.filter(err => err !== 'Password input shouldn\'t be empty'));
      }
    }

    if(!newPassword.length){
      const errorMessage = npError.find(error => error === 'Password input shouldn\'t be empty');
      if(errorMessage === undefined){
        setNPError(prevState => [...prevState, 'Password input shouldn\'t be empty']);
      }

      return;
    }else{
      const errorMessage = npError.find(error => error === 'Password input shouldn\'t be empty');
      if(errorMessage){
        setNPError(prevState => prevState.filter(err => err !== 'Password input shouldn\'t be empty'));
      }
    }
    
    if(newPassword.length < 6){
      const errorMessage = npError.find(error => error === 'New Password must be at least 6 characters long');
      if(errorMessage === undefined){
        setNPError(prevState => [...prevState, 'New Password must be at least 6 characters long']);
      }
      return;
    }else{
      const errorMessage = npError.find(error => error === 'New Password must be at least 6 characters long');
      if(errorMessage){
        setNPError(prevState => prevState.filter(err => err !== 'New Password must be at least 6 characters long'));
      }
    }
    
    if(newPassword !== secondNewPassword){
      const errorMessage = npError.find(error => error === 'Passwords don\'t match');
      if(errorMessage === undefined){
        setNPError(prevState => [...prevState, 'Passwords don\'t match']);
      }
      return;
    }else{
      const errorMessage = npError.find(error => error === 'Passwords don\'t match');
      if(errorMessage){
        setNPError(prevState => prevState.filter(err => err !== 'Passwords don\'t match'));
      }
    }

    setIsLoading(true);

    // clean Errors
    setNPError([]);
    setCPError([]);
    
    //Send data to the database
    const userId = localStorage.getItem('userId');
    const response = await authUpdatePassword({userId, password: curPassword, newPassword});
    
    setIsLoading(false);
    
    if(response.message){
      const errors = cpError;
      errors.push('Current password is incorrect');
      setCPError(errors);
      return;
    }
    
    // return error if any
    //clean inputs if successful
    setIsSuccessful(true);
    setCPError([]);
    setCurPassword('');
    setNewPassword('');
    setSecondNewPassword('');
  }

  if(!isSignedIn) return navigate('/');

  return (
    <div className={classes.container}>
      <h1>Settings</h1>
      <div className={classes.form}>
        <h3>Update Password</h3>
        <div className={classes.input_container}>
          <label htmlFor="curPassword">Current Password</label>
          <input 
            type="password" 
            id="curPassword" 
            className={classes.input} 
            placeholder="Current Password"
            value={curPassword}
            onChange={(e) => setCurPassword(e.target.value)}/>
          
          {
            cpError.length > 0   && (
              cpError.map((error, i) => (
               <p className={classes.error} key={i}>{error}</p>
              ))
            ) 
          }
        </div>
     
        <div className={classes.input_container}>
          <label htmlFor="newPassword">New Password</label>
          <input 
            type="password" 
            id="newPassword" 
            className={classes.input} 
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input 
            type="password" 
            className={classes.input} 
            placeholder="Repeat New password"
            value={secondNewPassword}
            onChange={(e) => setSecondNewPassword(e.target.value)}
          />
          
          {
            npError.length > 0   && (
              npError.map((error, i) => (
                <p className={classes.error} key={i}>{error}</p>
              ))
            ) 
          }
        </div>

        <button className={classes.btn} onClick={() => updatePassword()}>
          Update
          {isLoading && <AiOutlineLoading3Quarters className={`${classes.btn__icon} ${classes.btn__loadingIcon}`}/>}
          {isSuccessful && <MdOutlineDone className={classes.btn__icon}/>}
        </button>
      </div>
    </div>
  )
}

export default Settings