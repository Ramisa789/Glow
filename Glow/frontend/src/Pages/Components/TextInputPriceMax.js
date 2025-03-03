import React from "react";
import "./TextInput.css";

export default function TextInputPriceMax({ maxPrice, setMaxPrice }) {
	const handleChange = (event) => {
		const inputValue = event.target.value.replace(/[^0-9.]/g, ""); // Allow only numbers
		setMaxPrice(inputValue);
	};

	return (
		<div className="input-container">
			<input
				type="text"
				id="priceMax"
				placeholder="Enter maximum price"
				value={maxPrice}
				onChange={handleChange}
			/>
		</div>
	);
}