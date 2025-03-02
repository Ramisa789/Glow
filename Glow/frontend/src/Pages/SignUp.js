import "./SignUp.css";
import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
    return(
        <body>       
        <div className="layout">
            <img src= "LoginSignInGraphic.png" className="graphic" alt="Strawberry themed graphics on top of a pink face mask" ></img>
            <div className = "form">
                <h1>Welcome!</h1>
                <p className="signup-prompt">Sign up for Glow to save your skin <br />care routines with ease</p>
                <form>  
                    <input className = "user-input" type="email" id="user_email" placeholder="Username"></input> <br />
                    <input className = "user-input" type="password" id="user_password" placeholder="Password"></input><br />
                    <input className = "user-input" type="password" id="user_confirm_password" placeholder="Re-enter Password"></input><br />
                    <input className = "button" type="submit" value="Sign Up" /> 
                </form>
                <p className="error-text">Passwords do not match!</p>
                <p className="login-prompt">Already have an account? <a href= "Login">Login here</a></p>
                <div class="line-text">OR</div>
                <button className="button">Continue as Guest</button>


            </div>
        </div>
        </body>
    );
}