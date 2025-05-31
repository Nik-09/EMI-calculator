import React, { useState } from 'react';
import LoanCategoriesButtons from './LoanCategoriesButtons';
import {Calculator} from "lucide-react"
import './App.css'

function EmiCalculator() {
  const [activeForm, setActiveForm] = useState(null);

  return(
    <main className='emi-calculator-conatiner'>
      <header className='emi-calculator-header'>
      <div className="icon-calculator-box" >
        <Calculator className='emi-calculator-icon' size={35} />
      </div>
      <h1 className='emi-calculator-title'>EMI calculator</h1>
      <p className='emi-calculator-subtitle'>Calculate your loan payments</p>
      </header>
      <section aria-label="Loan Categories">
        <LoanCategoriesButtons activeForm={activeForm} onFormSwitch={setActiveForm}/>
      </section>
    </main>
  )
}

export default EmiCalculator;
