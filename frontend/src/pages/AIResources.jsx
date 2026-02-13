import { useState } from 'react';
import { Bot, Sparkles, Brain, Cpu, MessageSquare, Search, Zap, Crown } from 'lucide-react';

const AIResources = () => {
  const [activeTab, setActiveTab] = useState('tools');

  const tools = [
    { id: 1, name: 'CodeHelper AI', description: 'Advanced code completion and debugging assistant tailored for students.', icon: <Bot className="w-8 h-8 text-blue-500" />, category: 'Coding Assistant', status: 'Free', users: '10k+' },
    { id: 2, name: 'NoteSummarizer', description: 'Instantly summarize long lecture notes and PDFs into concise bullet points.', icon: <MessageSquare className="w-8 h-8 text-green-500" />, category: 'Productivity', status: 'Freemium', users: '5k+' },
    { id: 3, name: 'AlgorithmVisualizer', description: 'AI-powered visualization of complex algorithms and data structures.', icon: <Brain className="w-8 h-8 text-purple-500" />, category: 'Learning', status: 'Premium', users: '2k+' },
    { id: 4, name: 'InterviewBot', description: 'Mock technical interviews with real-time feedback on your answers.', icon: <Cpu className="w-8 h-8 text-orange-500" />, category: 'Career', status: 'Free Trial', users: '8k+' },
    { id: 5, name: 'ProjectGenerator', description: 'Generate full-stack project ideas with starter code and roadmaps.', icon: <Sparkles className="w-8 h-8 text-yellow-500" />, category: 'Projects', status: 'Free', users: '15k+' },
  ];

  const prompts = [
    { id: 1, title: 'Explain Complex Concept', prompt: 'Explain [Concept] to me like I am 5 years old, using real-world analogies.', category: 'Learning' },
    { id: 2, title: 'Code Refactoring', prompt: 'Refactor this code to improve performance and readability. Explain the changes.', category: 'Coding' },
    { id: 3, title: 'Bug Debugging', prompt: 'Here is a bug I am facing: [Error Message]. What are the possible causes and fixes?', category: 'Debugging' },
    { id: 4, title: 'Project Roadmap', prompt: 'Create a step-by-step roadmap to learn [Technology] in 4 weeks.', category: 'Planning' },
    { id: 5, title: 'Interview Prep', prompt: 'Act as a senior interviewer. Ask me 5 hard questions about [Topic].', category: 'Career' },
  ];

  const premiumTools = [
    { id: 1, name: 'GPT-4 Turbo Access', originalPrice: '$20/mo', ourPrice: '$5/mo', savings: '75%', description: 'Shared access to ChatGPT Plus features.' },
    { id: 2, name: 'Midjourney Pro', originalPrice: '$30/mo', ourPrice: '$8/mo', savings: '73%', description: 'High-quality AI image generation for your projects.' },
    { id: 3, name: 'GitHub Copilot Team', originalPrice: '$19/mo', ourPrice: '$6/mo', savings: '68%', description: 'AI pair programmer for faster coding.' },
    { id: 4, name: 'Claude 3 Opus', originalPrice: '$20/mo', ourPrice: '$5/mo', savings: '75%', description: 'Access to the most capable AI model for reasoning.' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary" />
          AI Resources
        </h1>
      </div>

      {/* Internal Navigation */}
      <div className="flex p-1 space-x-1 bg-gray-100/80 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('tools')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'tools'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          AI Tools
        </button>
        <button
          onClick={() => setActiveTab('prompts')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'prompts'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          AI Prompts
        </button>
        <button
          onClick={() => setActiveTab('premium')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'premium'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Crown className="w-4 h-4 text-amber-500" />
          Premium @ Low Cost
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div key={tool.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {tool.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    tool.status === 'Free' ? 'bg-green-50 text-green-700' :
                    tool.status === 'Premium' ? 'bg-purple-50 text-purple-700' :
                    'bg-blue-50 text-blue-700'
                  }`}>
                    {tool.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tool.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">{tool.category}</span>
                  <span className="text-xs text-gray-400">{tool.users} users</span>
                </div>
                <button className="w-full mt-4 py-2 px-4 bg-primary text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  Try Now
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'prompts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prompts.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-md">{item.category}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm text-gray-700 mb-3 border border-gray-100">
                  {item.prompt}
                </div>
                <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Use Prompt
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'premium' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumTools.map((item) => (
              <div key={item.id} className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Crown className="w-24 h-24" />
                </div>
                <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-3xl font-bold text-amber-400">{item.ourPrice}</span>
                  <span className="text-sm text-gray-500 line-through mb-1">{item.originalPrice}</span>
                </div>
                
                <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full mb-6">
                  Save {item.savings}
                </div>
                
                <button className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold rounded-lg transition-colors">
                  Get Access
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIResources;
