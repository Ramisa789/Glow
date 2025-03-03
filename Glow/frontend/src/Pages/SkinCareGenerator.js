import "./SkinCareGenerator.css";
import "../CSSVariables.css"
import React from 'react';
import { Link } from 'react-router-dom';
import SelectMenuRoutineType from "./Components/SelectMenuRoutineType";
import SelectMenuSkinType from "./Components/SelectMenuSkinType";
import TextInputSkinConditions from "./Components/TextInputSkinConditions";
import TextInputAllergies from "./Components/TextInputAllergies";
import MultiSelectSkinConcerns from "./Components/MultiSelectSkinConcerns";
import MultiSelectIngredientPreferences from "./Components/MultiSelectIngredientPreferences";
import MultiSelectEthicalSustainabilityConcerns from "./Components/MultiSelectEthicalSustainabilityConcerns";
import BudgetPriceWrapper from "./Components/BudgetPriceWrapper";
import Button from "./Components/Button";

export default function SkinCareGenerator() {
    const handleClick = () => {
        alert("Button Clicked!");
    };

    return(
       <div className="container">
           <div className="header">Skin-Care Generator</div>

           <div className="formContainer">

               <div className="title">Routine Criteria</div>
               <div className="flex-container">
                   <div className="item1-routineType">
                       <div className="subTitle">Routine Type</div>
                       <SelectMenuRoutineType />
                   </div>
                   <div className="item2-skinType">
                       <div className="subTitle">Skin Type</div>
                       <SelectMenuSkinType />
                   </div>
                   <div className="item3-skinConditions">
                       <div className="subTitle">Skin Conditions</div>
                       <TextInputSkinConditions />
                   </div>
                   <div className="item4-allergies">
                       <div className="subTitle">Allergies</div>
                       <TextInputAllergies />
                   </div>
                   <div className="item5-skinConcerns">
                       <div className="subTitle">Skin Concerns</div>
                       <MultiSelectSkinConcerns />
                   </div>
               </div>

               <div className="title" style={{paddingTop: "50px"}}>Product Criteria</div>
               <div className="flex-container">
                   <div className="item1-ingredients">
                       <div className="subTitle">Ingredient Preferences</div>
                       <MultiSelectIngredientPreferences />
                   </div>
                   <div className="item2-ethicalSustainability">
                       <div className="subTitle">Ethical & Sustainability Concerns</div>
                       <MultiSelectEthicalSustainabilityConcerns />
                   </div>
                   <BudgetPriceWrapper />
               </div>

               <div className="buttonContainer">
                   <Button text="Generate Routine" onClick={handleClick} />
               </div>
           </div>
       </div>
    );
}