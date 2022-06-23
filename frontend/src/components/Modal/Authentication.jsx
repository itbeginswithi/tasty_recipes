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


    
     
   
      
        
      
    
       
         
  
          
    
  
  

 
        
       
        
    
  
    
  

  


