import "./SignUp.css";
import Header from './Components/header';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUpGraphic from "./Images/LoginSignUpGraphic.png";

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirm_password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.password !== formData.confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/signup/", {
                username: formData.username,
                password: formData.password,
                confirm_password: formData.confirm_password,
            });

            setSuccess(response.data.message);
            navigate('/skincaregenerator');
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed.");
        }
    };

    return (
        <div className="signup-body"> 
            <Header />      
            <div className="signup-layout">
                <div className="signup-image-box">
                    <img src={SignUpGraphic} alt="Strawberry themed graphics on top of a pink face mask" />
                </div>
                <div className="signup-form-box">
                    <h1>Welcome!</h1>
                    <p className="signup-prompt">Sign up for Glow to save your skincare routines with ease</p>
                    
                    <form onSubmit={handleSubmit}>  
                        <input className="user-input" type="text" name="username" placeholder="Username" onChange={handleInput} required /><br/>
                        <input className="user-input" type="password" name="password" placeholder="Password" onChange={handleInput} required /><br/>
                        <input className="user-input" type="password" name="confirm_password" placeholder="Re-enter Password" onChange={handleInput} required /><br/>
                        <button className="signup-button" type="submit">Sign Up</button>
                    </form>

                    <p className="error-text">{error}</p>
                    <p className="login-prompt">
                        Already have an account? <a className="login-text" href="Login">Login here</a>
                    </p>
                    <div className="line-text">OR</div>
                    <a className="signup-button" href="SkinCareGenerator">Continue as Guest</a>
                </div>
            </div>
        </div>
    );
}