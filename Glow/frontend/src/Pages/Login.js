import "./Credentials.css"; // Importing the styles specific to this page
import Header from './Components/header'; // Importing the Header component
import CredentialsGraphic from './Components/CredentialsGraphic';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * Login Component
 * This component provides a login form where users can enter their credentials.
 * It manages username and password inputs, handles form submission via an API request,
 * and provides navigation upon successful authentication.
 */

export default function Login() {
    // State variables for storing user input
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // Stores feedback message (e.g., errors, success messages)
    
    const navigate = useNavigate();

    /**
     * Handles form submission
     * Sends a login request to the backend and handles the response.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents page reload on form submission

        const credentials = { username, password };

        axios.post('http://127.0.0.1:8000/login/', credentials) // Sending credentials to backend
            .then(response => {
                setMessage(response.data.message); // Display response message
                
                // Redirect on successful login
                if (response.data.message === "Login successful!") {
                    localStorage.setItem('authToken', response.data.token);
                    navigate('/skincaregenerator');
                }
            })
            .catch(error => setMessage(error.response.data.message));
    };

    return(
        <div>
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
                        type="text"
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
                    <p className="error-text">{message}</p>
                    <p className="switch-page-prompt">Don't have an account? <a  className="switch-page-text"href= "SignUp">Sign-up here</a></p>
                    <div class="line-text">OR</div>
                    <a  className= "credentials-button" href = "SkinCareGenerator">Continue as Guest</a>
                </form>
            </div>
       </div>
       </div>
    );
}