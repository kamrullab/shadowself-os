import React, { useState, useEffect } from 'react';
import { SystemIcon } from './SystemIcon';
import { Module } from './Module';
import { FileViewer } from './FileViewer';
import { CommandTerminal } from './CommandTerminal';
import { desktopIcons, systemModules } from '../data/systemData';
import { Globe, Facebook, User, Calendar, Activity, Target, Lightbulb, Heart } from 'lucide-react';

export const Desktop: React.FC = () => {
  const [openModules, setOpenModules] = useState<string[]>([]);
  const [openFiles, setOpenFiles] = useState<string[]>([]);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showTaskbar, setShowTaskbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Live clock update every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-hiding taskbar logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show taskbar when scrolling down or near bottom
      if (currentScrollY > lastScrollY || currentScrollY > documentHeight - windowHeight - 100) {
        setShowTaskbar(true);
      } else if (currentScrollY < lastScrollY && currentScrollY < 50) {
        setShowTaskbar(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Show taskbar when mouse is near bottom of screen
      if (e.clientY > window.innerHeight - 100) {
        setShowTaskbar(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY]);

  // Hide taskbar after inactivity
  useEffect(() => {
    if (showTaskbar) {
      const timer = setTimeout(() => {
        if (window.scrollY < 50) {
          setShowTaskbar(false);
        }
      }, 3000); // Hide after 3 seconds of inactivity

      return () => clearTimeout(timer);
    }
  }, [showTaskbar]);

  const handleIconClick = (iconId: string) => {
    const icon = desktopIcons.find(i => i.id === iconId);
    const module = systemModules.find(m => m.id === iconId);
    
    if (module || (icon && (icon.type === 'module' || icon.type === 'app'))) {
      if (!openModules.includes(iconId)) {
        setOpenModules(prev => [...prev, iconId]);
      }
    } else if (icon && (icon.type === 'file' || icon.type === 'folder')) {
      if (!openFiles.includes(iconId)) {
        setOpenFiles(prev => [...prev, iconId]);
      }
    }
  };

  const closeModule = (moduleId: string) => {
    setOpenModules(prev => prev.filter(id => id !== moduleId));
  };

  const closeFile = (fileId: string) => {
    setOpenFiles(prev => prev.filter(id => id !== fileId));
  };

  // Bangladesh time formatting - 12-hour format
  const formatBangladeshTime = (date: Date) => {
    return date.toLocaleTimeString('en-BD', {
      timeZone: 'Asia/Dhaka',
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // 24-hour format for system displays
  const formatBangladeshTime24 = (date: Date) => {
    return date.toLocaleTimeString('en-BD', {
      timeZone: 'Asia/Dhaka',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatBangladeshDate = (date: Date) => {
    return date.toLocaleDateString('en-BD', {
      timeZone: 'Asia/Dhaka',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatBangladeshDateShort = (date: Date) => {
    return date.toLocaleDateString('en-BD', {
      timeZone: 'Asia/Dhaka',
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleQuickAction = (action: string) => {
    // Simulate quick actions
    setQuickActionsOpen(false);
    
    // You could add actual functionality here
    console.log(`Quick action: ${action}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Desktop Content - no bottom padding needed for auto-hiding taskbar */}
      <div className="relative z-10 p-4 md:p-8 min-h-screen desktop-content">
        {/* Desktop Icons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mb-6 md:mb-8">
          {desktopIcons.map(icon => (
            <SystemIcon
              key={icon.id}
              icon={icon}
              onClick={() => handleIconClick(icon.id)}
            />
          ))}
        </div>

        {/* System Modules Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6 md:mb-8">
          {systemModules.map(module => (
            <SystemIcon
              key={module.id}
              icon={{
                id: module.id,
                name: module.name,
                icon: module.icon,
                type: 'module' as const,
                color: 'text-cyan-400'
              }}
              onClick={() => handleIconClick(module.id)}
            />
          ))}
        </div>

        {/* Enhanced System Stats with Better Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:mb-12">
          <div className="bg-black bg-opacity-60 border border-green-500 rounded-lg p-6 md:p-8 glow-border">
            <div className="text-center">
              <div className="text-green-400 font-mono text-sm md:text-base mb-3">System Health</div>
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">87%</div>
              <div className="text-xs md:text-sm text-gray-400">Optimal Performance</div>
              <div className="mt-4 bg-gray-800 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full w-[87%] glow-border"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-black bg-opacity-60 border border-blue-500 rounded-lg p-6 md:p-8 glow-border">
            <div className="text-center">
              <div className="text-blue-400 font-mono text-sm md:text-base mb-3">Authenticity Level</div>
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">73%</div>
              <div className="text-xs md:text-sm text-gray-400">Steadily Increasing</div>
              <div className="mt-4 bg-gray-800 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full w-[73%] glow-border"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-black bg-opacity-60 border border-purple-500 rounded-lg p-6 md:p-8 glow-border">
            <div className="text-center">
              <div className="text-purple-400 font-mono text-sm md:text-base mb-3">Creative Energy</div>
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">90%</div>
              <div className="text-xs md:text-sm text-gray-400">Ready for Creation</div>
              <div className="mt-4 bg-gray-800 rounded-full h-2">
                <div className="bg-purple-400 h-2 rounded-full w-[90%] glow-border"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional System Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-black bg-opacity-50 border border-cyan-500 rounded-lg p-4 text-center">
            <div className="text-cyan-400 font-mono text-xs mb-2">Focus Level</div>
            <div className="text-xl font-bold text-cyan-400">85%</div>
            <div className="text-xs text-gray-400">Peak State</div>
          </div>
          
          <div className="bg-black bg-opacity-50 border border-yellow-500 rounded-lg p-4 text-center">
            <div className="text-yellow-400 font-mono text-xs mb-2">Motivation</div>
            <div className="text-xl font-bold text-yellow-400">92%</div>
            <div className="text-xs text-gray-400">High Drive</div>
          </div>
          
          <div className="bg-black bg-opacity-50 border border-pink-500 rounded-lg p-4 text-center">
            <div className="text-pink-400 font-mono text-xs mb-2">Inspiration</div>
            <div className="text-xl font-bold text-pink-400">78%</div>
            <div className="text-xs text-gray-400">Flowing</div>
          </div>
          
          <div className="bg-black bg-opacity-50 border border-emerald-500 rounded-lg p-4 text-center">
            <div className="text-emerald-400 font-mono text-xs mb-2">Balance</div>
            <div className="text-xl font-bold text-emerald-400">81%</div>
            <div className="text-xs text-gray-400">Stable</div>
          </div>
        </div>

        {/* More content to enable scrolling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-black bg-opacity-50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">Recent Activity</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Terminal session completed</span>
                <span className="text-gray-500 text-xs ml-auto">{formatBangladeshTime(currentTime)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">⚡</span>
                <span>System health check passed</span>
                <span className="text-gray-500 text-xs ml-auto">2 min ago</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">🎨</span>
                <span>Creative session initiated</span>
                <span className="text-gray-500 text-xs ml-auto">5 min ago</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">📊</span>
                <span>Productivity metrics updated</span>
                <span className="text-gray-500 text-xs ml-auto">10 min ago</span>
              </div>
            </div>
          </div>

          <div className="bg-black bg-opacity-50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-purple-400 mb-4">System Insights</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-gray-800 bg-opacity-50 rounded">
                <div className="text-cyan-400 font-semibold">Peak Performance Window</div>
                <div className="text-gray-300">6:00 AM - 10:00 AM (BD Time)</div>
              </div>
              <div className="p-3 bg-gray-800 bg-opacity-50 rounded">
                <div className="text-green-400 font-semibold">Optimal Creative State</div>
                <div className="text-gray-300">Current energy level: 90%</div>
              </div>
              <div className="p-3 bg-gray-800 bg-opacity-50 rounded">
                <div className="text-blue-400 font-semibold">Authenticity Growth</div>
                <div className="text-gray-300">+15% increase this month</div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional content sections for scrolling */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">System Modules Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black bg-opacity-50 border border-blue-500 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-3">Emotion Analyzer</h3>
              <p className="text-gray-300 text-sm mb-4">Real-time emotional climate monitoring with advanced pattern recognition.</p>
              <div className="text-xs text-gray-500">Status: Active • Last scan: 30 seconds ago</div>
            </div>
            
            <div className="bg-black bg-opacity-50 border border-purple-500 rounded-lg p-6">
              <h3 className="text-lg font-bold text-purple-400 mb-3">Vision Compiler</h3>
              <p className="text-gray-300 text-sm mb-4">Compiling scattered visions into executable reality frameworks.</p>
              <div className="text-xs text-gray-500">Status: Compiling • Progress: 87%</div>
            </div>
            
            <div className="bg-black bg-opacity-50 border border-green-500 rounded-lg p-6">
              <h3 className="text-lg font-bold text-green-400 mb-3">Cognitive Defragmenter</h3>
              <p className="text-gray-300 text-sm mb-4">Reorganizing fragmented memories and optimizing thought patterns.</p>
              <div className="text-xs text-gray-500">Status: Optimizing • Efficiency: 92%</div>
            </div>
          </div>
        </div>

        {/* Developer Note - Moved higher up and away from taskbar */}
        <div className="fixed bottom-32 md:bottom-40 right-2 md:right-4 max-w-xs md:max-w-md p-3 md:p-4 bg-black bg-opacity-90 border border-gray-700 rounded-lg text-xs text-gray-500 font-mono z-30">
          <div className="text-green-400 mb-1">// Developer Mode Active</div>
          <div className="hidden md:block">// Note: Taskbar auto-hides like a real OS</div>
          <div>// Scroll down or hover bottom to show taskbar</div>
          <div className="text-cyan-400 mt-2">// 50+ terminal commands available</div>
          <div className="text-yellow-400 mt-1">// Time: Bangladesh (GMT+6)</div>
        </div>

        {/* Extra content to ensure scrolling capability */}
        <div className="h-96 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-6xl mb-4">🌟</div>
            <div className="text-lg font-mono">Scroll down to see the auto-hiding taskbar</div>
            <div className="text-sm mt-2">Or move your mouse to the bottom of the screen</div>
          </div>
        </div>
      </div>

      {/* Auto-Hiding Taskbar */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-black bg-opacity-95 backdrop-blur border-t border-gray-700 p-4 md:p-6 z-40 transition-transform duration-300 ease-in-out ${
          showTaskbar ? 'translate-y-0' : 'translate-y-full'
        }`}
        onMouseEnter={() => setShowTaskbar(true)}
        onMouseLeave={() => {
          // Only hide if not at bottom of page
          if (window.scrollY < window.innerHeight) {
            setTimeout(() => setShowTaskbar(false), 1000);
          }
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 md:space-x-6">
            <button
              onClick={() => setTerminalOpen(!terminalOpen)}
              className="flex items-center space-x-2 md:space-x-3 px-3 md:px-6 py-2 md:py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-green-500 glow-border text-sm md:text-base"
            >
              <span>⚡</span>
              <span className="font-mono hidden sm:inline">Terminal</span>
            </button>

            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 md:space-x-3 px-3 md:px-6 py-2 md:py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-blue-500 glow-border text-sm md:text-base"
            >
              <User size={16} />
              <span className="font-mono hidden sm:inline">Profile</span>
            </button>

            <button
              onClick={() => setQuickActionsOpen(!quickActionsOpen)}
              className="flex items-center space-x-2 md:space-x-3 px-3 md:px-6 py-2 md:py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-purple-500 glow-border text-sm md:text-base"
            >
              <Lightbulb size={16} />
              <span className="font-mono hidden sm:inline">Quick Actions</span>
            </button>
            
            {/* Active windows indicator */}
            <div className="flex items-center space-x-2">
              {openModules.map(moduleId => {
                const module = systemModules.find(m => m.id === moduleId);
                const icon = desktopIcons.find(i => i.id === moduleId);
                const displayIcon = module?.icon || icon?.icon;
                return (
                  <div
                    key={moduleId}
                    className="px-3 py-2 bg-blue-600 bg-opacity-50 rounded text-sm font-mono cursor-pointer hover:bg-opacity-70 transition-colors"
                    onClick={() => {/* Focus window logic could go here */}}
                  >
                    {displayIcon}
                  </div>
                );
              })}
              {openFiles.map(fileId => {
                const file = desktopIcons.find(f => f.id === fileId);
                return (
                  <div
                    key={fileId}
                    className="px-3 py-2 bg-cyan-600 bg-opacity-50 rounded text-sm font-mono cursor-pointer hover:bg-opacity-70 transition-colors"
                    onClick={() => {/* Focus window logic could go here */}}
                  >
                    {file?.icon}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Enhanced Live Clock and System Info - Bangladesh Time */}
          <div className="text-sm md:text-base text-gray-400 font-mono text-right">
            <div className="hidden md:block text-xs text-gray-500 mb-1">ShadowSelf OS | User: Kamrul | BD Time</div>
            <div className="flex flex-col md:flex-row md:space-x-6">
              <div className="text-green-400 font-bold text-lg md:text-xl">{formatBangladeshTime(currentTime)}</div>
              <div className="hidden md:block text-gray-300">{formatBangladeshDateShort(currentTime)}</div>
              <div className="md:hidden text-sm text-gray-300">{formatBangladeshDateShort(currentTime)}</div>
            </div>
            <div className="text-xs text-cyan-400 mt-1">GMT+6 • Asia/Dhaka</div>
          </div>
        </div>
      </div>

      {/* Open Modules */}
      {openModules.map((moduleId, index) => {
        const module = systemModules.find(m => m.id === moduleId);
        const icon = desktopIcons.find(i => i.id === moduleId);
        
        // Handle both system modules and desktop app icons
        const moduleData = module || (icon && {
          id: icon.id,
          name: icon.name,
          icon: icon.icon,
          description: `${icon.name} application interface`,
          output: icon.content || ['Application loaded successfully.'],
          color: 'border-gray-500'
        });
        
        if (!moduleData) return null;
        
        return (
          <Module
            key={moduleId}
            module={moduleData}
            position={{ 
              x: Math.min(50 + index * 30, window.innerWidth - 350), 
              y: Math.min(50 + index * 30, window.innerHeight - 400) 
            }}
            onClose={() => closeModule(moduleId)}
          />
        );
      })}

      {/* Open Files */}
      {openFiles.map((fileId, index) => {
        const file = desktopIcons.find(f => f.id === fileId);
        if (!file) return null;
        
        return (
          <FileViewer
            key={fileId}
            file={file}
            position={{ 
              x: Math.min(100 + index * 40, window.innerWidth - 400), 
              y: Math.min(100 + index * 40, window.innerHeight - 350) 
            }}
            onClose={() => closeFile(fileId)}
          />
        );
      })}

      {/* Profile Window */}
      {profileOpen && (
        <div className="fixed inset-2 md:inset-4 bg-black bg-opacity-95 border border-blue-500 rounded-lg shadow-2xl overflow-hidden z-50 glow-border flex flex-col">
          {/* Title Bar */}
          <div className="flex items-center justify-between p-2 md:p-3 bg-gray-900 border-b border-gray-700 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <User size={16} className="text-blue-400" />
              <span className="font-mono font-semibold text-sm md:text-base">User Profile</span>
              <span className="text-xs text-gray-500">v1.0</span>
            </div>
            <button
              onClick={() => setProfileOpen(false)}
              className="p-1 hover:bg-red-600 rounded transition-colors"
            >
              <span className="text-sm">✕</span>
            </button>
          </div>

          {/* Profile Content */}
          <div className="flex-1 p-4 md:p-6 font-mono text-sm overflow-y-auto">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* User Info */}
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">👨‍💻</div>
                <h1 className="text-2xl font-bold text-cyan-400 mb-2">Kamrul Hossain</h1>
                <p className="text-gray-400">Builder • Dreamer • Bridge-Creator</p>
                <p className="text-sm text-gray-500 mt-2">Age: 25 | Location: Bangladesh</p>
                <p className="text-xs text-green-400 mt-1">Local Time: {formatBangladeshTime(currentTime)} | {formatBangladeshDate(currentTime)}</p>
              </div>

              {/* Links Section */}
              <div className="bg-gray-900 bg-opacity-50 rounded-lg p-4 border border-gray-700">
                <h2 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
                  <Globe size={18} className="mr-2" />
                  Connect & Explore
                </h2>
                
                <div className="space-y-3">
                  <a
                    href="https://kamrul.pages.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-black bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-colors border border-gray-600 hover:border-cyan-400"
                  >
                    <Globe size={20} className="text-cyan-400" />
                    <div>
                      <div className="text-white font-semibold">Personal Website</div>
                      <div className="text-xs text-gray-400">kamrul.pages.dev</div>
                    </div>
                  </a>

                  <a
                    href="https://fb.com/elitekamrul"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-black bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-colors border border-gray-600 hover:border-blue-400"
                  >
                    <Facebook size={20} className="text-blue-400" />
                    <div>
                      <div className="text-white font-semibold">Facebook</div>
                      <div className="text-xs text-gray-400">fb.com/elitekamrul</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* System Info */}
              <div className="bg-gray-900 bg-opacity-50 rounded-lg p-4 border border-gray-700">
                <h2 className="text-lg font-bold text-green-400 mb-4">System Information</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">OS Version:</span>
                    <span className="text-green-400">ShadowSelf OS v2.5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">User Level:</span>
                    <span className="text-blue-400">Advanced Builder</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Time Zone:</span>
                    <span className="text-purple-400">Asia/Dhaka (GMT+6)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">System Time:</span>
                    <span className="text-cyan-400">{formatBangladeshTime(currentTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Primary Drive:</span>
                    <span className="text-purple-400">Meaningful Impact</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Core Values:</span>
                    <span className="text-cyan-400">Authenticity, Growth, Connection</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Mission:</span>
                    <span className="text-yellow-400">Trust the vision. Execute with courage.</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 bg-opacity-50 rounded-lg p-4 border border-gray-700 text-center">
                  <div className="text-2xl font-bold text-green-400">87%</div>
                  <div className="text-xs text-gray-400">System Health</div>
                </div>
                <div className="bg-gray-900 bg-opacity-50 rounded-lg p-4 border border-gray-700 text-center">
                  <div className="text-2xl font-bold text-blue-400">73%</div>
                  <div className="text-xs text-gray-400">Authenticity</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Panel */}
      {quickActionsOpen && (
        <div className="fixed inset-2 md:inset-4 bg-black bg-opacity-95 border border-purple-500 rounded-lg shadow-2xl overflow-hidden z-50 glow-border flex flex-col">
          {/* Title Bar */}
          <div className="flex items-center justify-between p-2 md:p-3 bg-gray-900 border-b border-gray-700 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <Lightbulb size={16} className="text-purple-400" />
              <span className="font-mono font-semibold text-sm md:text-base">Quick Actions</span>
              <span className="text-xs text-gray-500">v1.0</span>
            </div>
            <button
              onClick={() => setQuickActionsOpen(false)}
              className="p-1 hover:bg-red-600 rounded transition-colors"
            >
              <span className="text-sm">✕</span>
            </button>
          </div>

          {/* Quick Actions Content */}
          <div className="flex-1 p-4 md:p-6 font-mono text-sm overflow-y-auto">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Current Time Display */}
              <div className="bg-gray-900 bg-opacity-50 rounded-lg p-4 border border-gray-700 text-center">
                <h2 className="text-lg font-bold text-cyan-400 mb-2">Bangladesh Time</h2>
                <div className="text-2xl font-bold text-green-400 mb-1">{formatBangladeshTime(currentTime)}</div>
                <div className="text-sm text-gray-400">{formatBangladeshDate(currentTime)}</div>
                <div className="text-xs text-purple-400 mt-1">GMT+6 (Asia/Dhaka)</div>
              </div>

              {/* Productivity Actions */}
              <div className="bg-gray-900 bg-opacity-50 rounded-lg p-4 border border-gray-700">
                <h2 className="text-lg font-bold text-purple-400 mb-4 flex items-center">
                  <Target size={18} className="mr-2" />
                  Productivity Boost
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleQuickAction('focus_mode')}
                    className="flex items-center space-x-3 p-3 bg-black bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-colors border border-gray-600 hover:border-cyan-400"
                  >
                    <Target size={20} className="text-cyan-400" />
                    <div className="text-left">
                      <div className="text-white font-semibold">Focus Mode</div>
                      <div className="text-xs text-gray-400">90-min deep work</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickAction('habit_check')}
                    className="flex items-center space-x-3 p-3 bg-black bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-colors border border-gray-600 hover:border-green-400"
                  >
                    <Activity size={20} className="text-green-400" />
                    <div className="text-left">
                      <div className="text-white font-semibold">Habit Check</div>
                      <div className="text-xs text-gray-400">Daily progress</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickAction('creative_session')}
                    className="flex items-center space-x-3 p-3 bg-black bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-colors border border-gray-600 hover:border-pink-400"
                  >
                    <Lightbulb size={20} className="text-pink-400" />
                    <div className="text-left">
                      <div className="text-white font-semibold">Creative Session</div>
                      <div className="text-xs text-gray-400">Inspiration time</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickAction('wellness_check')}
                    className="flex items-center space-x-3 p-3 bg-black bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-colors border border-gray-600 hover:border-emerald-400"
                  >
                    <Heart size={20} className="text-emerald-400" />
                    <div className="text-left">
                      <div className="text-white font-semibold">Wellness Check</div>
                      <div className="text-xs text-gray-400">Health scan</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Daily Insights */}
              <div className="bg-gray-900 bg-opacity-50 rounded-lg p-4 border border-gray-700">
                <h2 className="text-lg font-bold text-yellow-400 mb-4">Today's Insights</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">✓</span>
                    <span>Morning reflection completed (47-day streak)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400">⏳</span>
                    <span>Creative energy at 90% - optimal for building</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-400">🎯</span>
                    <span>Focus window: 6:00 AM - 10:00 AM (Peak time)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-400">💡</span>
                    <span>Inspiration level: High - perfect for innovation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">🕐</span>
                    <span>Current BD Time: {formatBangladeshTime(currentTime)}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-900 bg-opacity-50 rounded-lg p-3 border border-gray-700 text-center">
                  <div className="text-lg font-bold text-green-400">78%</div>
                  <div className="text-xs text-gray-400">Productivity</div>
                </div>
                <div className="bg-gray-900 bg-opacity-50 rounded-lg p-3 border border-gray-700 text-center">
                  <div className="text-lg font-bold text-purple-400">90%</div>
                  <div className="text-xs text-gray-400">Creativity</div>
                </div>
                <div className="bg-gray-900 bg-opacity-50 rounded-lg p-3 border border-gray-700 text-center">
                  <div className="text-lg font-bold text-blue-400">85%</div>
                  <div className="text-xs text-gray-400">Focus</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Command Terminal */}
      {terminalOpen && (
        <CommandTerminal onClose={() => setTerminalOpen(false)} />
      )}
    </div>
  );
};