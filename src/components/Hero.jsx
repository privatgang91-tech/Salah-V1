// src/components/Hero.jsx

import React from 'react';
import { FaMapMarkerAlt, FaSun } from 'react-icons/fa';

const Hero = () => {
return (
<div className="hero-section">
<h2>🕌 Prochaine prière</h2>
<div className="prayer-info">
<div className="time-box">
<span className="label">Dohr</span>
<span className="time">12:48</span>
</div>
<div className="location-box">
<FaMapMarkerAlt />
<span>Poitiers, 🇫🇷</span>
</div>
</div>
</div>
);
};

export default Hero;
