import { useState } from 'react';
import { FlaskConical, Beaker, Terminal, Microscope, Atom, Download } from 'lucide-react';

const LabExperiments = () => {
  const [activeTab, setActiveTab] = useState('physics');

  const categories = [
    { id: 'physics', name: 'Physics', icon: <Atom className="w-4 h-4" /> },
    { id: 'chemistry', name: 'Chemistry', icon: <Beaker className="w-4 h-4" /> },
    { id: 'computer', name: 'Computer Science', icon: <Terminal className="w-4 h-4" /> },
    { id: 'biology', name: 'Biology', icon: <Microscope className="w-4 h-4" /> },
  ];

  const experiments = {
    physics: [
      { id: 1, title: 'Ohm\'s Law Verification', description: 'To verify Ohm\'s law by plotting a graph between potential difference and current.', duration: '1.5 hrs' },
      { id: 2, title: 'Focal Length of Convex Lens', description: 'To find the focal length of a convex lens by plotting graphs between u and v or between 1/u and 1/v.', duration: '2 hrs' },
      { id: 3, title: 'Screw Gauge', description: 'To measure diameter of a given wire using screw gauge.', duration: '1 hr' },
    ],
    chemistry: [
      { id: 1, title: 'Titration Analysis', description: 'Determination of concentration of KMnO4 solution by titrating it against a standard solution of Oxalic acid.', duration: '2 hrs' },
      { id: 2, title: 'Salt Analysis', description: 'Identification of one cation and one anion in a given salt.', duration: '2.5 hrs' },
    ],
    computer: [
      { id: 1, title: 'Sorting Algorithms', description: 'Implementation of Bubble, Selection, and Insertion sort in C++.', duration: '3 hrs' },
      { id: 2, title: 'Database Connectivity', description: 'Connecting Java application with MySQL database using JDBC.', duration: '2 hrs' },
      { id: 3, title: 'Web Development Basics', description: 'Creating a personal portfolio website using HTML, CSS and JavaScript.', duration: '4 hrs' },
    ],
    biology: [
      { id: 1, title: 'Mitosis in Onion Root Tip', description: 'Study of mitosis in onion root tip cells using squash technique.', duration: '1.5 hrs' },
      { id: 2, title: 'Starch Test', description: 'To test the presence of starch in a given food sample.', duration: '45 mins' },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FlaskConical className="w-6 h-6 text-primary" />
          Lab Experiments
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === cat.id
                ? 'bg-white text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiments[activeTab].map((exp) => (
          <div key={exp.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {exp.duration}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              {exp.description}
            </p>
            <button className="flex items-center gap-2 text-primary font-medium text-sm hover:underline">
              <Download className="w-4 h-4" />
              Download Manual
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabExperiments;
