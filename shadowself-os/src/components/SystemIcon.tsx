import React from 'react';
import { DesktopIcon } from '../data/systemData';

interface SystemIconProps {
  icon: DesktopIcon;
  onClick: () => void;
}

export const SystemIcon: React.FC<SystemIconProps> = ({ icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center p-2 md:p-4 rounded-lg hover:bg-gray-800 hover:bg-opacity-50 cursor-pointer transition-all duration-200 group touch-manipulation"
    >
      <div className="text-2xl md:text-4xl mb-1 md:mb-2 transform group-hover:scale-110 transition-transform">
        {icon.icon}
      </div>
      <div className={`text-xs md:text-sm font-mono text-center break-all ${icon.color} group-hover:glow-text leading-tight`}>
        {icon.name}
      </div>
    </div>
  );
};