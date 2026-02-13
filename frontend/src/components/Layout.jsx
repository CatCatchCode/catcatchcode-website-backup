import Navbar from './Navbar';
import SubNavbar from './SubNavbar';
import BottomNav from './BottomNav';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import { useFocus } from '../context/FocusContext';
import { Maximize, Minimize } from 'lucide-react';

const Layout = ({ children }) => {
  const { isFocusMode, toggleFocusMode } = useFocus();

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0 flex flex-col">
      {!isFocusMode && <Navbar />}
      {!isFocusMode && <SubNavbar />}
      
      <main className={`flex-grow w-full transition-all duration-300 ${isFocusMode ? 'p-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        {children}
      </main>

      {!isFocusMode && <Footer />}
      {!isFocusMode && <BottomNav />}
      
      <Toaster position="top-center" />

      {/* Focus Mode Toggle Button */}
      <button
        onClick={toggleFocusMode}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
          isFocusMode ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-primary hover:bg-primary/90 text-white'
        }`}
        title={isFocusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
      >
        {isFocusMode ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default Layout;
