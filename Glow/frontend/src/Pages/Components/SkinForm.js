import React, { useState } from "react";
import "./SkinForm.css"
import Button from "./Button";

// SkinForm component - A form to collect user input for generating skincare routine
export default function SkinForm({ onSubmit }) {
	// Initial form data state
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

	// Handle changes in checkbox inputs (for skin concerns, product criteria, etc.)
	const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: checked
                ? [...prev[name], value] // Add value if checked
                : prev[name].filter((v) => v !== value), // Remove value if unchecked
        }));
    };

	// Handle changes in other input fields (text inputs, select dropdowns)
	const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	}
	
	// Predefined lists for skin concerns, ingredient preferences, and ethical concerns
	const skinConcerns = [
		"Acne", "Enlarged Pores", "Loss of Firmness", "Dark Circles", "Hyperpigmentation",
        "Congested Skin", "Sun Damage", "Puffy Eyes", "Dehydrated", "Redness",
        "Scarring", "Aging", "Textured", "Wrinkles", "Sensitive"
	];

	const ingredientPreferences = [
		"Fragrance-Free", "Alcohol-Free", "Paraben & Sulfate-free"
	];

	const ethicalSustainabilityConcerns = [
		"Cruelty Free", "Vegan", "Eco-Friendly Packaging", "Sustainable Sourcing"
	];

	return (
		<div>
			<div className="title">Routine Criteria</div>
			<div className="flex-container">
				{/* Routine Type ----------------------------------------------------------------------------------- */}
				<div className="item1-routineType">
					<div className="subTitle">Routine Type</div>
					<div className="dropdown-container">
						<select
							className="generator-select"
							name="routine_type"
							id="routine-dropdown"
							value={formData.routine_type}
							onChange={handleInputChange}
						>
							<option>Day</option>
							<option>Night</option>
							<option>Both</option>
						</select>
					</div>
				</div>
				{/* Skin Type -------------------------------------------------------------------------------------- */}
				<div className="item2-skinType">
					<div className="subTitle">Skin Type</div>
					<div className="dropdown-container">
						<select
							name="skin_type"
							className="generator-select"
							id="skinType-dropdown"
							value={formData.skin_type}
							onChange={handleInputChange}
						>
							<option>Normal</option>
							<option>Combination</option>
							<option>Oily</option>
							<option>Dry</option>
						</select>
					</div>
				</div>
				{/* Skin Conditions -------------------------------------------------------------------------------- */}
				<div className="item3-skinConditions">
					<div className="subTitle">Skin Conditions</div>
					<div className="input-container">
						<input
							className="generator-input"
							name="skin_conditions"
							type="text"
							id="skinConditions"
							value={formData.skin_conditions}
							placeholder="e.g., Acne, Eczema, Rosacea"
							onChange={handleInputChange}
						/>
					</div>
				</div>
				{/* Allergies -------------------------------------------------------------------------------------- */}
				<div className="item4-allergies">
					<div className="subTitle">Allergies</div>
					<div className="input-container">
						<input
							className="generator-input"
							name="allergies"
							type="text"
							id="allergyInput"
							value={formData.allergies}
							placeholder="e.g., Nuts, Pollen, Dairy"
							onChange={handleInputChange}
						/>
					</div>
				</div>
				{/* Skin Concerns ---------------------------------------------------------------------------------- */}
				<div className="item5-skinConcerns">
					<div className="subTitle">Skin Concerns</div>
					<div className="multi-select-container">
						<div className="checkbox-grid">
							{skinConcerns.map((concern) => (
								<label key={concern} className="checkbox-label">
									<input
										className="generator-input"
										name="skin_concerns"
										type="checkbox"
										value={concern}
										onChange={handleCheckboxChange}
									/>
									{concern}
								</label>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="title" style={{paddingTop: "50px"}}>Product Criteria</div>
			<div className="flex-container">
				{/* Ingredient Preferences ------------------------------------------------------------------------- */}
				<div className="item1-ingredients">
					<div className="subTitle">Ingredient Preferences</div>
					<div className="multi-select-container">
						<div className="checkbox-grid">
							{ingredientPreferences.map((ingredient) => (
								<label key={ingredient} className="checkbox-label">
									<input
										className="generator-input"
										name="product_criteria"
										type="checkbox"
										value={ingredient}
										onChange={handleCheckboxChange}
									/>
									{ingredient}
								</label>
							))}
						</div>
					</div>
				</div>
				{/* Ethical & Sustainability Concerns -------------------------------------------------------------- */}
				<div className="item2-ethicalSustainability">
					<div className="subTitle">Ethical & Sustainability Concerns</div>
					<div className="multi-select-container">
						<div className="checkbox-grid">
							{ethicalSustainabilityConcerns.map((concern) => (
								<label key={concern} className="checkbox-label">
									<input
										className="generator-input"
										name="product_criteria"
										type="checkbox"
										value={concern}
										onChange={handleCheckboxChange}
									/>
									{concern}
								</label>
							))}
						</div>
					</div>
				</div>
				{/* Budget Dropdown -------------------------------------------------------------------------------- */}
				<div className="item3-budget">
					<div className="subTitle">Budget</div>
					<div className="dropdown-container">
						<select className="generator-select" name="budget" id="budget-dropdown" value={formData.budget} onChange={handleInputChange}>
							<option>Low</option>
							<option>Medium</option>
							<option>High</option>
						</select>
					</div>
				</div>

				{/* Min Price Input -------------------------------------------------------------------------------- */}
				<div className="item4-minPrice">
					<div className="subTitle">Minimum Price</div>
					<div className="input-container" style={{width: 200}}>
						<input
							className="generator-input"
							name="min_price"
							type="number"
							id="priceMin"
							placeholder="Enter minimum price"
							value={formData.min_price}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				{/* Max Price Input -------------------------------------------------------------------------------- */}
				<div className="item5-maxPrice">
					<div className="subTitle">Maximum Price</div>
					<div className="input-container" style={{width: 200}}>
						<input
							className="generator-input"
							name="max_price"
							type="number"
							id="priceMax"
							placeholder="Enter maximum price"
							value={formData.max_price}
							onChange={handleInputChange}
						/>
					</div>
				</div>
			</div>

			<div className="buttonContainer">
				<Button text="Generate Routine" onClick={handleSubmit}/>
			</div>

		</div>
	)
}