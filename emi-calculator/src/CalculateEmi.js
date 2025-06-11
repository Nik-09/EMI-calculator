import React, { useState, useEffect } from 'react';
import {CalculatorIcon} from "lucide-react";
import './CalculateEmi.css'
import EmiResult from './EmiResult'

const loanTypeMap = {
    "home-loan": "home",
    "car-loan": "car",
    "personal-loan": "personal",
    "education-loan": "education",
    "business-loan": "business"
  };

const defaultValuesByType = {
    home: { principle: 2500000, rate: 7.5, time: 20, gracePeriod: 6 },
    car: { principle: 500000, rate: 9, time: 5, gracePeriod: 3 },
    personal: { principle: 200000, rate: 12, time: 3, gracePeriod: 2 },
    education: { principle: 800000, rate: 10, time: 7, gracePeriod: 12 },
    business: { principle: 1000000, rate: 11, time: 10, gracePeriod: 4 }
  };

function CalculateEmi({ type, onBack }) {
    const loanType = loanTypeMap[type];
    const defaults = defaultValuesByType[loanType] || {};

    const[principle, setPrinciple] = useState('');
    const[rate, setRate] = useState('');
    const[time, setTime] = useState('');
    const[gracePeriod, setGracePeriod] = useState('');
    const[result, setResult] = useState('');

    useEffect(() => {
        setPrinciple(defaults.principle?.toString() || '');
        setRate(defaults.rate?.toString() || '');
        setTime(defaults.time?.toString() || '');
        setGracePeriod(defaults.gracePeriod?.toString() || '');
        setResult(''); // reset result on loan type change
      }, [type]);

    const calculate = () => {
        const P = parseFloat(principle);
        const R = parseFloat(rate)/12/100;
        const T = parseFloat(time)*12;
        const GP = parseFloat(gracePeriod);

        if (isNaN(P)){
            alert('Please enter the Principle');
            return;
        }

        if (isNaN(R)) {
            alert('Please enter the Rate');
            return;
        }

        if(isNaN(T)) {
            alert('Please enter the Time');
            return;
        }
        let adjustP = P
        if(GP > 0){
            adjustP = P * Math.pow(1 + R, GP);
        }
        const numerator = adjustP * R * Math.pow(1 + R, T);
        const denominator = Math.pow(1 + R, T) - 1;
        const result = numerator / denominator;

        setResult(result.toFixed(2));
    };

    const clearFields = () => {
        setPrinciple('');
        setRate('');
        setTime('');
        setGracePeriod('');
        setResult('');
      };    

    return (
        <div>
            <div className='calculate-emi-container'>
                <CalculatorIcon className='emi-calculate-icon' size={24} />
                <h3 className='title'>Calculate EMI</h3>
                <label className='loan-text-color'>Loan Amount</label>
                <input
                    type="number"
                    placeholder={`Enter ${loanType} amount`}
                    value={principle}
                    onChange={(e) => setPrinciple(e.target.value)}
                    className='loan-amount-box'
                />
                <label className='rate-text-color'>Interest Rate (% per annum)</label>
                <input
                    type="number"
                    placeholder="e.g. 4"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className='interest-rate-box'
                />
                <label className='loanTenure-text-color'>Loan Tenure (Years)</label>
                <input
                    type="number"
                    placeholder='e.g. 1 yr'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className='loan-tenure-box'
                />
                <label className='gracePeriod-text-color'>Grace Period (Months)</label>
                <input
                    type="number"
                    placeholder='e.g 5 months (optional)'
                    value={gracePeriod}
                    onChange={(e) => setGracePeriod(e.target.value)}
                    className='grace-period-box'
                />
                <p className='info-text'>Period during which you only pay interest (if applicable)</p>
                <button onClick={calculate} className='calculate-button'>Calculate</button>
                <button onClick={clearFields} className='clear-button'>Clear</button>
            </div>
            <section>
                    <EmiResult result = {result} gracePeriod={gracePeriod}/>
            </section>
        </div>
    )
}

export default CalculateEmi;