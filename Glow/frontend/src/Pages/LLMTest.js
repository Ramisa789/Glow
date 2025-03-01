// import React, { useState } from 'react';
// import axios from 'axios';

// export default function LLMTest() {
//     const [prompt, setPrompt] = useState("");
//     const [response, setResponse] = useState("");

//     const handleSubmit = async () => {
//         const res = await axios.post("http://127.0.0.1:8000/generate/", { prompt });
//         setResponse(res.data.response);
//     };

//     return (
//         <div>
//             <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask Gemini..." />
//             <button onClick={handleSubmit}>Send</button>
//             <p>Response: {response}</p>
//         </div>
//     );
// }


import React, { useState } from "react";
import axios from "axios";

export default function LLMTest() {
    const [formData, setFormData] = useState({
        skin_type: "Combination",
        routine_type: "Day",
        skin_concerns: [],
        product_criteria: [],
        allergies: "",
        skin_conditions: "",
        budget: "Medium",
        min_price: "",
        max_price: ""
    });

    const [response, setResponse] = useState("");

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: checked
                ? [...prev[name], value]
                : prev[name].filter((v) => v !== value),
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
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
        "day routine": [
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
        "night routine": [
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

    const renderResponse = () => {
        if (!response || typeof response !== "object") return <p>No routine found.</p>;
    
        // Check which routine type is available
        const dayRoutine = response["day routine"];
        const nightRoutine = response["night routine"];
    
        // Determine what to display based on availability
        if ((!dayRoutine || dayRoutine.length === 0) && (!nightRoutine || nightRoutine.length === 0)) {
            return <p>No routine available.</p>;
        }
    
        return (
            <div>
                {dayRoutine && dayRoutine.length > 0 && (
                    <>
                        <h3>Day Routine - Products and Prices:</h3>
                        {dayRoutine.map((step) => (
                            <div key={step.step}>
                                <p><strong>Step {step.step}: {step.name}</strong></p>
                                <p>Price: {step.price}</p>
                                <p><strong>How to Apply:</strong> {step.application}</p>
                            </div>
                        ))}
                    </>
                )}
    
                {nightRoutine && nightRoutine.length > 0 && (
                    <>
                        <h3>Night Routine - Products and Prices:</h3>
                        {nightRoutine.map((step) => (
                            <div key={step.step}>
                                <p><strong>Step {step.step}: {step.name}</strong></p>
                                <p>Price: {step.price}</p>
                                <p><strong>How to Apply:</strong> {step.application}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        );
    };    

    return (
        <div>
            <h2>Skincare Routine Generator</h2>

            <h3>Allergies</h3>
            <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                placeholder="List any allergies (e.g., nuts, fragrance)"
            />

            <h3>Skin Conditions</h3>
            <input
                type="text"
                name="skin_conditions"
                value={formData.skin_conditions}
                onChange={handleInputChange}
                placeholder="List any skin conditions (e.g., eczema, rosacea)"
            />

            <label>Skin Type:</label>
            <select
                name="skin_type"
                value={formData.skin_type}
                onChange={handleInputChange}
            >
                <option>Combination</option>
                <option>Oily</option>
                <option>Dry</option>
            </select>

            <label>Routine Type:</label>
            <select
                name="routine_type"
                value={formData.routine_type}
                onChange={handleInputChange}
            >
                <option>Day</option>
                <option>Night</option>
                <option>Both</option>
            </select>

            <h3>Skin Concerns</h3>
            {[
                "Acne", "Enlarged Pores", "Loss of Firmness", "Dark Circles", "Hyperpigmentation",
                "Congested Skin", "Sun Damage", "Puffy Eyes", "Dehydrated", "Redness",
                "Scarring", "Aging", "Textured", "Wrinkles", "Sensitive"
            ].map((concern) => (
                <label key={concern}>
                    <input type="checkbox" name="skin_concerns" value={concern} onChange={handleCheckboxChange} />
                    {concern}
                </label>
            ))}

            <h3>Product Preferences</h3>
            {["Fragrance-Free", "Alcohol-Free", "Paraben & Sulfate-free"].map((pref) => (
                <label key={pref}>
                    <input type="checkbox" name="product_criteria" value={pref} onChange={handleCheckboxChange} />
                    {pref}
                </label>
            ))}

            <h3>Ethical and Sustainability Concerns</h3>
            {["Cruelty Free", "Vegan", "Eco-Friendly Packaging", "Sustainable Sourcing"].map((pref) => (
                <label key={pref}>
                    <input type="checkbox" name="product_criteria" value={pref} onChange={handleCheckboxChange} />
                    {pref}
                </label>
            ))}

            <h3>Budget</h3>
            <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
            >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>

            <h3>Price Range</h3>
            <input
                type="number"
                name="min_price"
                value={formData.min_price}
                onChange={handleInputChange}
                placeholder="Min Price"
            />
            <input
                type="number"
                name="max_price"
                value={formData.max_price}
                onChange={handleInputChange}
                placeholder="Max Price"
            />

            <button onClick={handleSubmit}>Generate Routine</button>

            {renderResponse()}
        </div>
    );
}