import "./Credentials.css";
import Header from './Components/header';
import CredentialsGraphic from './Components/CredentialsGraphic';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const credentials = { username, password };
        axios.post('http://127.0.0.1:8000/login/', credentials)
            .then(response => {
                setMessage(response.data.message);
                // Redirect on successful login
                if (response.data.message === "Login successful!") {
                    navigate('/skincaregenerator');
                }
            })
            .catch(error => setMessage(error.response.data.message));
    };

    return(
        <body>
        <Header/>
       <div className="credentials-layout">
            <CredentialsGraphic />
            <div className="credentials-form-box">
                <h1>Welcome Back!</h1>
                <br />
                <br />
                <form onSubmit={handleSubmit}>
                    <input
                        className="user-input"
                        type="email"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br />
                    <input
                        className="user-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button className="credentials-button" type="submit">Login</button>
                    {/* <p>{message}</p>  */}
                    <p className="error-text">Incorrect Credentials! Please try again</p>
                    <p className="switch-page-prompt">Don't have an account? <a  className="switch-page-text"href= "SignUp">Sign-up here</a></p>
                    <div class="line-text">OR</div>
                <a  className= "credentials-button" href = "SkinCareGenerator">Continue as Guest</a>
                </form>
            </div>
       </div>
       </body>
    );
}