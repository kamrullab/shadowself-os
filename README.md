# 🌟 ShadowSelf OS - Mind Operating System

<div align="center">

![ShadowSelf OS](https://img.shields.io/badge/ShadowSelf%20OS-v2.5.0-00ff9f?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIHN0cm9rZT0iIzAwZmY5ZiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Im0xNSA5LTYgNi00LTQiIHN0cm9rZT0iIzAwZmY5ZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-06B6D4?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite)

**A cyberpunk-inspired desktop operating system interface built for self-discovery and authentic expression**

[🚀 Live Demo](https://kamrul.pages.dev/shadowself-os/) • [📖 Documentation](#documentation) • [🛠️ Installation](#installation) • [🎯 Features](#features)

</div>

---

## 🎭 What is ShadowSelf OS?

ShadowSelf OS is an immersive, cyberpunk-themed desktop environment that simulates a mind operating system. Built as a creative exploration of self-awareness, authenticity, and personal growth, it features a fully functional terminal with 50+ psychological commands, draggable windows, auto-hiding taskbar, and real-time system monitoring.

### 🌟 Core Philosophy

> *"Your heritage is your strength, not your limitation. Trust the vision. Execute with courage."*

This project represents the intersection of technology and introspection, designed for builders, dreamers, and bridge-creators who want to explore their authentic selves through an interactive digital experience.

---

## ✨ Features

### 🖥️ **Desktop Environment**
- **Cyberpunk Aesthetic**: Neon glows, matrix-style animations, and futuristic UI
- **Auto-Hiding Taskbar**: Smart taskbar that appears on scroll or mouse proximity
- **Draggable Windows**: Fully interactive window management system
- **Real-time Clock**: Bangladesh time (GMT+6) with live updates
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🔧 **System Applications**
- **File Manager**: Browse virtual file system with personal archives
- **Control Panel**: System settings and configuration
- **Task Manager**: Monitor running processes and system performance
- **Web Browser**: Simulated browser with bookmarks and history
- **Code Editor**: Syntax-highlighted development environment
- **Music Player**: Ambient coding playlists and focus music

### 🧠 **Psychological Modules**
- **Emotion Analyzer**: Real-time emotional climate monitoring
- **Shadow Self Map**: Explore hidden potentials and suppressed traits
- **Vision Compiler**: Transform dreams into executable reality
- **Cognitive Defragmenter**: Reorganize memories and experiences
- **Imposter Mode Toggle**: Switch between authentic and protective modes
- **Habit Tracker**: Monitor daily habits and build streaks

### 💻 **Advanced Terminal**
- **50+ Commands**: Comprehensive command library for self-exploration
- **Command History**: Navigate previous commands with arrow keys
- **Auto-completion**: Smart suggestions for partial commands
- **Psychological Operations**: Commands for personal growth and insight
- **System Utilities**: Traditional OS commands with a twist

### 📊 **Real-time Monitoring**
- **System Health**: 87% optimal performance
- **Authenticity Level**: 73% and steadily increasing
- **Creative Energy**: 90% ready for creation
- **Focus Metrics**: Track attention and concentration levels

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Quick Start

```bash
# Clone the repository
git clone https://github.com/kamrullab/shadowself-os.git

# Navigate to project directory
cd shadowself-os

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser to http://localhost:5173
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## 🎯 Usage Guide

### 🖱️ **Desktop Interaction**
- **Click icons** to open applications and files
- **Drag windows** to reposition them on desktop
- **Scroll down** or **hover bottom** to show taskbar
- **Right-click** for context menus (coming soon)

### ⌨️ **Terminal Commands**

#### System Commands
```bash
/help              # Show all available commands
/status            # Display system status
/time              # Show Bangladesh time and date
/whoami            # User identification profile
/version           # OS version information
/clear             # Clear terminal screen
```

#### Psychological Operations
```bash
/reprogram self-limiter           # Remove self-imposed limitations
/install boundary_update          # Update personal boundaries
/archive heartbreak_002           # Process emotional experiences
/unzip childhood_dreams           # Recover suppressed aspirations
/shutdown perfectionist_protocol  # Disable perfectionism
/toggle imposter_mode             # Switch authenticity modes
/scan emotional_state             # Analyze current emotions
/backup memories                  # Secure important memories
/analyze creative_blocks          # Identify creative obstacles
/optimize energy_levels           # Manage energy distribution
```

#### Productivity & Growth
```bash
/track daily_habits               # Monitor habit progress
/launch focus_mode                # Start 90-minute deep work session
/generate daily_affirmations      # Create positive statements
/analyze productivity_patterns    # Study work efficiency
/create vision_board              # Build visual goals
/run wellness_check               # Comprehensive health scan
/schedule creative_session        # Plan creative time
```

### 🎨 **Customization**
- Modify `src/data/systemData.ts` to add new commands or modules
- Update `src/styles/animations.css` for visual customizations
- Edit `src/components/Desktop.tsx` for layout changes

---

## 🏗️ Architecture

### 📁 **Project Structure**
```
shadowself-os/
├── src/
│   ├── components/           # React components
│   │   ├── BootScreen.tsx   # System boot sequence
│   │   ├── Desktop.tsx      # Main desktop environment
│   │   ├── CommandTerminal.tsx # Terminal interface
│   │   ├── Module.tsx       # Draggable window component
│   │   ├── FileViewer.tsx   # File viewing interface
│   │   └── SystemIcon.tsx   # Desktop icon component
│   ├── data/
│   │   └── systemData.ts    # System configuration and commands
│   ├── hooks/
│   │   └── useSystem.ts     # System state management
│   ├── styles/
│   │   └── animations.css   # Custom animations and styles
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

### 🔧 **Tech Stack**
- **Frontend**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS 3.4.1 with custom animations
- **Build Tool**: Vite 5.4.2 for fast development
- **Icons**: Lucide React for consistent iconography
- **State Management**: React hooks and context
- **Deployment**: Netlify with automatic builds

---

## 🎨 Design System

### 🌈 **Color Palette**
```css
/* Primary Colors */
--neon-green: #00ff9f;    /* Success, health, growth */
--cyber-blue: #00d4ff;    /* Information, authenticity */
--matrix-purple: #9333ea; /* Creativity, vision */
--warning-yellow: #fbbf24; /* Caution, attention */
--error-red: #ef4444;     /* Errors, critical states */

/* Background */
--bg-primary: #000000;    /* Pure black base */
--bg-secondary: #111827;  /* Dark gray surfaces */
--bg-tertiary: #1f2937;   /* Lighter gray elements */
```

### 🎭 **Typography**
- **Primary Font**: JetBrains Mono (monospace)
- **Fallbacks**: Fira Code, IBM Plex Mono
- **Sizes**: Responsive scaling from 12px to 48px
- **Weights**: 400 (regular), 700 (bold)

### ✨ **Animations**
- **Glow Effects**: CSS animations for cyberpunk aesthetic
- **Fade Transitions**: Smooth element appearances
- **Hover States**: Interactive feedback on all clickable elements
- **Loading States**: Visual feedback for system operations

---

## 🤝 Contributing

We welcome contributions from developers, designers, and dreamers! Here's how you can help:

### 🐛 **Bug Reports**
1. Check existing issues first
2. Create detailed bug report with steps to reproduce
3. Include browser/device information
4. Add screenshots if applicable

### 💡 **Feature Requests**
1. Search existing feature requests
2. Describe the feature and its benefits
3. Explain how it fits the project philosophy
4. Provide mockups or examples if possible

### 🔧 **Development**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with clear commit messages
4. Test thoroughly across different devices
5. Submit a pull request with detailed description

### 📝 **Code Style**
- Use TypeScript for type safety
- Follow React best practices
- Maintain consistent formatting with Prettier
- Write descriptive component and function names
- Add comments for complex logic

---

## 🌍 Roadmap

### 🎯 **Version 3.0.0** (Q2 2024)
- [ ] **Multi-language Support**: Bengali and English interfaces
- [ ] **Voice Commands**: Speak to the system naturally
- [ ] **AI Integration**: Smart responses and suggestions
- [ ] **Cloud Sync**: Save progress across devices
- [ ] **Themes**: Multiple visual themes and customization

### 🚀 **Version 3.5.0** (Q3 2024)
- [ ] **Multiplayer Mode**: Connect with other users
- [ ] **Plugin System**: Community-created extensions
- [ ] **Mobile App**: Native iOS and Android versions
- [ ] **VR Support**: Immersive virtual reality experience
- [ ] **Blockchain Integration**: Decentralized identity and progress

### 🌟 **Long-term Vision**
- **Educational Platform**: Courses on self-discovery and growth
- **Community Hub**: Connect builders and dreamers globally
- **Research Tool**: Study human-computer interaction patterns
- **Therapeutic Application**: Mental health and wellness support

---

## 📊 Performance

### ⚡ **Metrics**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **Bundle Size**: < 500KB gzipped

### 🔧 **Optimizations**
- Code splitting for faster initial loads
- Lazy loading for non-critical components
- Optimized images and assets
- Efficient state management
- Minimal external dependencies

---

## 🛡️ Security & Privacy

### 🔒 **Data Protection**
- **No Data Collection**: All data stays in your browser
- **Local Storage Only**: No external servers or databases
- **No Tracking**: No analytics or user monitoring
- **Open Source**: Full transparency in code

### 🌐 **Browser Compatibility**
- **Chrome**: 90+ ✅
- **Firefox**: 88+ ✅
- **Safari**: 14+ ✅
- **Edge**: 90+ ✅
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+ ✅

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### 🎁 **What this means:**
- ✅ **Commercial use** - Use in commercial projects
- ✅ **Modification** - Change and adapt the code
- ✅ **Distribution** - Share with others
- ✅ **Private use** - Use for personal projects
- ❗ **Attribution required** - Credit the original authors

---

## 👨‍💻 Author

**Kamrul Hossain**
- 🌐 Website: [kamrul.pages.dev](https://kamrul.pages.dev)
- 📘 Facebook: [fb.com/elitekamrul](https://fb.com/elitekamrul)
- 📧 Email: [contact@kamrul.dev](mailto:engieer@kamrul.us)
- 🇧🇩 Location: Bangladesh
- 🎯 Mission: Building bridges between cultures through technology

### 💭 **About the Creator**
A 25-year-old builder, dreamer, and bridge-creator from Bangladesh, passionate about creating technology that fosters authentic human connections. This project represents the intersection of technical skills, cultural heritage, and personal growth philosophy.

---

## 🙏 Acknowledgments

### 🎨 **Design Inspiration**
- **Cyberpunk 2077** - Visual aesthetics and neon styling
- **Matrix Trilogy** - Terminal interface and digital rain effects
- **Blade Runner** - Futuristic UI elements and color schemes
- **Ghost in the Shell** - Philosophical themes and digital consciousness

### 🛠️ **Technical Credits**
- **React Team** - For the amazing framework
- **Tailwind CSS** - For utility-first styling
- **Lucide** - For beautiful, consistent icons
- **Vite** - For lightning-fast development experience
- **TypeScript** - For type safety and developer experience

### 🌟 **Community**
- **Open Source Community** - For inspiration and shared knowledge
- **Bangladesh Tech Community** - For local support and encouragement
- **Global Developer Network** - For feedback and collaboration
- **Mental Health Advocates** - For insights on authentic self-expression

---

## 📞 Support

### 🆘 **Need Help?**
- 📖 **Documentation**: Check this README and inline code comments
- 🐛 **Bug Reports**: Create an issue on GitHub
- 💡 **Feature Requests**: Open a discussion on GitHub
- 💬 **General Questions**: Reach out via email or social media

### 🤝 **Community**
- **Discord**: [Join our community](https://discord.gg/elitekamrul) (coming soon)
- **Reddit**: [r/ShadowSelfOS](https://reddit.com/r/elitekamrul) (coming soon)
- **Twitter**: Follow [@ShadowSelfOS](https://twitter.com/elitekamrul) for updates

---

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/kamrullab/shadowself-os?style=social)
![GitHub forks](https://img.shields.io/github/forks/kamrullab/shadowself-os?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/kamrullab/shadowself-os?style=social)
![GitHub issues](https://img.shields.io/github/issues/kamrullab/shadowself-os)
![GitHub pull requests](https://img.shields.io/github/issues-pr/kamrullab/shadowself-os)
![GitHub last commit](https://img.shields.io/github/last-commit/kamrullab/shadowself-os)

---

<div align="center">

### 🌟 **"Trust the vision. Execute with courage."** 🌟

**Made with ❤️ in Bangladesh 🇧🇩**

*If this project resonates with you, consider giving it a ⭐ star and sharing it with fellow builders and dreamers!*

</div>

---

## 📝 Changelog

### v2.5.0 (Current)
- ✨ Auto-hiding taskbar with smart detection
- 🕐 Bangladesh time integration (GMT+6)
- 🎨 Enhanced system stats with progress bars
- 📱 Improved mobile responsiveness
- 🔧 50+ terminal commands
- 🎭 Draggable windows system
- 🌈 Cyberpunk visual enhancements

### v2.0.0
- 🖥️ Complete desktop environment
- 💻 Interactive terminal with 28 commands
- 📊 Real-time system monitoring
- 🎨 Cyberpunk aesthetic design
- 📱 Mobile-responsive interface

### v1.0.0
- 🚀 Initial release
- ⚡ Boot sequence animation
- 🖱️ Basic desktop icons
- 📁 File system simulation
- 🎯 Core psychological modules

---

*Last updated: 2025*
