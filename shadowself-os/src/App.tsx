import React, { useState, useEffect } from 'react';
import { BootScreen } from './components/BootScreen';
import { Desktop } from './components/Desktop';
import { useSystem } from './hooks/useSystem';
import './styles/animations.css';

function App() {
  const { systemState, bootSystem } = useSystem();
  const [showBoot, setShowBoot] = useState(true);

  const handleBootComplete = () => {
    setShowBoot(false);
    bootSystem();
  };

  if (showBoot) {
    return <BootScreen onBootComplete={handleBootComplete} />;
  }

  return <Desktop />;
}

export default App;