import { useState } from 'react';
import { ExternalLink, Trash2, CheckCircle, Circle, Play, FileText, Database, Github, Code } from 'lucide-react';
import CleanYouTubePlayer from './CleanYouTubePlayer';
import StudyPlayer from './StudyPlayer';
import api from '../services/api';
import toast from 'react-hot-toast';

const ResourceCard = ({ resource, onDelete, onUpdate }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await api.delete(`/resources/${resource._id}`);
        onDelete(resource._id);
        toast.success('Resource deleted');
      } catch (error) {
        toast.error('Failed to delete resource');
      }
    }
  };

  const toggleComplete = async () => {
    try {
      const updated = await api.put(`/resources/${resource._id}`, {
        isCompleted: !resource.isCompleted,
        progress: !resource.isCompleted ? 100 : 0
      });
      onUpdate(updated.data);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getIcon = () => {
    switch (resource.provider) {
      case 'youtube': return <Play className="w-5 h-5 text-red-500" />;
      case 'github': return <Github className="w-5 h-5 text-gray-800" />;
      case 'pdf': return <FileText className="w-5 h-5 text-red-400" />;
      case 'drive': return <Database className="w-5 h-5 text-blue-500" />;
      default: return <ExternalLink className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gray-50 rounded-lg">
                {getIcon()}
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                {resource.section}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={toggleComplete} className="text-gray-400 hover:text-green-500 transition-colors">
                {resource.isCompleted ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5" />}
              </button>
              <button onClick={handleDelete} className="text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{resource.title}</h3>
          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-primary truncate block mb-4">
            {resource.url}
          </a>

          {resource.provider === 'youtube' ? (
            <div className="space-y-3">
              <button
                onClick={() => setShowPlayer(true)}
                className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="w-4 h-4" /> Watch Video
              </button>
            </div>
          ) : (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Open Resource
            </a>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 bg-gray-100 w-full">
          <div 
            className={`h-full transition-all duration-500 ${resource.isCompleted ? 'bg-green-500' : 'bg-primary'}`} 
            style={{ width: `${resource.progress}%` }}
          />
        </div>
      </div>

      {showPlayer && (
        <StudyPlayer 
          resource={resource} 
          onClose={() => setShowPlayer(false)} 
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default ResourceCard;
