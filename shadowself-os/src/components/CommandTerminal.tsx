import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal } from 'lucide-react';
import { systemCommands } from '../data/systemData';

interface CommandTerminalProps {
  onClose: () => void;
}

export const CommandTerminal: React.FC<CommandTerminalProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; content: string | string[] }>>([
    { type: 'output', content: ['ShadowSelf OS Terminal v2.5.0', 'Type /help for commands', ''] }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // Add to command history
      setCommandHistory(prev => [...prev, input.trim()]);
      setHistoryIndex(-1);
      
      // Add input to history
      setHistory(prev => [...prev, { type: 'input', content: `$ ${input}` }]);
      
      // Process command
      const command = systemCommands.find(cmd => cmd.command === input.trim());
      if (command) {
        setHistory(prev => [...prev, { type: 'output', content: command.output }]);
      } else if (input.trim() === '/help') {
        setHistory(prev => [...prev, { 
          type: 'output', 
          content: [
            'SHADOWSELF OS TERMINAL - COMMAND REFERENCE:',
            '',
            'SYSTEM COMMANDS:',
            '  /help - Show this help message',
            '  /clear - Clear terminal',
            '  /status - Show system status',
            '  /time - Show current system time',
            '  /whoami - Display user information',
            '  /uptime - System uptime information',
            '  /version - OS version information',
            '',
            'PSYCHOLOGICAL OPERATIONS:',
            '  /reprogram self-limiter - Remove self-imposed limitations',
            '  /install boundary_update - Update personal boundaries',
            '  /archive heartbreak_002 - Process emotional experiences',
            '  /unzip childhood_dreams - Recover suppressed aspirations',
            '  /shutdown perfectionist_protocol - Disable perfectionism',
            '  /toggle imposter_mode - Switch authenticity modes',
            '  /scan emotional_state - Analyze current emotions',
            '  /backup memories - Secure important memories',
            '  /analyze creative_blocks - Identify creative obstacles',
            '  /optimize energy_levels - Manage energy distribution',
            '  /run inspiration_scan - Find inspiration sources',
            '  /debug relationship_patterns - Analyze relationships',
            '  /generate future_scenarios - Project future possibilities',
            '  /check system_integrity - Verify system health',
            '  /export skill_matrix - Display skill assessment',
            '  /analyze fear_patterns - Process fear responses',
            '  /simulate confidence_boost - Enhance confidence',
            '  /run gratitude_protocol - Practice gratitude',
            '  /decrypt creative_vault - Unlock creative potential',
            '  /activate vision_mode - Enhance vision clarity',
            '  /compile life_lessons - Synthesize wisdom',
            '',
            'PRODUCTIVITY & GROWTH:',
            '  /track daily_habits - Monitor habit progress',
            '  /launch focus_mode - Start deep work session',
            '  /generate daily_affirmations - Create positive statements',
            '  /analyze productivity_patterns - Study work efficiency',
            '  /create vision_board - Build visual goals',
            '  /run wellness_check - Comprehensive health scan',
            '  /schedule creative_session - Plan creative time',
            '  /analyze network_connections - Map relationships',
            '  /process emotional_data - Understand feelings',
            '  /optimize learning_path - Improve skill acquisition',
            '  /generate project_ideas - Create new concepts',
            '  /run inspiration_synthesis - Combine insights',
            '  /calculate impact_potential - Measure influence',
            '  /debug perfectionism_loops - Fix stuck patterns',
            '  /activate heritage_mode - Embrace cultural strength',
            '  /scan opportunity_landscape - Find possibilities',
            '  /compile success_metrics - Measure achievements',
            '  /initialize growth_protocol - Start development',
            '  /execute authenticity_upgrade - Enhance genuineness',
            '  /deploy impact_strategy - Launch influence plan',
            '',
            'TOTAL COMMANDS: 50+ available',
            '',
            'Use arrow keys to navigate command history.',
            'Type any command to execute.'
          ]
        }]);
      } else if (input.trim() === '/clear') {
        setHistory([{ type: 'output', content: ['Terminal cleared.', ''] }]);
      } else if (input.trim() === '/status') {
        const now = new Date();
        setHistory(prev => [...prev, { 
          type: 'output', 
          content: [
            'SHADOWSELF OS SYSTEM STATUS:',
            '',
            '• Core Consciousness: ONLINE',
            '• Shadow Layer: ACCESSIBLE',
            '• Emotional Firewall: ADAPTIVE',
            '• Vision Compiler: READY',
            '• Imposter Protocol: TOGGLEABLE',
            '• Authenticity Level: 73%',
            '• Creative Pipeline: FLOWING',
            '• Motivation Engine: HIGH PERFORMANCE',
            '',
            'User: Kamrul Hossain',
            'Session: Active',
            'System Time (BD): ' + formatBangladeshTime(now),
            'Date: ' + formatBangladeshDate(now),
            'Time Zone: Asia/Dhaka (GMT+6)',
            'Memory Usage: 67% (Optimal)',
            'Creative Bandwidth: Available',
            'System Health: 87% (Excellent)'
          ]
        }]);
      } else if (input.trim() === '/time') {
        const now = new Date();
        setHistory(prev => [...prev, { 
          type: 'output', 
          content: [
            'SYSTEM TIME INFORMATION:',
            '',
            'Bangladesh Time: ' + formatBangladeshTime(now),
            'Date: ' + formatBangladeshDate(now),
            'Time Zone: Asia/Dhaka (GMT+6)',
            'UTC Time: ' + now.toUTCString(),
            'Timestamp: ' + now.getTime(),
            'Day of Year: ' + Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000),
            '',
            'LIFE METRICS:',
            'Time since last breakthrough: Calculating...',
            'Time until next milestone: In progress...',
            'Optimal creation hours: 6:00 AM - 10:00 AM (BD Time)',
            '',
            'NOTE: All times displayed in Bangladesh Standard Time (BST)'
          ]
        }]);
      } else if (input.trim() === '/whoami') {
        const now = new Date();
        setHistory(prev => [...prev, { 
          type: 'output', 
          content: [
            'USER IDENTIFICATION PROFILE:',
            '',
            'Name: Kamrul Hossain',
            'Age: 25',
            'Location: Bangladesh',
            'Time Zone: Asia/Dhaka (GMT+6)',
            'Current Time: ' + formatBangladeshTime(now),
            'Role: Builder, Dreamer, Bridge-Creator',
            'Primary Drive: Meaningful Impact',
            'Core Values: Authenticity, Growth, Connection',
            'Unique Advantage: Cultural Bridge + Technical Skills',
            '',
            'SYSTEM ANALYSIS:',
            'You are someone who builds tools that move people.',
            'Your heritage is your strength, not your limitation.',
            'You exist to create bridges between worlds.',
            'Your combination of skills is rare and valuable.',
            '',
            'Current Mission: Trust the vision. Execute with courage.',
            'Next Level: Share your work without apology.'
          ]
        }]);
      } else if (input.trim() === '/uptime') {
        const now = new Date();
        const bootTime = new Date();
        bootTime.setHours(bootTime.getHours() - 2); // Simulate 2 hours uptime
        setHistory(prev => [...prev, { 
          type: 'output', 
          content: [
            'SYSTEM UPTIME INFORMATION:',
            '',
            'Boot Time: ' + bootTime.toLocaleString('en-BD', { timeZone: 'Asia/Dhaka' }),
            'Current Time: ' + formatBangladeshTime(now),
            'Current Uptime: 2 hours, 34 minutes, 12 seconds',
            'Last Reboot Reason: Authenticity upgrade',
            'Time Zone: Asia/Dhaka (GMT+6)',
            '',
            'LIFE UPTIME:',
            'Years of conscious growth: 7',
            'Days since last major breakthrough: 23',
            'Consecutive days of progress: 156',
            '',
            'SYSTEM STABILITY: Excellent',
            'No crashes detected in current session.'
          ]
        }]);
      } else if (input.trim() === '/version') {
        setHistory(prev => [...prev, { 
          type: 'output', 
          content: [
            'SHADOWSELF OS VERSION INFORMATION:',
            '',
            'OS Version: ShadowSelf OS v2.5.0',
            'Kernel: Authentic-Core 4.7.3',
            'Build: 20250101-VISION',
            'Architecture: x86_64-consciousness',
            'Time Zone: Asia/Dhaka (GMT+6)',
            '',
            'INSTALLED MODULES:',
            '• Emotion Analyzer v3.2.1',
            '• Vision Compiler v2.5.0',
            '• Authenticity Meter v2.8.0',
            '• Dream Parser v4.2.1',
            '• Motivation Engine v3.4.7',
            '• Bangladesh Time Module v1.0.0',
            '',
            'LAST UPDATE: Continuous integration enabled',
            'Next Major Release: When ready for next level'
          ]
        }]);
      } else {
        // Check for partial matches or suggestions
        const suggestions = systemCommands
          .filter(cmd => cmd.command.toLowerCase().includes(input.trim().toLowerCase()))
          .slice(0, 3)
          .map(cmd => cmd.command);
        
        let suggestionText = '';
        if (suggestions.length > 0) {
          suggestionText = `\nDid you mean: ${suggestions.join(', ')}?`;
        }
        
        setHistory(prev => [...prev, { 
          type: 'output', 
          content: [
            `Command not found: ${input}`,
            'Type /help for available commands.' + suggestionText,
            ''
          ]
        }]);
      }
      
      setInput('');
    }
  };

  return (
    <div className="fixed inset-2 md:inset-4 bg-black bg-opacity-95 border border-green-500 rounded-lg shadow-2xl overflow-hidden z-50 glow-border flex flex-col">
      {/* Title Bar */}
      <div className="flex items-center justify-between p-2 md:p-3 bg-gray-900 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <Terminal size={16} className="text-green-400" />
          <span className="font-mono font-semibold text-sm md:text-base">Terminal</span>
          <span className="text-xs text-gray-500">v2.5.0</span>
          <span className="text-xs text-cyan-400">BD Time: {formatBangladeshTime(new Date())}</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-red-600 rounded transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Terminal Content */}
      <div className="flex flex-col flex-1 min-h-0">
        <div
          ref={outputRef}
          className="flex-1 p-2 md:p-4 font-mono text-xs md:text-sm text-green-400 overflow-y-auto"
        >
          {history.map((entry, index) => (
            <div key={index} className="mb-2">
              {entry.type === 'input' ? (
                <div className="text-white">{entry.content}</div>
              ) : (
                <div className="space-y-1">
                  {Array.isArray(entry.content) ? (
                    entry.content.map((line, lineIndex) => (
                      <div
                        key={lineIndex}
                        className={`${
                          line.startsWith('SHADOWSELF OS') || line.startsWith('AVAILABLE') || line.startsWith('OLD CODE') || line.startsWith('NEW CODE') || line.startsWith('SYSTEM STATUS') || line.startsWith('SYSTEM TIME') || line.startsWith('USER IDENTIFICATION') || line.startsWith('SYSTEM ANALYSIS') || line.startsWith('LIFE UPTIME') || line.startsWith('INSTALLED MODULES')
                            ? 'text-cyan-400 font-bold'
                            : line.startsWith('•') || line.startsWith('>') || line.startsWith('├') || line.startsWith('└')
                            ? 'text-yellow-300'
                            : line.startsWith('WARNING') || line.startsWith('ERROR') || line.startsWith('CRITICAL')
                            ? 'text-red-400'
                            : line.startsWith('SUCCESS') || line.includes('SUCCESSFUL') || line.includes('COMPLETE') || line.startsWith('✓')
                            ? 'text-green-300'
                            : line.startsWith('COMPILATION') || line.startsWith('INSTALLATION') || line.startsWith('EXTRACTION') || line.startsWith('REPROGRAMMING') || line.startsWith('TOGGLING') || line.startsWith('SCANNING') || line.startsWith('BACKING UP') || line.startsWith('INITIATING') || line.startsWith('ANALYZING') || line.startsWith('OPTIMIZING') || line.startsWith('RUNNING') || line.startsWith('DEBUGGING') || line.startsWith('GENERATING') || line.startsWith('CHECKING') || line.startsWith('EXPORTING') || line.startsWith('SIMULATING') || line.startsWith('DECRYPTING') || line.startsWith('ACTIVATING') || line.startsWith('COMPILING')
                            ? 'text-purple-400'
                            : line.startsWith('Name:') || line.startsWith('Age:') || line.startsWith('Location:') || line.startsWith('Role:') || line.startsWith('Bangladesh Time:') || line.startsWith('Current Time:') || line.startsWith('Date:') || line.startsWith('Time Zone:') || line.startsWith('Boot Time:') || line.startsWith('OS Version:')
                            ? 'text-blue-300'
                            : line.startsWith('RECOMMENDATION:') || line.startsWith('INSIGHT:') || line.startsWith('REVELATION:')
                            ? 'text-amber-300'
                            : line.includes('▓')
                            ? 'text-green-400'
                            : 'text-green-400'
                        }`}
                      >
                        {line}
                      </div>
                    ))
                  ) : (
                    <div>{entry.content}</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-2 md:p-4 border-t border-gray-700 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-green-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-400 font-mono outline-none text-sm md:text-base terminal-input"
              placeholder="Enter command... (Use ↑↓ for history)"
              autoComplete="off"
            />
          </div>
        </form>
      </div>
    </div>
  );
};