import React , {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
 

const Login = () => {
    const [email, setEmail] = useState('')
    const [password , setPassword] = useState('')
    const navigate = useNavigate();

    useEffect (() => {
        const auth = localStorage.getItem('user');
        if(auth) {
            navigate("/home")
        }
    }, [])

    const handleLogin = async() => {
            console.log(email, password);
            let result = await  fetch("http://localhost:4000/login", {
                method: 'post',
                body: JSON.stringify({email,password}),
                headers: {'Content-Type': 'application/json'}
            });

            result = await result.json();
            if(result.auth) {
                localStorage.setItem("user", JSON.stringify(result.user));
                localStorage.setItem("token", JSON.stringify(result.auth));

                navigate("/home")
            }
            else{
                alert("User Not Found")
            }
            console.log(result);
    }
    return(
        <div className="login">
            <h1>Login</h1>
            <input className="inputBox" type="text" placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)} value={email}></input>
            <input className="inputBox" type="password" placeholder="Enter password" 
            onChange={(e) => setPassword(e.target.value)} value={password}></input>
            <button  onClick={handleLogin} className="appbutton"type="button">Login</button>

        </div>
    )
};

export default Login;