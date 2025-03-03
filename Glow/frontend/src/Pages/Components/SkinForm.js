import React, { useState } from "react";
import "./SkinForm.css"
import Button from "./Button";

export default function SkinForm() {

	// Routine Types ------------------------------------------------------------------------------------------------ //
	const [selectedRoutine, setSelectedRoutine] = useState("");

	const routineTypes = [
		{ value: "morning", label: "Morning Routine" },
		{ value: "evening", label: "Evening Routine" },
		{ value: "morning and evening", label: "Morning & Evening Routine" },
		{ value: "no preference", label: "No Preference" }
	];

	// Skin Types --------------------------------------------------------------------------------------------------- //
	const [selectedSkinType, setSelectedSkinType] = useState("");

	const skinTypes = [
		{ value: "normal", label: "Normal Skin" },
		{ value: "aging", label: "Aging Skin" },
		{ value: "combination", label: "Combination Skin" },
		{ value: "dry", label: "Dry Skin" },
		{ value: "oily", label: "Oily Skin" },
		{ value: "sensitive", label: "Sensitive Skin" },
	];

	// Skin Conditions ---------------------------------------------------------------------------------------------- //
	const [conditions, setConditions] = useState([]); // Store array of skin conditions

	const handleConditionsChange = (event) => {
		// Split input into an array based on commas, trim spaces, and remove empty values
		const inputText = event.target.value;
		const conditionArray = inputText
			.split(",")
			.map((condition) => condition.trim()) // Remove leading/trailing spaces
			.filter((condition) => condition !== ""); // Remove empty values

		setConditions(conditionArray);
	};

	// Allergies ---------------------------------------------------------------------------------------------------- //
	const [allergies, setAllergies] = useState([]); // Store array of allergies

	const handleAllergiesChange = (event) => {
		// Split input into an array based on commas, trim spaces, and remove empty values
		const inputText = event.target.value;
		const allergyArray = inputText
			.split(",")
			.map((allergy) => allergy.trim()) // Remove leading/trailing spaces
			.filter((allergy) => allergy !== ""); // Remove empty values

		setAllergies(allergyArray);
	};

	// Skin Concerns ------------------------------------------------------------------------------------------------ //
	const [selectedSkinConcerns, setSelectedSkinConcerns] = useState([]); // Store selected values

	const skinConcerns = [
		"Acne", "Aging", "Congested Skin", "Dark Circles Around Eyes", "Dehydrated",
		"Enlarged Pores", "Hyperpigmentation", "Loss of Firmness", "Puffy Eyes",
		"Redness", "Scarring", "Sensitive", "Sun Damage", "Textured", "Wrinkles"
	];

	const handleSkinConcernsChange = (event) => {
		const { value, checked } = event.target;
		if (checked) {
			setSelectedSkinConcerns([...selectedSkinConcerns, value]); // Add to selection
		} else {
			setSelectedSkinConcerns(selectedSkinConcerns.filter((concern) => concern !== value)); // Remove from selection
		}
	};

	// Ingredient Preferences --------------------------------------------------------------------------------------- //
	const [selectedIngredients, setSelectedIngredients] = useState([]); // Store selected values

	const ingredientPreferences = [
		"Alcohol-Free", "Dye-Free", "Essential Oil-Free", "Fragrance-Free",
		"Paraben-Free", "Sulfate-Free"
	];

	const handleIngredientPrefChange = (event) => {
		const { value, checked } = event.target;
		if (checked) {
			setSelectedIngredients([...selectedIngredients, value]); // Add to selection
		} else {
			setSelectedIngredients(selectedIngredients.filter((ingredient) => ingredient !== value)); // Remove from selection
		}
	};

	// Ethical & Sustainability Concerns ---------------------------------------------------------------------------- //
	const [selectedESConcerns, setSelectedESConcerns] = useState([]); // Store selected values

	const ethicalSustainabilityConcerns = [
		"Cruelty-Free", "Eco-Friendly Packaging", "Sustainably Sourced", "Vegan"
	];

	const handleESConcernsChange = (event) => {
		const { value, checked } = event.target;
		if (checked) {
			setSelectedESConcerns([...selectedESConcerns, value]); // Add to selection
		} else {
			setSelectedESConcerns(selectedESConcerns.filter((concern) => concern !== value)); // Remove from selection
		}
	};

	// Budget, Price Min, & Price Max ------------------------------------------------------------------------------- //

	// State for budget and price inputs
	const [selectedBudget, setSelectedBudget] = useState("");
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");

	// Budget price mapping
	const budgetRanges = {
		low: { min: "10", max: "50" },
		medium: { min: "51", max: "150" },
		high: { min: "151", max: "500" },
		"no-limit": { min: "", max: "" },
	};

	// Handle budget selection
	const handleBudgetChange = (event) => {
		const selected = event.target.value;
		setSelectedBudget(selected);

		// Auto-fill prices based on budget selection
		if (budgetRanges[selected]) {
			setMinPrice(budgetRanges[selected].min);
			setMaxPrice(budgetRanges[selected].max);
		} else {
			setMinPrice("");
			setMaxPrice("");
		}
	};

	// Handle manual price input changes
	const handleMinPriceChange = (event) => {
		const inputValue = event.target.value.replace(/[^0-9.]/g, ""); // Allow only numbers
		setMinPrice(inputValue);
	};

	const handleMaxPriceChange = (event) => {
		const inputValue = event.target.value.replace(/[^0-9.]/g, ""); // Allow only numbers
		setMaxPrice(inputValue);
	};

	// Submit Button ------------------------------------------------------------------------------------------------ //
	const handleSubmitButtonClick = () => {
		alert("Button Clicked!");
	};

	return (
		<div>
			<div className="title">Routine Criteria</div>
			<div className="flex-container">
				{/* Routine Type ----------------------------------------------------------------------------------- */}
				<div className="item1-routineType">
					<div className="subTitle">Routine Type</div>
					<div className="dropdown-container">
						<select
							id="routine-dropdown"
							value={selectedRoutine}
							onChange={(e) => setSelectedRoutine(e.target.value)}
						>
							<option value="">Select</option>
							{routineTypes.map((routine) => (
								<option key={routine.value} value={routine.value}>
									{routine.label}
								</option>
							))}
						</select>
					</div>
				</div>
				{/* Skin Type -------------------------------------------------------------------------------------- */}
				<div className="item2-skinType">
					<div className="subTitle">Skin Type</div>
					<div className="dropdown-container">
						<select
							id="skinType-dropdown"
							value={selectedSkinType}
							onChange={(e) => setSelectedSkinType(e.target.value)}
						>
							<option value="">Select</option>
							{skinTypes.map((skin) => (
								<option key={skin.value} value={skin.value}>
									{skin.label}
								</option>
							))}
						</select>
					</div>
				</div>
				{/* Skin Conditions -------------------------------------------------------------------------------- */}
				<div className="item3-skinConditions">
					<div className="subTitle">Skin Conditions</div>
					<div className="input-container">
						<input
							type="text"
							id="skinConditions"
							placeholder="e.g., Acne, Eczema, Rosacea"
							onChange={handleConditionsChange}
						/>

						{/* Display entered conditions dynamically */}
						{conditions.length > 0 && (
							<p>Conditions: {conditions.join(", ")}</p>
						)}
					</div>
				</div>
				{/* Allergies -------------------------------------------------------------------------------------- */}
				<div className="item4-allergies">
					<div className="subTitle">Allergies</div>
					<div className="input-container">
						<input
							type="text"
							id="allergyInput"
							placeholder="e.g., Nuts, Pollen, Dairy"
							onChange={handleAllergiesChange}
						/>

						{/* Display entered allergies dynamically */}
						{allergies.length > 0 && (
							<p>Allergies: {allergies.join(", ")}</p>
						)}
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
										type="checkbox"
										value={concern}
										checked={selectedSkinConcerns.includes(concern)}
										onChange={handleSkinConcernsChange}
									/>
									{concern}
								</label>
							))}
						</div>
						{selectedSkinConcerns.length > 0 && (
							<p className="selected-text">Selected: {selectedSkinConcerns.join(", ")}</p>
						)}
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
										type="checkbox"
										value={ingredient}
										checked={selectedIngredients.includes(ingredient)}
										onChange={handleIngredientPrefChange}
									/>
									{ingredient}
								</label>
							))}
						</div>
						{selectedIngredients.length > 0 && (
							<p className="selected-text">Selected: {selectedIngredients.join(", ")}</p>
						)}
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
										type="checkbox"
										value={concern}
										checked={selectedESConcerns.includes(concern)}
										onChange={handleESConcernsChange}
									/>
									{concern}
								</label>
							))}
						</div>
						{selectedESConcerns.length > 0 && (
							<p className="selected-text">Selected: {selectedESConcerns.join(", ")}</p>
						)}
					</div>
				</div>
				{/* Budget Dropdown -------------------------------------------------------------------------------- */}
				<div className="item3-budget">
					<div className="subTitle">Budget</div>
					<div className="dropdown-container">
						<select id="budget-dropdown" value={selectedBudget} onChange={handleBudgetChange}>
							<option value="">Select Budget</option>
							<option value="low">Budget-Friendly ($ - $$)</option>
							<option value="medium">Mid-Range ($$ - $$$)</option>
							<option value="high">Luxury ($$$ - $$$$)</option>
							<option value="no-limit">No Budget Limit</option>
						</select>
					</div>
				</div>

				{/* Min Price Input -------------------------------------------------------------------------------- */}
				<div className="item4-minPrice">
					<div className="subTitle">Minimum Price</div>
					<div className="input-container" style={{width: 200}}>
						<input
							type="text"
							id="priceMin"
							placeholder="Enter minimum price"
							value={minPrice}
							onChange={handleMinPriceChange}
						/>
					</div>
				</div>

				{/* Max Price Input -------------------------------------------------------------------------------- */}
				<div className="item5-maxPrice">
					<div className="subTitle">Maximum Price</div>
					<div className="input-container" style={{width: 200}}>
						<input
							type="text"
							id="priceMax"
							placeholder="Enter maximum price"
							value={maxPrice}
							onChange={handleMaxPriceChange}
						/>
					</div>
				</div>
			</div>

			<div className="buttonContainer">
				<Button text="Generate Routine" onClick={handleSubmitButtonClick}/>
			</div>

		</div>
	)
}