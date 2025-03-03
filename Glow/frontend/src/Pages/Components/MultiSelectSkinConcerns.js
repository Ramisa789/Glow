import React, { useState } from "react";
import "./MultiSelect.css";

export default function MultiSelectSkinConcerns() {
	const [selectedConcerns, setSelectedConcerns] = useState([]); // Store selected values

	const skinConcerns = [
		"Acne", "Aging", "Congested Skin", "Dark Circles Around Eyes", "Dehydrated",
		"Enlarged Pores", "Hyperpigmentation", "Loss of Firmness", "Puffy Eyes",
		"Redness", "Scarring", "Sensitive", "Sun Damage", "Textured", "Wrinkles"
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
				{skinConcerns.map((concern) => (
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