import { React, useState, useEffect } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
    const navigate = useNavigate();

    useEffect(()=>{
       sessionStorage.clear();
    },[])

    const [credentials, setcredentials] = useState({
        userName: "",
        password: ""
    })

    const handlecredentials = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handlelogin = async () => {
        if (credentials.userName === "" || credentials.password === "") {
            alert("Please Enter Your Credentials")
        } else {
            try {
                const response = await axios.post(`https://server-aanyagreens.onrender.com/login`, credentials)
                const recieved_token = response.data;
               
                    sessionStorage.setItem('token',recieved_token)
                    navigate('/dashboard')
                
            } catch (err) {
                if (err.response.status === 404) {
                    alert(err.response.data.error)
                } else {
                    alert("Something Went Wrong , Contact Your Developer")
                }
            }
        }
    }


    return (
        <>
            <div className="Nav"><img src="./assets/logo3-golden.png" alt="" /></div>

            <div className="logInCard">

                <div className="cardHeading">Admin Portal</div>

                <div className="userName">
                    <label htmlFor="userName">UserName : </label>
                    <input onChange={handlecredentials} type="text" name="userName" value={credentials.userName} />
                </div>
                <div className="password">
                    <label htmlFor="password">Password : </label>
                    <input onChange={handlecredentials} type="text" name="password" value={credentials.password} />
                </div>
                <button id="btn" onClick={handlelogin} >Log In</button>

            </div>
        </>

    )
}
