import "./Login.css";
import React from 'react';
import { Link, userNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUp from "./Signup";

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