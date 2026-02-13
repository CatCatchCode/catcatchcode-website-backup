import { useState } from 'react';
import { Plus, Link as LinkIcon, X } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AddResourceForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    section: 'Notes',
    provider: 'other'
  });

  const detectProvider = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('drive.google.com')) return 'drive';
    if (url.includes('dropbox.com')) return 'dropbox';
    if (url.includes('notion.so')) return 'notion';
    if (url.includes('github.com')) return 'github';
    if (url.endsWith('.pdf')) return 'pdf';
    return 'other';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'url') {
      const provider = detectProvider(value);
      setFormData(prev => ({ ...prev, [name]: value, provider }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/resources', formData);
      onAdd(data);
      toast.success('Resource added successfully');
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add resource');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Add New Resource</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="e.g., React Hooks Guide"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL Link</label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="url"
              name="url"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="https://..."
              value={formData.url}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select
              name="section"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              value={formData.section}
              onChange={handleChange}
            >
              <option value="Home">Home</option>
              <option value="Video">Video</option>
              <option value="AI">AI</option>
              <option value="Handwritten">Handwritten</option>
              <option value="Notes">Notes</option>
              <option value="Lab">Lab</option>
              <option value="Papers">Papers</option>
              <option value="Portfolio">Portfolio</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              value={formData.provider}
              readOnly
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mt-4"
        >
          <Plus className="w-4 h-4" /> Add Resource
        </button>
      </form>
    </div>
  );
};

export default AddResourceForm;
