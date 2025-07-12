import React, { useState } from 'react';
import './EmiResult.css';

function EmiResult({result, gracePeriod}) {
    return(
        <div className='emi-result-container'>
            <p className='emi-result-header'>Monthy Emi</p>
            <h2 className='emi-result-value'>₹ {result}</h2>
            {gracePeriod > 0 && (
                <p className='grace-period-info'>   
                    After {gracePeriod} months grace period
                </p>
            )}
        </div>
    )
}

export default EmiResult;