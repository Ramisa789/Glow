import React from "react";

export default function Button({ text, onClick, type = "button", disabled = false }) {
	return (
		<button className="custom-button" onClick={onClick} type={type} disabled={disabled}>
			{text}
		</button>
	);
}