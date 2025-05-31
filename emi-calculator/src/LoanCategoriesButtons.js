import React from "react";
import {
    Home,
    Car,
    GraduationCap,
    User,
    Briefcase
  } from "lucide-react";
  import './LoanCategoriesButtons.css';

function LoanCategoriesButtons({activeForm, onFormSwitch}){
    return(
        <div className="loan-type-card">
            <h3>Select Loan Type</h3>
            <div className="loan-options">
            <button 
                onClick={()=>onFormSwitch('home-loan')}
                className={`loan-button ${activeForm==='home-loan' ? 'active': ''}`}
            >
               <Home className="icon-home-box" color="#0066ff" size={24} />
                Home loan
            </button>
            <button
                onClick={()=>onFormSwitch('car-loan')}
                className={`loan-button ${activeForm==='car-loan' ? 'active': ''}`}
            >
                <Car className="icon-car-box" color="#ff4d4f" size={24} />
                Car loan
            </button>
            <button 
                onClick={()=>onFormSwitch('education-loan')}
                className={`loan-button ${activeForm==='education-loan' ? 'active': ''}`}
            >
                <GraduationCap className="icon-graduation-box" color="#52c41a" size={24} />
                Education loan
            </button>
            <button 
                onClick={()=>onFormSwitch('personal-loan')}
                className={`loan-button ${activeForm==='personal-loan' ? 'active': ''}`}
            >
                <User className="icon-user-box" color="#722ed1" size={24} />
                personal loan
            </button>
            <button 
                onClick={()=>onFormSwitch('business-loan')}
                className={`loan-button ${activeForm==='business-loan' ? 'active': ''}`}
            >
                <Briefcase className="icon-buisness-box" color="#fa8c16" size={24} />
                Buisness loan
            </button>
            </div>
        </div>
    )
}

export default LoanCategoriesButtons;