import "./SkinCareGenerator.css";
import "../CSSVariables.css"
import React, { useState } from 'react';
import axios from "axios";

import SkinForm from "./Components/SkinForm";
import Routine from "./Components/routine";
import Header from "./Components/header";

export default function SkinCareGenerator() {
    const [response, setResponse] = useState("");
    const [saveStatus, setSaveStatus] = useState(null);

    const handleSubmit = async (formData) => {
        // Construct the prompt for Gemini based on form data  
        const prompt = `  
        Based on the user's selections, generate a personalized skincare routine.  

        ### User Selections:
        - Skin Type: ${formData.skin_type}
        - Routine Type: ${formData.routine_type}
        - Skin Concerns: ${formData.skin_concerns.join(", ")}
        - Product Criteria: ${formData.product_criteria.join(", ")}
        - Allergies: ${formData.allergies}
        - Skin Conditions: ${formData.skin_conditions}
        - Budget: ${formData.budget}
        - Price Range: ${formData.min_price} - ${formData.max_price}

        ### Expected JSON Format:  
        Return the routine **strictly** in this format:  
        {
        "day": [
            {
            "step": 1,
            "name": "Prudct name",
            "price": "$17.99",
            "application": "steps on how to apply"
            },
            {
            "step": 2,
            "name": "Product name",
            "price": "$25.00",
            "application": "steps on how to apply"
            },
            {
            "step": 3,
            "name": "Product name",
            "price": "$6.00",
            "application": "steps on how to apply"
            }
        ],
        "night": [
            {
            "step": 1,
            "name": "Product name",
            "price": "$17.99",
            "application": "steps on how to apply"
            },
            {
            "step": 2,
            "name": "Product name",
            "price": "$25.00",
            "application": "steps on how to apply"
            },
            {
            "step": 3,
            "name": "The Ordinary Niacinamide 10% + Zinc 1%",
            "price": "$6.00",
            "application": "steps on how to apply"
            }
        ]
        }

        ### Constraints:  
        - **Follow the exact JSON structure** provided above.  
        - **Use the same field names** ("day routine" and "night routine") with lowercase keys.  
        - Each routine must be an **array of objects** with: "step", "name", "price", and "application".
        - If the routine type is only "Day", return an empty array for "night routine" and vice versa. If the routine type is both, provide for both day and night.
        - Do **not** include any extra text, explanations, or formatting outside the JSON response.  
        - The string held in the application field currently with placeholder "steps on how to apply" should be no longer than 400 characters.
        - Do **not** include dollar signs on any price fields.
        `;  


        try {
            const res = await axios.post("http://127.0.0.1:8000/LLMTest/", { prompt });
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
            console.error("Error parsing LLM response:", error);
        }
    };

    const saveRoutine = async () => {
        try {
            if (!response || typeof response !== "object") throw new Error("No response.");

            const res = await axios.post("http://127.0.0.1:8000/SaveRoutine/", response);
            let rawResponse = res.data.response;
            console.log(rawResponse)

            setSaveStatus({ success: true, message: "Routine saved successfully!" });
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
                        <button className="save-routine-button" onClick={saveRoutine}>Save Routine</button>
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