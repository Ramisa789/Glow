import React from 'react';

function renderRoutine (routine) {
    if (!routine || typeof routine !== "object") return <p>No routine found.</p>;

    // Check which routine type is available
    const dayRoutine = routine["day"];
    const nightRoutine = routine["night"];

    // Determine what to display based on availability
    if ((!dayRoutine || dayRoutine.length === 0) && (!nightRoutine || nightRoutine.length === 0)) {
        return <p>No routine available.</p>;
    }

    return (
        <div>
            {dayRoutine && dayRoutine.length > 0 && (
                <>
                    <h3>Day Routine - Products and Prices:</h3>
                    {dayRoutine.map((step) => (
                        <div key={step.step}>
                            <p><strong>Step {step.step}: {step.name}</strong></p>
                            <p>Price: {step.price}</p>
                            <p><strong>How to Apply:</strong> {step.application}</p>
                        </div>
                    ))}
                </>
            )}

            {nightRoutine && nightRoutine.length > 0 && (
                <>
                    <h3>Night Routine - Products and Prices:</h3>
                    {nightRoutine.map((step) => (
                        <div key={step.step}>
                            <p><strong>Step {step.step}: {step.name}</strong></p>
                            <p>Price: {step.price}</p>
                            <p><strong>How to Apply:</strong> {step.application}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default renderRoutine;
