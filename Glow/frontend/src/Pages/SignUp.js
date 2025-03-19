import "./Credentials.css"; // Importing the styles specific to this page
import Header from './Components/header'; // Importing the Header component
import CredentialsGraphic from './Components/CredentialsGraphic'; // Importing the Sign Up component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

/**
 * SignUp component handles the user registration process.
 * It includes input validation, form submission, and error handling.
 */

export default function SignUp() {
    // State to manage form input data for username, password, and confirm_password
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirm_password: ""
    });

    // State for handling error messages and success feedback
    const [error, setError] = useState("");
    const navigate = useNavigate();

    //Handles form input changes and updates the state
    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //Handles form submission, validating the inputs and making the API request
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/signup/`, {
                username: formData.username,
                password: formData.password,
                confirm_password: formData.confirm_password,
            });
            // Store the authentication token in localStorage
            localStorage.setItem('authToken', response.data.token);
            // Redirect the user to the skincare generator page
            navigate('/skincaregenerator');
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed.");
        }
    };

    return(
        <div className="credentials-body"> 
        <Header />      
        <div className="credentials-layout">
            <CredentialsGraphic />
            <div className = "credentials-form-box">
                <div>
                    <h1>Welcome!</h1>
                    <p className="signup-prompt">Sign up for Glow to save your skincare routines with ease</p>
                </div>
                <form onSubmit={handleSubmit}>  
                    <input className="user-input" type="text" name="username" placeholder="Username" onChange={handleInput} required /><br/>
                    <input className="user-input" type="password" name="password" placeholder="Password" onChange={handleInput} required /><br/>
                    <input className="user-input" type="password" name="confirm_password" placeholder="Re-enter Password" onChange={handleInput} required /><br/>
                    <button className="credentials-button" type="submit">Sign Up</button>
                <div>
                <p className="error-text">{error}</p>
                <p className="switch-page-prompt">Already have an account? <a  className="switch-page-text" href= "Login">Login here</a></p></div>
                <div class="line-text">OR</div>
                <a  className= "credentials-button" href = "SkinCareGenerator">Continue as Guest</a>
            </form>
            </div>
        </div>
        </div>
    );
}