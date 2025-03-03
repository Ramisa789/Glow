import React, { useState } from "react";
import "./MultiSelect.css";

export default function MultiSelectIngredientPreferences() {
	const [selectedIngredients, setSelectedIngredients] = useState([]); // Store selected values

	const ingredientPreferences = [
		"Alcohol-Free", "Dye-Free", "Essential Oil-Free", "Fragrance-Free",
		"Paraben-Free", "Sulfate-Free"
	];

	const handleChange = (event) => {
		const { value, checked } = event.target;
		if (checked) {
			setSelectedIngredients([...selectedIngredients, value]); // Add to selection
		} else {
			setSelectedIngredients(selectedIngredients.filter((ingredient) => ingredient !== value)); // Remove from selection
		}
	};

	return (
		<div className="multi-select-container">
			<div className="checkbox-flexbox">
				{ingredientPreferences.map((ingredient) => (
					<label key={ingredient} className="checkbox-label">
						<input
							type="checkbox"
							value={ingredient}
							checked={selectedIngredients.includes(ingredient)}
							onChange={handleChange}
						/>
						{ingredient}
					</label>
				))}
			</div>
			{selectedIngredients.length > 0 && (
				<p className="selected-text">Selected: {selectedIngredients.join(", ")}</p>
			)}
		</div>
	);
}