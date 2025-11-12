// src/components/Qibla.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Qibla() {
const [angle, setAngle] = useState(null);
const [error, setError] = useState('');

useEffect(() => {
if ('geolocation' in navigator) {
navigator.geolocation.getCurrentPosition(
(position) => {
const { latitude, longitude } = position.coords;
axios
.get(`https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`)
.then((res) => {
setAngle(res.data.data.direction);
})
.catch(() => {
setError("Erreur lors de la récupération de la Qibla.");
});
},
() => {
setError("Localisation refusée ou inaccessible.");
}
);
} else {
setError("La géolocalisation n'est pas disponible.");
}
}, []);

return (
<div className="hero-section">
<h2>🧭 Direction de la Qibla</h2>
{error && <p>{error}</p>}
{angle !== null ? (
<>
<div className="compass">
<svg viewBox="0 0 100 100" className="compass-svg">
<circle cx="50" cy="50" r="45" stroke="#00ffaa" strokeWidth="2" fill="none" />
<text x="50" y="15" textAnchor="middle" fill="#fff" fontSize="10">N</text>
<text x="95" y="55" textAnchor="middle" fill="#fff" fontSize="10">E</text>
<text x="50" y="98" textAnchor="middle" fill="#fff" fontSize="10">S</text>
<text x="5" y="55" textAnchor="middle" fill="#fff" fontSize="10">O</text>
<polygon
points="50,20 45,50 50,45 55,50"
fill="#00ffaa"
transform={`rotate(${angle}, 50, 50)`}
/>
</svg>
<p style={{ marginTop: '1rem' }}>
➤ La Qibla est à <strong>{angle.toFixed(2)}°</strong> du nord.
</p>
</div>
</>
) : (
!error && <p>Chargement de la direction de la Qibla...</p>
)}
</div>
);
}

export default Qibla;
