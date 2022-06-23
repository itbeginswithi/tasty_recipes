
import React,{useState} from 'react';
import './././Authentication.scss';
 import { useDispatch } from 'react-redux';
 import {Link} from 'react-router-dom';
import axios from 'axios';
import { setShowModal,setIsSignedIn } from '../../store/authSlice';

 const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const dispatch = useDispatch();
   const toggleAuthModal = (state) => dispatch(setShowModal(state));
   const [error, setError] = useState("");
  function validateForm() {

    return email.length > 0 && password.length > 0 && username.length > 0;
  }
  const handleSubmit = (e) => { 
     e.preventDefault();
    axios.post('http://localhost:3000/app/up' , {
      email: email,
      password: password,
      username: username
    })
    .then(res => {
      if(res.data.error){
        setError(res.data.error);
        alert("Invalid email or password");
      }
      else{
        setEmail("");
        setPassword("");
        setUsername("");
        alert("Signup Successful");
        toggleAuthModal(false);
        dispatch(setIsSignedIn(true));
        console.log(res.data);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('userId', res.data._id);
      }
    })
  }
  const button2 = {
    marginTop: "30px",
    color: "#373737",
    height:"40px",
    width:"280px",
    borderRadius: "30PX"
  }
 



  return (
    <div id="hamid" >
    <div id="canvas1" >
        </div>
        <div id="canvas2" >
            <div className='title1' >
          <h1>REGISTER</h1> 
         <form onSubmit={handleSubmit}>
           
          <input id="input1" type="text" name="nomUser" placeholder="Username"  className='imgcompte'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
          <input id="input2" type="email" name="email" placeholder="E-MAIL" className='imgEmail'
             value={email}
             onChange={(e) => setEmail(e.target.value)}
           />
           <input id="input3" type="password" name="PASS" placeholder="Password"  className='imgPASS' 
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           />
          <input id="button1" type="submit"  value='ENREGISTRER'  disabled={!validateForm()}   /><br></br>
           <a> <Link to={'/Login'} ><h1>you have account. login</h1> </Link>  
         </a>
         
         </form>
          </div>
        
        </div>
        </div>
        
        
);
} 

export default SignUp;
