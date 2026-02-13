import Navbar from './Navbar';
import SubNavbar from './SubNavbar';
import BottomNav from './BottomNav';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0 flex flex-col">
      <Navbar />
      <SubNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {children}
      </main>
      <Footer />
      <BottomNav />
      <Toaster position="top-center" />
    </div>
  );
};

export default Layout;
