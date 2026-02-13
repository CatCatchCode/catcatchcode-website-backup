import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlayCircle, FileText, Bot, PenTool } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';

const CourseStudy = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('video');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/courses/${id}`);
        setCourse(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <Loader />;
  if (!course) return <div>Course not found</div>;

  const tabs = [
    { id: 'video', label: 'Video Lessons', icon: PlayCircle },
    { id: 'ai', label: 'AI Resources', icon: Bot },
    { id: 'notes', label: 'Handwritten Notes', icon: PenTool },
    { id: 'topic', label: 'Topic Notes', icon: FileText },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)]">
      {/* Sidebar Navigation */}
      <div className="lg:w-64 bg-white border border-gray-200 rounded-lg h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
            <h2 className="font-bold text-gray-900">{course.title}</h2>
        </div>
        <div className="flex flex-col">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                            ? 'bg-primary/10 text-primary border-r-2 border-primary'
                            : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                </button>
            ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 overflow-y-auto">
        {activeTab === 'video' && (
            <div className="space-y-6">
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center text-white">
                    <PlayCircle className="w-16 h-16 opacity-50" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-2">Introduction to {course.title}</h3>
                    <p className="text-gray-600">This is a placeholder for the video player.</p>
                </div>
            </div>
        )}

        {activeTab === 'ai' && (
            <div className="text-center py-20">
                <Bot className="w-16 h-16 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">AI Learning Assistant</h3>
                <p className="text-gray-600">Ask questions and get instant answers about this course content.</p>
                <div className="mt-6 max-w-md mx-auto">
                    <input type="text" placeholder="Ask a question..." className="w-full px-4 py-2 border rounded-full" />
                </div>
            </div>
        )}

        {activeTab === 'notes' && (
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer">
                        <div className="h-32 bg-gray-100 rounded mb-2 flex items-center justify-center">
                            <PenTool className="text-gray-400" />
                        </div>
                        <p className="font-medium text-sm">Lecture {i} Notes</p>
                    </div>
                ))}
             </div>
        )}

        {activeTab === 'topic' && (
             <div className="prose max-w-none">
                <h3>Course Syllabus</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <ul>
                    <li>Topic 1: Introduction</li>
                    <li>Topic 2: Advanced Concepts</li>
                    <li>Topic 3: Final Project</li>
                </ul>
             </div>
        )}
      </div>
    </div>
  );
};

export default CourseStudy;
