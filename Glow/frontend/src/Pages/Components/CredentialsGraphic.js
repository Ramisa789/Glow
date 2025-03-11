import React from 'react';
import './CredentialsGraphic.css';
import Graphic from "../Images/CredentialsGraphic.png";
function CredentialsGraphic(){
    return(
        <div className="credentials-image-box">
            <img src={Graphic} alt="Strawberry themed graphics on top of a pink face mask" />
        </div>


    );
}

export default CredentialsGraphic;
