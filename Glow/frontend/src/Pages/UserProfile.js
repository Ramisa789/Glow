import "./UserProfile.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import renderRoutine from "./Components/routine_rendering.js"


export default function UserProfile() {
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchRoutines = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/GetRoutine/");

            let rawResponse = res.data.response;
            console.log(rawResponse)
    
            // Extract actual JSON from response (removing triple backticks)
            let jsonString = rawResponse.replace(/```json|```/g, "").trim();
    
            // Parse JSON
            let parsedResponse = JSON.parse(jsonString);
            console.log(parsedResponse);
            
            // Update state with parsed response
            setResponse(parsedResponse);
        } catch (error) {
            console.error("Error fetching routine:", error);
            setError(error)
        }
        setLoading(false);
    }; 

    useEffect(() => {
        fetchRoutines();
    }, []);

    if (error) return <div>Failed to load routines.</div>;
    if (loading) return <div>Loading routines...</div>;

    return(
       <div>
        {renderRoutine(response)}
       </div>
    );
}