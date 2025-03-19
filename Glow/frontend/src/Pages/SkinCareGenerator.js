import "./SkinCareGenerator.css"; // Importing the styles specific to this page
import "../CSSVariables.css" // Importing the styles specific to this page
import React, { useState, useEffect } from 'react';
import axios from "axios";
import SkinForm from "./Components/SkinForm"; // Importing the Skin Form component
import Routine from "./Components/routine"; // Importing the Routine component
import Header from "./Components/header"; // Importing the Header component

/**
 * SkinCareGenerator Component
 * This component allows users to generate a customized skincare routine 
 * based on input data. It interacts with the backend API including the LLM(Gemini) to generate the routine.
 */

export default function SkinCareGenerator() {
    // States to hold response and manage status of the routine
    const [response, setResponse] = useState("");
    const [saveStatus, setSaveStatus] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    }, []);

    const handleSubmit = async (formData) => {
        // Construct the prompt for Gemini based on form data  

        try {
            const res = await axios.post("http://127.0.0.1:8000/generate/", { formData });
            let rawResponse = res.data.response;

            // Parse JSON
            let parsedResponse = JSON.parse(rawResponse);
            
            // Update state with parsed response
            setResponse(parsedResponse);
        } catch (error) {
            console.error("Error parsing LLM response:", error);
        }
    };
    
    // Function to save the generated skincare routine to the backend (only for authenticated users)
    const saveRoutine = async () => {
        try {
            if (!response || typeof response !== "object") throw new Error("No response.");

            const token = localStorage.getItem("authToken");
            if (!token) {
                setSaveStatus({ success: false, message: "Authentication required. Please log in." });
                return;
            }

             // Send the generated skincare routine to the backend for saving
            const res = await axios.post(
                "http://127.0.0.1:8000/SaveRoutine/",
                response,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )

            setSaveStatus({ success: true, message: res.data.message });
        } catch (error) {
            console.error("Error saving routine:", error);
            // Display an error message if the routine couldn't be saved
            setSaveStatus({ success: false, message: "Failed to save routine. Please try again." });
        }
    }

    return(
        <div>
            <Header />
            <div className="generator-container">
                <div className="widthContainer">
                    <div className="generator-header">Skin-Care Generator</div>
                    <div className="formContainer"><SkinForm onSubmit={handleSubmit} /></div>
                    <div className="response-container">
                        {response ? (
                            <Routine 
                                day={response.day}
                                night={response.night}
                                page="generator"
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="save-button-container">
                        {isAuthenticated && response && (
                            <button className="save-routine-button" onClick={saveRoutine}>Save Routine</button>
                        )}
                        
                        {saveStatus && (
                            <div className={`save-message ${saveStatus.success ? "success" : "error"}`}>
                                {saveStatus.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
       </div>
    );
}