import React, { useState } from "react";
import "./MultiSelect.css";

export default function MultiSelectEthicalSustainabilityConcerns() {
	const [selectedConcerns, setSelectedConcerns] = useState([]); // Store selected values

	const ethicalSustainabilityConcerns = [
		"Cruelty-Free", "Eco-Friendly Packaging", "Sustainably Sourced", "Vegan"
	];

	const handleChange = (event) => {
		const { value, checked } = event.target;
		if (checked) {
			setSelectedConcerns([...selectedConcerns, value]); // Add to selection
		} else {
			setSelectedConcerns(selectedConcerns.filter((concern) => concern !== value)); // Remove from selection
		}
	};

	return (
		<div className="multi-select-container">
			<div className="checkbox-flexbox">
				{ethicalSustainabilityConcerns.map((concern) => (
					<label key={concern} className="checkbox-label">
						<input
							type="checkbox"
							value={concern}
							checked={selectedConcerns.includes(concern)}
							onChange={handleChange}
						/>
						{concern}
					</label>
				))}
			</div>
			{selectedConcerns.length > 0 && (
				<p className="selected-text">Selected: {selectedConcerns.join(", ")}</p>
			)}
		</div>
	);
}