import "./SignUp.css";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // reset previous message
        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/signup/", {
                username: formData.username,
                password: formData.password,
                confirm_password: formData.confirmPassword,
            });

            setSuccess(response.data.message);
            // Redirect to generator after successful signup
            navigate('/skincaregenerator')
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed.");
        }
    };

    return(
        <body>       
        <div className="layout">
            <img src= "LoginSignInGraphic.png" className="graphic" alt="Strawberry themed graphics on top of a pink face mask" ></img>
            <div className = "form">
                <h1>Welcome!</h1>
                <p className="signup-prompt">Sign up for Glow to save your skin <br />care routines with ease</p>
                <form>  
                    <input className = "user-input" type="email" id="user_email" placeholder="Username" onChange={handleInput} required></input> <br />
                    <input className = "user-input" type="password" id="user_password" placeholder="Password" onChange={handleInput} required></input><br />
                    <input className = "user-input" type="password" id="user_confirm_password" placeholder="Re-enter Password" onChange={handleInput} required></input><br />
                    <input className = "button" type="submit" value="Sign Up" /> 
                </form>
                <p className="error-text">Passwords do not match!</p>
                <p className="login-prompt">Already have an account? <a  className="login-text"href= "Login">Login here</a></p>
                <div class="line-text">OR</div>
                <a  className= "button" href = "SkinCareGenerator">Continue as Guest</a>


            </div>
        </div>
        </body>
    );
}