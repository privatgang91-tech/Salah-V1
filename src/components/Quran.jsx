// src/components/Quran.jsx
import { useState, useEffect } from 'react';

function Quran() {
const [surah, setSurah] = useState([]);
const [selectedSurah, setSelectedSurah] = useState(1);
const [language, setLanguage] = useState('fr.hamidullah');

useEffect(() => {
fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/${language}`)
.then(res => res.json())
.then(data => {
if (data.data && data.data.ayahs) {
setSurah(data.data.ayahs);
}
})
.catch(error => console.error('Erreur chargement sourate :', error));
}, [selectedSurah, language]);

const handleChangeSurah = (e) => {
setSelectedSurah(e.target.value);
};

const handleChangeLang = (e) => {
setLanguage(e.target.value);
};

return (
<div>
<h2>📖 Lecture du Coran</h2>

<div style={{ marginBottom: '1rem' }}>
<label>Choisir une sourate : </label>
<select onChange={handleChangeSurah} value={selectedSurah}>
{Array.from({ length: 114 }, (_, i) => (
<option key={i + 1} value={i + 1}>
Sourate {i + 1}
</option>
))}
</select>

<label style={{ marginLeft: '1rem' }}>Langue : </label>
<select onChange={handleChangeLang} value={language}>
<option value="fr.hamidullah">Français</option>
<option value="en.asad">Anglais</option>
<option value="ar.alafasy">Arabe</option>
</select>
</div>

<div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
{surah.map((ayah) => (
<p key={ayah.number}><strong>{ayah.numberInSurah}.</strong> {ayah.text}</p>
))}
</div>
</div>
);
}

export default Quran;
