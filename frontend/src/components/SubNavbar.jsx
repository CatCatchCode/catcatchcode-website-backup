import { Link, useLocation } from 'react-router-dom';
import { Home, Video, Bot, PenTool, BookOpen, FlaskConical, FileQuestion, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const SubNavbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const links = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Video', path: '/video-resources', icon: <Video className="w-4 h-4" /> },
    { name: 'AI', path: '/ai-resources', icon: <Bot className="w-4 h-4" /> },
    { name: 'Handwritten', path: '/handwritten-notes', icon: <PenTool className="w-4 h-4" /> },
    { name: 'Notes', path: '/topic-notes', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Lab', path: '/lab-experiments', icon: <FlaskConical className="w-4 h-4" /> },
    { name: 'Papers', path: '/previous-papers', icon: <FileQuestion className="w-4 h-4" /> },
    { name: 'Portfolio', path: '/portfolio-templates', icon: <Briefcase className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors relative ${
                path === link.path ? 'text-primary bg-primary/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {link.icon}
              {link.name}
              {path === link.path && (
                <motion.div
                  layoutId="subnav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;
