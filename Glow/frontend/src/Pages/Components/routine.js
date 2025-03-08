import React from 'react';
import './routine.css';

function Routine({ response, page, date }){
    return (
        <div className="routine-wrapper">
          {page === "profile" ? (
            <h3 className="routine-date"><em>{date}</em></h3>
          ) : null}
          <div className="routine-container">
            

            <div className="routine-section day-routine">
              <div className="routine-header">DAY ROUTINE</div>
              {response.day.length > 0 ? (
                response.day.map((item) => (
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
              {response.night.length > 0 ? (
                response.night.map((item) => (
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
