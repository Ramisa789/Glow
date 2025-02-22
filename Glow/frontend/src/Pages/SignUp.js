import "./SignUp.css";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed.");
        }
    };

    return(
       <div>
        <h2>Signup</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" onChange={handleInput} required />
            <input type="password" name="password" placeholder="Password" onChange={handleInput} required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleInput} required />
            <button type="submit">Signup</button>
        </form>
       </div>
    );
}