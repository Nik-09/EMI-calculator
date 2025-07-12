import React, { useState, useEffect } from 'react';
import { CalculatorIcon, Banknote, Calendar, TrendingUp, Clock } from 'lucide-react';
import './CalculateEmi.css';
import EmiResult from './EmiResult';
import RecommendedCard from './RecommendedCard';

const loanTypeMap = {
  'home-loan': 'home',
  'car-loan': 'car',
  'personal-loan': 'personal',
  'education-loan': 'education',
  'business-loan': 'business'
};

const defaultValuesByType = {
  home: { principle: 2500000, rate: 7.5, time: 20, gracePeriod: 0 },
  car: { principle: 500000, rate: 9, time: 5, gracePeriod: 0 },
  personal: { principle: 200000, rate: 12, time: 3, gracePeriod: 0 },
  education: { principle: 800000, rate: 10, time: 7, gracePeriod: 6 },
  business: { principle: 1000000, rate: 11, time: 10, gracePeriod: 0 }
};

function CalculateEmi({ type, onBack }) {
  const loanType = loanTypeMap[type];
  const defaults = defaultValuesByType[loanType] || {};

  const [principle, setPrinciple] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [graceType, setGraceType] = useState('none');
  const [gracePeriod, setGracePeriod] = useState('');
  const [result, setResult] = useState('');
  const [totalInterest, setTotalInterest] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [principalPercent, setPrinciplePercent] = useState(0);
  const [interestPercent, setInterestPercent] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setPrinciple(defaults.principle?.toString() || '');
    setRate(defaults.rate?.toString() || '');
    setTime(defaults.time?.toString() || '');
    setGraceType('none');
    setGracePeriod(defaults.gracePeriod?.toString() || '');
    setResult('');
    setTotalInterest('');
    setTotalAmount('');
    setPrinciplePercent(0);
    setInterestPercent(0);
    setShowResults(false);
  }, [type]);

  const calculate = () => {
    const P = parseFloat(principle);
    const R = parseFloat(rate) / 12 / 100;
    const T = parseFloat(time) * 12;
    const GP = parseFloat(gracePeriod);

    if (isNaN(P)) {
      alert('Please enter the Principal');
      return;
    }
    if (isNaN(R)) {
      alert('Please enter the Rate');
      return;
    }
    if (isNaN(T)) {
      alert('Please enter the Time');
      return;
    }

    let graceInterest = 0;
    let adjustedPrincipal = P;

    if (GP > 0) {
      if (graceType === 'interest-only') {
        graceInterest = P * R * GP;
      } else if (graceType === 'full-grace') {
        adjustedPrincipal = P * Math.pow(1 + R, GP);
      }
    }

    const numerator = adjustedPrincipal * R * Math.pow(1 + R, T);
    const denominator = Math.pow(1 + R, T) - 1;
    const monthlyEmi = numerator / denominator;
    setResult(monthlyEmi.toFixed());

    const totalEMIPayment = monthlyEmi * T;
    const calculatedInterest = totalEMIPayment - P + graceInterest;
    setTotalInterest(calculatedInterest.toFixed());

    const calculatedAmount = P + calculatedInterest;
    setTotalAmount(calculatedAmount.toFixed());

    const principalPercent = (P / calculatedAmount) * 100;
    setPrinciplePercent(principalPercent.toFixed(1));

    const interestPercent = (calculatedInterest / calculatedAmount) * 100;
    setInterestPercent(interestPercent.toFixed(1));

    setShowResults(true);
  };

  const clearFields = () => {
    setPrinciple('');
    setRate('');
    setTime('');
    setGraceType('none');
    setGracePeriod('');
    setResult('');
    setTotalInterest('');
    setTotalAmount('');
    setShowResults(false);
  };

  return (
    <div>
      <div className='calculate-emi-container'>
        <CalculatorIcon className='emi-calculate-icon' size={24} />
        <h3 className='title'>Calculate EMI</h3>
        <label className='loan-text-color'>Loan Amount</label>
        <input
          type='number'
          placeholder={`Enter ${loanType} amount`}
          value={principle}
          onChange={(e) => setPrinciple(e.target.value)}
          className='loan-amount-box'
        />
        <label className='rate-text-color'>Interest Rate (% per annum)</label>
        <input
          type='number'
          placeholder='e.g. 4'
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className='interest-rate-box'
        />
        <label className='loanTenure-text-color'>Loan Tenure (Years)</label>
        <input
          type='number'
          placeholder='e.g. 1 yr'
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className='loan-tenure-box'
        />
        <label className='graceType-text-color'>Grace Period Type</label>
        <select
          value={graceType}
          onChange={(e) => setGraceType(e.target.value)}
          className='grace-type-box'
        >
          <option value='none'>No Grace</option>
          <option value='interest-only'>Interest-Only</option>
          <option value='full-grace'>Full Grace (Capitalized Interest)</option>
        </select>
        <label className='gracePeriod-text-color'>Grace Period (Months)</label>
        <input
          type='number'
          placeholder='e.g 5 months (optional)'
          value={gracePeriod}
          onChange={(e) => setGracePeriod(e.target.value)}
          className='grace-period-box'
        />
        <p className='info-text'>Period during which you only pay interest (if applicable)</p>
        <button onClick={calculate} className='calculate-button'>Calculate</button>
        <button onClick={clearFields} className='clear-button'>Clear</button>
      </div>

      {showResults && (
        <>
          <section>
            <EmiResult result={result} gracePeriod={gracePeriod} />
          </section>

          <div className='principal-amount-container'>
            <div className='bank-note-icon'>
              <Banknote color='green' size={30} />
            </div>
            <h3 className='amount-label'>Principle Amount</h3>
            <h3 className='amount-value'>₹ {principle}</h3>
          </div>

          <div className='grace-period-container'>
            <div className='calendar-icon'>
              <Calendar size={30} />
            </div>
            <h3 className='grace-period-label'>Grace Period</h3>
            <h3 className='grace-period-value'>{gracePeriod} months</h3>
          </div>

          <div className='total-interest-container'>
            <div className='trending-up-icon'>
              <TrendingUp color='orange' size={30} />
            </div>
            <h3 className='total-interest-label'>Total Interest</h3>
            <h3 className='total-interest-value'>₹ {totalInterest}</h3>
          </div>

          <div className='total-amount-container'>
            <div className='clock-icon'>
              <Clock color='blue' size={30} />
            </div>
            <h3 className='total-amount-label'>Total Amount</h3>
            <h3 className='total-amount-value'>₹ {totalAmount}</h3>
          </div>

          <div className='payment-breakdown-container'>
            <h3 className='payment-breakdown-title'>Payment breakdown</h3>
            <div className='principal-item'>
              <h3 className='principal-label'>Principal</h3>
              <h4>{principalPercent}%</h4>
            </div>
            <div className='progress-bar'>
              <div className='progress principal' style={{ width: `${principalPercent}%` }}></div>
            </div>
            <div className='interest-item'>
              <h3 className='interest-label'>Interest</h3>
              <h4>{interestPercent}%</h4>
            </div>
            <div className='progress-bar'>
              <div className='progress interest' style={{ width: `${interestPercent}%` }}></div>
            </div>
          </div>
        </>
      )}
      <div className='recommended-header'>
        <h3 className='recommended-card-title'>Coming soon section</h3>
        <h4 className='recommended-card-sponsored-label'>Sponsored</h4>
      </div>

      <div className='recomended-section'>
        <RecommendedCard
          title='Best Home Loan Rates'
          subtitle='Starting from 8.25% per annum'
          rating='4.8'
          CTA='Apply Now'
          bgColor='blue'
        />
      </div>

      <p className='desclaimer-text'>
        Interest rates and offers are subject to change. Please verify with respective lenders.
      </p>
    </div>
  );
}

export default CalculateEmi;
