import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
const Login=()=>{
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();
    //so it will not navigate to /login after login in 
    useEffect(() => {
        const auth=localStorage.getItem('user');
        if(auth){
        navigate('/');}
      }, [])
      const handlelogin = async () => {
      
           
        //integrate signup api in react 
        let result = await fetch("http://localhost:5000/register", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',  // Include credentials in the request
        });

       
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result.result))
        // localStorage.setItem("token",JSON.stringify(result.auth))
        navigate('/')//if you want to redirect it to home page
    } 

 
      
    // if(result.auth){
    //       localStorage.setItem('user',JSON.stringify(result.user));
    //       localStorage.setItem('token',JSON.stringify(result.auth));
    //       navigate("/")
    // }
    // else{
    //     alert("please enter correct details")
    // }
    
    return(
        <div className="login">
            <h1 >Login</h1>
            <input className="inputBox"type="text" placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input className="inputBox"type="password" placeholder="enter password"value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={handlelogin} className="appButton" type="button" >Login</button>
        </div>
    )
}
export default Login;