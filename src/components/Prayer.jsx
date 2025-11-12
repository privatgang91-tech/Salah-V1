// src/components/Prayer.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Prayer() {
const [location, setLocation] = useState(null);
const [prayerTimes, setPrayerTimes] = useState(null);
const [error, setError] = useState('');

useEffect(() => {
if ('geolocation' in navigator) {
navigator.geolocation.getCurrentPosition(
(position) => {
const coords = {
lat: position.coords.latitude,
lon: position.coords.longitude,
};
setLocation(coords);
},
(err) => {
setError("Impossible d'accéder à la localisation.");
}
);
} else {
setError("La géolocalisation n'est pas disponible.");
}
}, []);

useEffect(() => {
if (location) {
const { lat, lon } = location;
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

axios
.get(`https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${lon}&method=2&month=${month}&year=${year}`)
.then((res) => {
const todayTimings = res.data.data[day - 1].timings;
setPrayerTimes(todayTimings);
})
.catch((err) => {
setError("Erreur lors de la récupération des horaires.");
});
}
}, [location]);

return (
<div className="hero-section">
<h2>🕌 Horaires de prière</h2>
{error && <p>{error}</p>}

{!location && !error && <p>Chargement de la localisation...</p>}

{prayerTimes ? (
<div className="prayer-info">
{Object.entries(prayerTimes).slice(0, 6).map(([name, time]) => (
<div key={name} className="time-box">
<span className="label">{name}</span>
<span className="time">{time.split(" ")[0]}</span>
</div>
))}
</div>
) : (
!error && location && <p>Chargement des horaires...</p>
)}
</div>
);
}

export default Prayer;
