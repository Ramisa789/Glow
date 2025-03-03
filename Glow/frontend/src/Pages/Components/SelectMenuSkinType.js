import React, { useState } from "react";
import "./SelectMenu.css";

export default function SelectMenuSkinType() {
	const [selectedSkinType, setSelectedSkinType] = useState(""); // Singular name

	const skinTypes = [
		{ value: "normal", label: "Normal Skin" },
		{ value: "aging", label: "Aging Skin" },
		{ value: "combination", label: "Combination Skin" },
		{ value: "dry", label: "Dry Skin" },
		{ value: "oily", label: "Oily Skin" },
		{ value: "sensitive", label: "Sensitive Skin" },
	];

	return (
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
	);
}