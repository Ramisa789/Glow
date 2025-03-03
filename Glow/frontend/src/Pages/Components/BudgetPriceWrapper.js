import React, { useState } from "react";
import SelectMenuBudget from "./SelectMenuBudget";
import TextInputPriceMin from "./TextInputPriceMin";
import TextInputPriceMax from "./TextInputPriceMax";
import "./BudgetPriceWrapper.css";

export default function BudgetPriceWrapper() {
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

	return (
		<div className="budget-price-container">
			<div className="item3-budget">
				<div className="subTitle">Budget</div>
				<SelectMenuBudget
					selectedBudget={selectedBudget}
					onBudgetChange={handleBudgetChange}
				/>
			</div>
			<div className="item4-minPrice">
				<div className="subTitle">Minimum Price</div>
				<TextInputPriceMin minPrice={minPrice} setMinPrice={setMinPrice} />
			</div>
			<div className="item5-maxPrice">
				<div className="subTitle">Maximum Price</div>
				<TextInputPriceMax maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
			</div>
		</div>
	);
}