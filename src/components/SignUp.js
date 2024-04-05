import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [name, setName ] = useState('');
    const [password, setPassword ] = useState('');
    const [email, setEmail ] = useState('');
    const navigate =  useNavigate();

    useEffect (() => {
        const auth = localStorage.getItem('user');
        if(auth) {
            navigate("/home")
        }
    }, [])

    const colledDate = async() => {
        console.log(name,email,password);
        let result = await fetch('http://localhost:4000/signup', {
            method:'post',
            body: JSON.stringify({ name, email, password}),
            headers: {'Content-Type': 'application/json'},
        });
        result = await result.json()
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        
        navigate('/home')

    }

    return (
        <div className="register">
            <h1 > Register</h1>
            <input className="inputBox" type="text"  value={name}  onChange={(e) => setName(e.target.value)} placeholder="Enter your Name"></input>
            <input className="inputBox" type="text" value ={email} onChange={(e) => setEmail(e.target.value)}placeholder="Enter your Email "></input>
            <input className="inputBox" type="password" value={password} onChange={(e) => setPassword(e.target.value)}placeholder="Enter your password"></input>
            <button onClick={colledDate} className="appbutton"type="button">SignUp</button>

        </div>
    )
};

export default SignUp;