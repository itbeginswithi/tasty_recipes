<<<<<<< HEAD
import React ,{ useState }from 'react';
import './././Authentication.scss';
import {Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { setShowModal1,setIsSignedIn } from '../../store/authenticationSlice';


const Authentication = () => {
  const [email, setEmail] = useState("");
     const [password, setPassword] = useState("")
     const dispatch = useDispatch();
      const navigate = useNavigate();
      const toggleAuthModal1 = (state) => dispatch(setShowModal1(state));
      const [error, setError] = useState("");

    

     const input2 = {
      marginTop: "20px"
      }
      const input3 = {
          marginTop: "20px"
          }
          const button1 = {
              backgroundColor:"#373737", 
              color: "white",
              width: "300px",
              height:"40px",
              marginTop: "30px",
              
          }
          const btn1 = {
            backgroundColor:"#373737", 
              color: "white",
              width: "300px",
              height:"40px",
              marginTop: "30px",
              borderRadius: "4PX"
          }        
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/app/login' , {
      email: email,
      password: password
    })
    .then(res => {
      if(res.data.error){
        setError(res.data.error);
       
       
      }
      else{
        setError("");
        setEmail("");
        setPassword("");
        toggleAuthModal1(false);
        // navigate();
        dispatch(setIsSignedIn(true));
        console.log(res.data);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('userId', res.data._id);
        
        
       
    
        
        
      }
    })
    .catch(err => {
      console.log(err);
      
      setError("Invalid email or password");
     
     

    
    }
    
    )
  }

  return (
    <div id="hamid">
      <div id="canvas1">
      	</div>
      	<div id="canvas2"  >
      		<div class="title1">
          <form onSubmit={handleSubmit}>
          <div >
           
           </div>
              <h1>LOGIN</h1>
              <div ><h2 value={error} 
              onChange={(e) => setError(e.target.value)}
              style={{ color: "red" }}>{error}</h2>
              </div> 
              
              
            <input     style={input2} id="input2" type="email"  name="email" placeholder="E-MAIL" class="imgEmail"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             />
             <input  style={input3} id="input3" type="password" name="PASS" placeholder="PASSWORD"  class="imgPASS"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
            />
          <input id="btn1"  style={btn1} type="submit"  value='LOGIN'    /><br></br>
          
          <a> <Link to={'/Signup'} ><h1>you don't have account. sign up</h1> </Link>
          </a>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Authentication;


    
     
   
      
        
      
    
       
         
  
          
    
  
  

 
        
       
        
    
  
    
  

  


=======
import React, { useState } from 'react';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';

import classes from './Authentication.module.scss';
import {images} from '../../images';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSignedIn, setModalIsOpen, setSignupForm } from '../../store/authSlice';
import { authLogin, authSignup } from '../../api/auth';

const InputField = ({value, setValue, name, label, type, error}) => (
  <div className={classes.input_container}>
    <label htmlFor={name}>{label}</label>
    <input 
      type={type} 
      id={name} 
      className={classes.input} 
      placeholder={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}/>
    
    {
      error && (
        <p className={classes.error}>{error}</p>
      ) 
    }
  </div>
)

const Auth = () => {
  const {signupForm} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // const [isSignup, setIsSignup] = useState(true);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isLoading, setIsLoading] = useState('');
  
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [matchingError, setMatchingError] = useState('');
  const [error, setError] = useState('');

  const signUp = async (e) => {
    e.preventDefault()

    if(email === '' || password === '' || repeatPassword === '' || username === '') {
      setError('Input Fields shouldn\'t be empty');
      return;
    }
    
    setError('');
    
    if(password !== repeatPassword) {
      setMatchingError('Passwords don\'t match');
      return;
    }
    
    if(password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    setMatchingError('');
    setPasswordError('');
    setIsLoading(true);
    
    const res = await authSignup({username, email, password});
    setIsLoading(false);
    
    if(res.data.error){
      setError(res.data.error);
      alert("Invalid email or password");
    }
    else{
      setEmail('');
      setPassword('');
      setUsername('');
      dispatch(signupForm(false));
    }
  }

  
  const login = async (e) => {
    e.preventDefault()
    
    if(email === '' || password === '') {
      setError('Input Fields shouldn\'t be empty');
    }else{
      setError('');
    }
    
    if(password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    }else{
      setPasswordError('');
    }
    
    setIsLoading(true);
    const userObj = await authLogin({email, password});
    setIsLoading(false);
    if(userObj.message) return setError('Email or password is incorrect');

    setError('');

    localStorage.setItem('username', userObj.username);
    localStorage.setItem('userId', userObj._id);
    dispatch(setIsSignedIn(true));
    dispatch(setModalIsOpen(false));
  }

  return (
    <div className={classes.auth}>
        <div className={classes.auth__backdrop} onClick={() => dispatch(setModalIsOpen(false))}/>
        <div className={classes.auth__container}>
          <img src={images.favIcon} alt="Herushī favicon" draggable="false"/>
          <div className={classes.auth__form}>
            {
              signupForm && 
              (
                <InputField 
                  value={username} 
                  setValue={setUsername} 
                  name="Username" 
                  label="Username" 
                  type="text"
                  error={usernameError}
                />
              )
            }
            <InputField 
              value={email} 
              setValue={setEmail} 
              name="Email" 
              label="Email" 
              type="email"
              error={emailError}
            />
            <InputField 
              value={password} 
              setValue={setPassword} 
              name="Password" 
              label="Password" 
              type="password"
              error={passwordError}
            />

            {
              signupForm &&
              (
                <InputField 
                  value={repeatPassword} 
                  setValue={setRepeatPassword}  
                  name="repeatPassword" 
                  label="Repeat Password" 
                  type="password"
                  error={matchingError}
                />
              )
            }

            {
              error && (
                <p className={`${classes.error} ${classes.limitedWidth}`}>{error}</p>
              )
            }
          </div>   
          <div className={classes.auth__actions}>
            <button 
              type="submit" 
              onClick={signupForm ? signUp : login}>
                {signupForm ? 'Sign Up' : 'Login'}
                {isLoading && <AiOutlineLoading3Quarters/>}
            </button>
            <div>
              {
                signupForm ? 
                  (<span href onClick={() => dispatch(setSignupForm(false))}>Already have an account? login!</span>)
                : 
                  (<span href onClick={() => dispatch(setSignupForm(true))}>Don't have an account? Sign up!</span>)
              }
            </div>
          </div>
        </div>
    </div>
  )
}

export default Auth
>>>>>>> f940dcf79733de21b0438a1d07223bc26e408e93
