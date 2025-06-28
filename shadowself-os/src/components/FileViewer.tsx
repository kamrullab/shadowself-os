import React from 'react';
import { X, File, Folder } from 'lucide-react';
import { DesktopIcon } from '../data/systemData';

interface FileViewerProps {
  file: DesktopIcon;
  position: { x: number; y: number };
  onClose: () => void;
}

export const FileViewer: React.FC<FileViewerProps> = ({ file, position, onClose }) => {
  return (
    <div
      style={{
        left: Math.min(position.x, window.innerWidth - 400),
        top: Math.min(position.y, window.innerHeight - 300),
      }}
      className="fixed z-50 bg-black bg-opacity-95 border-2 border-cyan-500 rounded-lg shadow-2xl overflow-hidden w-80 md:w-96 glow-border-strong"
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between p-3 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          {file.type === 'folder' ? (
            <Folder size={16} className="text-cyan-400" />
          ) : (
            <File size={16} className="text-cyan-400" />
          )}
          <span className="font-mono font-semibold text-sm truncate">{file.name}</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-red-600 rounded transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 font-mono text-xs md:text-sm max-h-64 md:max-h-80 overflow-y-auto">
        {file.content ? (
          <div className="space-y-1">
            {file.content.map((line, index) => (
              <div
                key={index}
                className={`${
                  line.includes('ARCHIVE') || line.includes('CONFIGURATION') || line.includes('PACKAGE') || line.includes('LOG') || line.includes('SAVE FILE') || line.includes('MEMORY FILE')
                    ? 'text-cyan-400 font-bold'
                    : line.startsWith('▓')
                    ? 'text-green-400'
                    : line.startsWith('•') || line.startsWith('>')
                    ? 'text-yellow-300'
                    : line.startsWith('STATUS') || line.startsWith('RECOMMENDATION') || line.startsWith('SYSTEM NOTE') || line.startsWith('MISSION')
                    ? 'text-green-300'
                    : line.startsWith('CONFLICTS') || line.startsWith('WARNING')
                    ? 'text-red-400'
                    : line.startsWith('LAST MODIFIED') || line.startsWith('SAVE POINT') || line.startsWith('NEXT LEVEL')
                    ? 'text-purple-400'
                    : 'text-gray-300'
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 italic">
            No content available for this {file.type}.
          </div>
        )}
      </div>
    </div>
  );
};