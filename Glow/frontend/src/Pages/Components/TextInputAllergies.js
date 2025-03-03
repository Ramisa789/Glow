import React, { useState } from "react";
import "./TextInput.css"

export default function TextInputAllergies() {
	const [allergies, setAllergies] = useState([]); // Store array of allergies

	const handleChange = (event) => {
		// Split input into an array based on commas, trim spaces, and remove empty values
		const inputText = event.target.value;
		const allergyArray = inputText
			.split(",")
			.map((allergy) => allergy.trim()) // Remove leading/trailing spaces
			.filter((allergy) => allergy !== ""); // Remove empty values

		setAllergies(allergyArray);
	};

	return (
		<div className="input-container">
			<input
				type="text"
				id="allergyInput"
				placeholder="e.g., Nuts, Pollen, Dairy"
				onChange={handleChange}
			/>

			{/* Display entered allergies dynamically */}
			{allergies.length > 0 && (
				<p>Allergies: {allergies.join(", ")}</p>
			)}
		</div>
	);
}