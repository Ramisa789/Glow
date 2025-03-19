import React from 'react';
import './routine.css';

// Routine Component:
// Displays a skincare routine with day and night sections, based on passed data.
function Routine({ name, created_at, day, night, page }){
    return (
        <div className="routine-wrapper">
          {page === "profile" ? (
            <h3 className="routine-date"><em>{created_at}</em></h3>
          ) : null}
          <div className="routine-container">
            

            <div className="routine-section day-routine">
              <div className="routine-header">DAY ROUTINE</div>
              {day.length > 0 ? (
                day.map((item) => (
                  <div className="routine-list">
                    <p><strong>Step {item.step}:</strong> {item.name} - ${item.price}</p>
                    <p>{item.application}</p>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
    
            <div className="routine-section night-routine">
              <div className="routine-header">NIGHT ROUTINE</div>
              {night.length > 0 ? (
                night.map((item) => (
                  <div className="routine-list">
                    <p><strong>Step {item.step}:</strong> {item.name} - ${item.price}</p>
                    <p>{item.application}</p>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
    
          </div>
        </div>
      );
    };

export default Routine;
