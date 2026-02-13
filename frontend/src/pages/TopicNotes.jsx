import { useState } from 'react';
import { Book, ChevronRight, Hash } from 'lucide-react';
import HTMLTutorial from '../components/HTMLTutorial';

const TopicNotes = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'HTML',
    'DSA',
    'MERN',
    'Android',
    'iOS',
    'Flutter',
    'Data Analytics',
    'AI/ML',
    'Deep Learning',
    'Other'
  ];

  const topics = [
    {
      id: 1,
      title: 'Introduction to Data Structures',
      description: 'Arrays, Linked Lists, Stacks, Queues, and basic operations analysis.',
      category: 'DSA',
      readTime: '15 min read',
      tags: ['Basics', 'Arrays', 'Lists']
    },
    {
      id: 2,
      title: 'React Hooks Deep Dive',
      description: 'Understanding useState, useEffect, useContext, and custom hooks with examples.',
      category: 'MERN',
      readTime: '20 min read',
      tags: ['React', 'Hooks', 'Frontend']
    },
    {
      id: 3,
      title: 'Node.js Event Loop Explained',
      description: 'Detailed explanation of phases, timers, microtasks, and macrotasks.',
      category: 'MERN',
      readTime: '12 min read',
      tags: ['Backend', 'Node.js', 'Async']
    },
    {
      id: 4,
      title: 'Flutter State Management',
      description: 'Comparison of Provider, Riverpod, Bloc, and GetX for managing state.',
      category: 'Flutter',
      readTime: '18 min read',
      tags: ['Mobile', 'State', 'Dart']
    },
    {
      id: 5,
      title: 'SwiftUI vs UIKit',
      description: 'When to use declarative syntax vs imperative programming in iOS development.',
      category: 'iOS',
      readTime: '10 min read',
      tags: ['iOS', 'UI', 'Swift']
    },
    {
      id: 6,
      title: 'Neural Networks Basics',
      description: 'Perceptrons, activation functions, backpropagation, and loss functions.',
      category: 'Deep Learning',
      readTime: '25 min read',
      tags: ['Deep Learning', 'Neural Networks']
    },
    {
      id: 7,
      title: 'Supervised vs Unsupervised Learning',
      description: 'Core concepts of machine learning paradigms with real-world examples.',
      category: 'AI/ML',
      readTime: '15 min read',
      tags: ['ML', 'Basics', 'Algorithms']
    },
    {
      id: 8,
      title: 'Data Cleaning with Pandas',
      description: 'Handling missing values, duplicates, and data transformation techniques.',
      category: 'Data Analytics',
      readTime: '20 min read',
      tags: ['Python', 'Pandas', 'Data']
    },
    {
      id: 9,
      title: 'Android Activity Lifecycle',
      description: 'Understanding the lifecycle callback methods and state management.',
      category: 'Android',
      readTime: '12 min read',
      tags: ['Android', 'Kotlin', 'Lifecycle']
    },
    {
      id: 10,
      title: 'Graph Traversal Algorithms',
      description: 'BFS and DFS implementation and applications in solving problems.',
      category: 'DSA',
      readTime: '30 min read',
      tags: ['Graphs', 'Algorithms', 'BFS/DFS']
    }
  ];

  const filteredTopics = activeCategory === 'All' 
    ? topics 
    : topics.filter(topic => topic.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Topic Notes</h1>
        
        {/* Category Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {activeCategory === 'HTML' ? (
        <HTMLTutorial />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredTopics.map((topic) => (
            <div key={topic.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                      {topic.category}
                    </span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-500 text-xs">{topic.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {topic.description}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    {topic.tags.map((tag) => (
                      <div key={tag} className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                        <Hash className="w-3 h-3 text-gray-400" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="ml-4 flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 group-hover:bg-primary/10 transition-colors">
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicNotes;
