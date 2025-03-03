import React, { useState } from "react";
import "./SelectMenu.css"

export default function SelectMenuRoutineType() {
	const [selectedRoutine, setSelectedRoutine] = useState("");

	const routineTypes = [
		{ value: "morning", label: "Morning Routine" },
		{ value: "evening", label: "Evening Routine" },
		{ value: "morning and evening", label: "Morning & Evening Routine" },
		{ value: "no preference", label: "No Preference" }
	];

	return (
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
	);
}