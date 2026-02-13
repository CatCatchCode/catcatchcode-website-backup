import { useState, useRef } from 'react';
import { X, Play, ChevronLeft, List, CheckCircle, Circle, Clock } from 'lucide-react';
import AdvancedVideoPlayer from './AdvancedVideoPlayer';
import api from '../services/api';
import toast from 'react-hot-toast';

const StudyPlayer = ({ resource, onClose, onUpdate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [player, setPlayer] = useState(null);
  const [activeTimestamp, setActiveTimestamp] = useState(null);

  const handleProgress = async (currentTime, duration) => {
    // Calculate percentage
    const progress = Math.min(Math.round((currentTime / duration) * 100), 100);
    
    // Auto-save to backend (debounced by the interval in AdvancedVideoPlayer)
    try {
      // Only update if progress increased or position changed significantly
      await api.put(`/resources/${resource._id}`, {
        progress: Math.max(progress, resource.progress),
        lastPosition: currentTime,
        isCompleted: progress > 90 ? true : resource.isCompleted
      });
    } catch (error) {
      console.error('Failed to save progress', error);
    }
  };

  const toggleComplete = async () => {
    try {
      const updated = await api.put(`/resources/${resource._id}`, {
        isCompleted: !resource.isCompleted,
        progress: !resource.isCompleted ? 100 : 0
      });
      onUpdate(updated.data);
      if (!resource.isCompleted) {
        toast.success('Marked as completed! 🎉');
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const jumpToTime = (seconds) => {
    if (player && typeof player.seekTo === 'function') {
      player.seekTo(seconds, true);
      setActiveTimestamp(seconds);
    }
  };

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900 text-white flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <h3 className="font-bold text-sm md:text-base line-clamp-1">{resource.title}</h3>
            <span className="text-xs text-gray-400">{resource.section} • {resource.provider}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${resource.progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">{resource.progress}%</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Area */}
        <div className="flex-1 bg-black flex items-center justify-center relative">
          <div className="w-full h-full">
            <AdvancedVideoPlayer 
              url={resource.url} 
              initialTime={resource.lastPosition || 0}
              onProgress={handleProgress}
              onReady={setPlayer}
            />
          </div>
        </div>

        {/* Sidebar (Desktop & Mobile Overlay) */}
        <div className={`fixed md:relative right-0 top-16 md:top-0 bottom-0 md:bottom-auto w-80 bg-gray-800 border-l border-gray-700 flex-shrink-0 transition-transform duration-300 z-20 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:hidden'} flex flex-col h-full`}>
          <div className="p-4 border-b border-gray-700 font-bold flex justify-between items-center bg-gray-800">
            <span>Course Content</span>
            <button onClick={() => setIsSidebarOpen(false)} className="hover:text-gray-300 md:hidden">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {/* Main Resource Item */}
            <div className="p-3 bg-gray-700/50 rounded-lg border border-gray-600 mb-4 cursor-pointer hover:bg-gray-700 transition-colors">
              <div className="flex gap-3">
                <div className="mt-1">
                  <button onClick={(e) => { e.stopPropagation(); toggleComplete(); }}>
                    {resource.isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 hover:text-white" />
                    )}
                  </button>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1 line-clamp-2">
                    {resource.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Play className="w-3 h-3" />
                    <span>Video Resource</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timestamps Section */}
            {resource.timestamps && resource.timestamps.length > 0 && (
              <div className="space-y-1">
                <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">Timestamps</h5>
                {resource.timestamps.map((ts, idx) => (
                  <button
                    key={idx}
                    onClick={() => jumpToTime(ts.time)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors group ${
                      activeTimestamp === ts.time ? 'bg-primary/20 border-primary/50' : 'hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-gray-700 rounded text-gray-400 group-hover:text-white">
                        <Clock className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white">{ts.label}</span>
                    </div>
                    <span className="text-xs font-mono text-gray-500">{formatTime(ts.time)}</span>
                  </button>
                ))}
              </div>
            )}

            {!resource.timestamps?.length && (
              <div className="p-4 text-center text-xs text-gray-500 mt-4">
                <p>No timestamps available for this video.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlayer;
