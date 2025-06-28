import React, { useState, useRef, useEffect } from 'react';
import { X, Minimize2 } from 'lucide-react';
import { SystemModule } from '../data/systemData';

interface ModuleProps {
  module: SystemModule;
  position: { x: number; y: number };
  onClose: () => void;
}

export const Module: React.FC<ModuleProps> = ({ module, position, onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(position);
  const [isDragging, setIsDragging] = useState(false);
  const moduleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure module stays within viewport bounds
    const updatePosition = () => {
      if (moduleRef.current) {
        const rect = moduleRef.current.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;
        
        setCurrentPosition(prev => ({
          x: Math.max(0, Math.min(prev.x, maxX)),
          y: Math.max(0, Math.min(prev.y, maxY))
        }));
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return; // Disable dragging on mobile
    
    setIsDragging(true);
    const startX = e.clientX - currentPosition.x;
    const startY = e.clientY - currentPosition.y;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = Math.max(0, Math.min(e.clientX - startX, window.innerWidth - 400));
      const newY = Math.max(0, Math.min(e.clientY - startY, window.innerHeight - 300));
      
      setCurrentPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    setIsDragging(true);
    const startX = touch.clientX - currentPosition.x;
    const startY = touch.clientY - currentPosition.y;

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      e.preventDefault();
      
      const touch = e.touches[0];
      const newX = Math.max(0, Math.min(touch.clientX - startX, window.innerWidth - 300));
      const newY = Math.max(0, Math.min(touch.clientY - startY, window.innerHeight - 250));
      
      setCurrentPosition({ x: newX, y: newY });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  if (isMinimized) {
    return (
      <div
        style={{
          left: currentPosition.x,
          top: currentPosition.y,
        }}
        className="fixed z-50 bg-gray-900 border border-gray-600 rounded-lg p-2 cursor-pointer"
        onClick={() => setIsMinimized(false)}
      >
        <div className="flex items-center space-x-2">
          <span className="text-lg">{module.icon}</span>
          <span className="text-sm font-mono">{module.name}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={moduleRef}
      style={{
        left: currentPosition.x,
        top: currentPosition.y,
      }}
      className={`fixed z-40 bg-black bg-opacity-95 border-2 ${module.color} rounded-lg shadow-2xl overflow-hidden ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      } glow-border-strong w-80 md:w-96`}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between p-2 md:p-3 bg-gray-900 border-b border-gray-700 touch-manipulation"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="flex items-center space-x-2">
          <span className="text-lg">{module.icon}</span>
          <span className="font-mono font-semibold text-sm md:text-base truncate">{module.name}</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            <Minimize2 size={14} />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-600 rounded transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 md:p-4 font-mono text-xs md:text-sm max-h-64 md:max-h-96 overflow-y-auto">
        <div className="text-gray-400 mb-3 md:mb-4 italic text-xs md:text-sm">
          {module.description}
        </div>
        <div className="space-y-1">
          {module.output.map((line, index) => (
            <div
              key={index}
              className={`${
                line.startsWith('CURRENT') || line.startsWith('SHADOW') || line.startsWith('DEFRAGMENTATION') || line.startsWith('IMPOSTER') || line.startsWith('REPRESSION') || line.startsWith('VISION')
                  ? 'text-cyan-400 font-bold'
                  : line.startsWith('▓')
                  ? 'text-green-400'
                  : line.startsWith('•') || line.startsWith('>') || line.startsWith('├') || line.startsWith('└')
                  ? 'text-yellow-300'
                  : line.startsWith('WARNING') || line.startsWith('RECOMMENDATION')
                  ? 'text-red-400'
                  : line.startsWith('STATUS') || line.startsWith('SYSTEM NOTE') || line.startsWith('EXECUTABLE')
                  ? 'text-green-300'
                  : line.startsWith('TOGGLE OPTIONS') || line.startsWith('[')
                  ? 'text-purple-400'
                  : 'text-gray-300'
              }`}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};