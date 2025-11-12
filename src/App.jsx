import { useState } from 'react';
import Prayer from './components/Prayer';
import Qibla from './components/Qibla';
import Quran from './components/Quran';
import Settings from './components/Settings';
import Hero from './components/Hero';
import './App.css';

function App() {
const [activeTab, setActiveTab] = useState('home');

const renderSection = () => {
switch (activeTab) {
case 'prayer':
return <Prayer />;
case 'qibla':
return <Qibla />;
case 'quran':
return <Quran />;
case 'settings':
return <Settings />;
default:
return (
<p style={{ color: '#ccc', marginTop: '1rem' }}>
Bienvenue dans l'application Salah. Commence ta prière avec sincérité. 👐
</p>
);
}
};

return (
<div>
<header>
<h1>SALAH - Application</h1>
<nav>
<button
className={activeTab === 'prayer' ? 'active' : ''}
onClick={() => setActiveTab('prayer')}
>
🕌 Prière
</button>
<button
className={activeTab === 'qibla' ? 'active' : ''}
onClick={() => setActiveTab('qibla')}
>
🧭 Qibla
</button>
<button
className={activeTab === 'quran' ? 'active' : ''}
onClick={() => setActiveTab('quran')}
>
📖 Coran
</button>
<button
className={activeTab === 'settings' ? 'active' : ''}
onClick={() => setActiveTab('settings')}
>
⚙️ Paramètres
</button>
</nav>
</header>

<main>
{activeTab === 'home' && <Hero />}
{renderSection()}
</main>
</div>
);
}

export default App;
