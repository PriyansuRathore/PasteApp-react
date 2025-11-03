import { Github, Linkedin, Mail, Code, Heart } from "lucide-react";

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`w-full ${darkMode ? 'bg-[#0F172A] border-[#334155]' : 'bg-gray-50 border-gray-200'} border-t mt-auto`}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project Info */}
          <div className="space-y-4">
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              PasteShare
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              A modern code snippet management platform built with React & Redux.
            </p>
            <div className="flex items-center space-x-2">
              <Code size={16} className="text-blue-500" />
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Built with React, Redux & Tailwind CSS
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className={`text-sm hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Create Paste
                </a>
              </li>
              <li>
                <a href="/pastes" className={`text-sm hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  All Pastes
                </a>
              </li>
              <li>
                <a href="https://github.com/PriyansuRathore/PasteApp-react" target="_blank" rel="noopener noreferrer" className={`text-sm hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Source Code
                </a>
              </li>
              <li>
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className={`text-sm hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  React Docs
                </a>
              </li>
              <li>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} title="Keyboard Shortcuts">
                  ⌨️ Ctrl+S: Save | Ctrl+N: New
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Connect
            </h4>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/PriyansuRathore/PasteApp-react" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-[#1E293B] hover:bg-[#334155] text-gray-400 hover:text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900'}`}
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/priyansu-rathore-43bb47253/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-[#1E293B] hover:bg-[#334155] text-gray-400 hover:text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900'}`}
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:priyansurathore255@gmail.com"
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-[#1E293B] hover:bg-[#334155] text-gray-400 hover:text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900'}`}
              >
                <Mail size={20} />
              </a>
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <p>📧 priyansurathore255@gmail.com</p>
              <p>👨‍💻 Priyansu Rathore</p>
              <p>🌐 Full Stack Developer</p>
              <p>⭐ Built with React & Redux</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-[#334155]' : 'border-gray-200'} flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0`}>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © {currentYear} PasteShare. All rights reserved.
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Made with
            </span>
            <Heart size={16} className="text-red-500 animate-pulse" />
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              for learning & innovation
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;