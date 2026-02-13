import { useState, useEffect } from 'react';
import { Plus, BarChart2, BookOpen, Clock, Target } from 'lucide-react';
import api from '../services/api';
import ResourceCard from '../components/ResourceCard';
import AddResourceForm from '../components/AddResourceForm';
import PomodoroTimer from '../components/PomodoroTimer';
import Loader from '../components/Loader';
import { motion, AnimatePresence } from 'framer-motion';

const MyStudySpace = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data } = await api.get('/resources');
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddResource = (newResource) => {
    setResources([newResource, ...resources]);
  };

  const handleDeleteResource = (id) => {
    setResources(resources.filter(r => r._id !== id));
  };

  const handleUpdateResource = (updatedResource) => {
    setResources(resources.map(r => r._id === updatedResource._id ? updatedResource : r));
  };

  // Analytics
  const completedCount = resources.filter(r => r.isCompleted).length;
  const totalCount = resources.length;
  const progressPercentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const sections = ['All', 'Home', 'Video', 'AI', 'Handwritten', 'Notes', 'Lab', 'Papers', 'Portfolio'];

  const filteredResources = filter === 'All' 
    ? resources 
    : resources.filter(r => r.section === filter);

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
      {/* Header & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white shadow-lg">
            <h1 className="text-3xl font-bold mb-2">My Study Space</h1>
            <p className="opacity-90 mb-6">Track your progress and manage your personal learning resources.</p>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-blue-200" />
                  <span className="text-sm font-medium text-blue-100">Total Items</span>
                </div>
                <span className="text-2xl font-bold">{totalCount}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-green-200" />
                  <span className="text-sm font-medium text-green-100">Completed</span>
                </div>
                <span className="text-2xl font-bold">{completedCount}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart2 className="w-4 h-4 text-purple-200" />
                  <span className="text-sm font-medium text-purple-100">Progress</span>
                </div>
                <span className="text-2xl font-bold">{progressPercentage}%</span>
              </div>
            </div>
          </div>

          {/* Filters & Add Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2 w-full sm:w-auto no-scrollbar">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => setFilter(section)}
                  className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                    filter === section
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Add Resource
            </button>
          </div>

          {/* Resources Grid */}
          {filteredResources.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No resources found</h3>
              <p className="text-gray-500 text-sm mb-6">Start building your library by adding links to your study materials.</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add First Resource
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {filteredResources.map((resource) => (
                  <motion.div
                    key={resource._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    layout
                  >
                    <ResourceCard 
                      resource={resource} 
                      onDelete={handleDeleteResource}
                      onUpdate={handleUpdateResource}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <PomodoroTimer />
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Study Streak
            </h3>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">3</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Current</div>
              </div>
              <div className="h-10 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">12</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Best</div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Keep learning daily to increase your streak! 🔥
            </p>
          </div>
        </div>
      </div>

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <AddResourceForm 
              onAdd={handleAddResource} 
              onClose={() => setShowAddModal(false)} 
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyStudySpace;
