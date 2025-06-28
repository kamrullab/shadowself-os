import React, { useState, useEffect } from 'react';
import { bootSequence } from '../data/systemData';

interface BootScreenProps {
  onBootComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<typeof bootSequence>([]);

  useEffect(() => {
    if (currentStep < bootSequence.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, bootSequence[currentStep]]);
        setCurrentStep(prev => prev + 1);
      }, bootSequence[currentStep].delay);
      
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        onBootComplete();
      }, 1500);
      
      return () => clearTimeout(finalTimer);
    }
  }, [currentStep, onBootComplete]);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8 flex flex-col justify-center">
      <div className="mb-8">
        <div className="text-4xl font-bold mb-4 text-center glow-text">
          ◉ ShadowSelf OS ◉
        </div>
        <div className="text-center text-gray-500 mb-8">
          Mind Operating System v2.5.0
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-2">
        {displayedLines.map((line, index) => (
          <div key={index} className="flex items-center space-x-4 opacity-0 animate-fadeIn">
            <span className="text-gray-600">{line.timestamp}</span>
            <span className={`
              ${line.status === '✓' ? 'text-green-400' : 'text-yellow-400'}
              font-bold
            `}>
              [{line.status}]
            </span>
            <span className="flex-1">{line.message}</span>
          </div>
        ))}
        
        {currentStep === bootSequence.length && (
          <div className="mt-8 text-center">
            <div className="animate-pulse text-cyan-400">
              Loading desktop environment...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};