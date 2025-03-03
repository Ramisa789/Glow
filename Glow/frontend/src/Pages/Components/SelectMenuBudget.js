import React from "react";
import "./SelectMenu.css";

export default function SelectMenuBudget({ selectedBudget, onBudgetChange }) {
	return (
		<div className="dropdown-container">
			<select id="budget-dropdown" value={selectedBudget} onChange={onBudgetChange}>
				<option value="">Select Budget</option>
				<option value="low">Budget-Friendly ($ - $$)</option>
				<option value="medium">Mid-Range ($$ - $$$)</option>
				<option value="high">Luxury ($$$ - $$$$)</option>
				<option value="no-limit">No Budget Limit</option>
			</select>
		</div>
	);
}