import React from "react";

// Button Component:
// A reusable button component that accepts props for text, click event handler, button type, and disabled state.
export default function Button({ text, onClick, type = "button", disabled = false }) {
	return (
		<button className="custom-button" onClick={onClick} type={type} disabled={disabled}>
			{text}
		</button>
	);
}