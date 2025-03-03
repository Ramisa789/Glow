import React from "react";
import "./TextInput.css";

export default function TextInputPriceMin({ minPrice, setMinPrice }) {
	const handleChange = (event) => {
		const inputValue = event.target.value.replace(/[^0-9.]/g, ""); // Allow only numbers
		setMinPrice(inputValue);
	};

	return (
		<div className="input-container">
			<input
				type="text"
				id="priceMin"
				placeholder="Enter minimum price"
				value={minPrice}
				onChange={handleChange}
			/>
		</div>
	);
}