import React, { useState } from "react";
import "./TextInput.css"

export default function TextInputSkinConditions() {
	const [conditions, setConditions] = useState([]); // Store array of skin conditions

	const handleChange = (event) => {
		// Split input into an array based on commas, trim spaces, and remove empty values
		const inputText = event.target.value;
		const conditionArray = inputText
			.split(",")
			.map((condition) => condition.trim()) // Remove leading/trailing spaces
			.filter((condition) => condition !== ""); // Remove empty values

		setConditions(conditionArray);
	};

	return (
		<div className="input-container">
			<input
				type="text"
				id="skinConditions"
				placeholder="e.g., Acne, Eczema, Rosacea"
				onChange={handleChange}
			/>

			{/* Display entered conditions dynamically */}
			{conditions.length > 0 && (
				<p>Conditions: {conditions.join(", ")}</p>
			)}
		</div>
	);
}