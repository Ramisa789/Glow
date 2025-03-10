import "./SkinCareGenerator.css";
import "../CSSVariables.css"
import React from 'react';
import { Link } from 'react-router-dom';

import SkinForm from "./Components/SkinForm";

export default function SkinCareGenerator() {
    return(
       <div className="generator-container">
           <div className="widthContainer">
               <div className="generator-header">Skin-Care Generator</div>
               <div className="formContainer"><SkinForm/></div>
           </div>
       </div>
    );
}