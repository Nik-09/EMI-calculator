import React from "react";
import {ExternalLink, Star} from 'lucide-react';
import './RecommendedCard.css'

function RecommendedCard({title,subtitle,rating,CTA,bgColor}) {
    const rate = parseFloat(rating ?? "0.0"); // Avoids NaN if rating is undefined
    console.log("Props:", { title, subtitle, rating, CTA, bgColor });    
    return(
        <div className="recomended-card" style={{ backgroundColor: bgColor }}>
                <div className="recommended-card-header">
                    <h4 className="card-title">{title}</h4>
                    <div className="rating-badge">
                        <Star className="rating-icon" size = {15}/>
                        <h6 className="rating-value">{rate}</h6>
                    </div>
                </div>
                <h4 className="card-subtitle">{subtitle}</h4>
                <button className="recommended-card-cta">
                    {CTA} <ExternalLink size={16}/>
                </button>
        </div>
    );
}

export default RecommendedCard;