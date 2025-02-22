import "./Login.css";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const credentials = { username, password };
        axios.post('http://127.0.0.1:8000/login/', credentials)
            .then(response => setMessage(response.data.message))
            .catch(error => setMessage(error.response.data.message));
    };

    return(
       <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <p>{message}</p>
        </form>
       </div>
    );
}