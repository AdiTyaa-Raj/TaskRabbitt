import React, { useState } from "react";
import axios from 'axios';

const Register = () =>{
    const [usename,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('');

    const handleRegister = async(e) =>{
        try{
            const response = await axios.post('/api/auth/register',{username,email,password});
            setMessage(response.data);

        }catch(err){
            setMessage(err.response.data);
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value) } required/>
                <input type="email" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value) } required/>
                <input type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value) } required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
