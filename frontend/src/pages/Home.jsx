import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import CourseCard from '../components/CourseCard';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import { Github, Twitter, Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';

  const socialLinks = [
    { name: 'Official Channel', icon: <Youtube className="w-5 h-5" />, url: 'https://www.youtube.com/channel/UCgzmNjDq8kI3StWFrIv7QZg', color: 'text-red-600' },
    { name: 'Team Lead', icon: <Youtube className="w-5 h-5" />, url: 'https://www.youtube.com/channel/UCX8i_v1eL9VuLWG1fKwEXhw', color: 'text-red-600' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, url: 'https://www.instagram.com/cat_catch_code/', color: 'text-pink-600' },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: 'https://www.linkedin.com/in/catcatchcode/', color: 'text-blue-600' },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, url: 'https://x.com/catcatchcode', color: 'text-blue-400' },
    { name: 'GitHub', icon: <Github className="w-5 h-5" />, url: 'https://github.com/catcatchcode', color: 'text-gray-900' },
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, url: 'https://www.facebook.com/catcatcatchcode', color: 'text-blue-700' },
    { name: 'Reddit', icon: <span className="font-bold text-lg leading-none">R</span>, url: 'https://www.reddit.com/user/Super_Cartoonist1246/', color: 'text-orange-600' },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        let query = '/courses';
        const params = new URLSearchParams();
        if (keyword) params.append('keyword', keyword);
        if (category) params.append('category', category);
        
        if (params.toString()) {
            query += `?${params.toString()}`;
        }

        const { data } = await api.get(query);
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [keyword, category]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-gray-100 p-8 md:p-12 rounded-lg mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Unlock your potential</h1>
            <p className="text-lg text-gray-700 mb-6">Welcome to catcatchcode. Learn the latest tech skills to advance your career.</p>
            
            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-4 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 ${link.color}`}
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
        </div>

      <h2 className="text-2xl font-bold text-gray-900">Broaden your selection</h2>
      
      {courses.length === 0 ? (
        <p>No courses available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
