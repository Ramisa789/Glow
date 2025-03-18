import "./SkinCareGenerator.css";
import "../CSSVariables.css"
import React, { useState, useEffect } from 'react';
import axios from "axios";

import SkinForm from "./Components/SkinForm";
import Routine from "./Components/routine";
import Header from "./Components/header";

export default function SkinCareGenerator() {
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

    const saveRoutine = async () => {
        try {
            if (!response || typeof response !== "object") throw new Error("No response.");

            const token = localStorage.getItem("authToken");
            if (!token) {
                setSaveStatus({ success: false, message: "Authentication required. Please log in." });
                return;
            }

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