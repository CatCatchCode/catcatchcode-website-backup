import { useState } from 'react';
import { FileQuestion, Calendar, BookOpen, Download } from 'lucide-react';

const PreviousPapers = () => {
  const [activeYear, setActiveYear] = useState('2023');

  const years = ['2023', '2022', '2021', '2020'];

  const papers = {
    '2023': [
      { id: 1, subject: 'Data Structures', semester: 'Sem 3', code: 'CS301', date: 'Dec 2023' },
      { id: 2, subject: 'Digital Logic', semester: 'Sem 3', code: 'CS302', date: 'Dec 2023' },
      { id: 3, subject: 'Operating Systems', semester: 'Sem 4', code: 'CS401', date: 'May 2023' },
      { id: 4, subject: 'Computer Networks', semester: 'Sem 4', code: 'CS402', date: 'May 2023' },
    ],
    '2022': [
      { id: 1, subject: 'Data Structures', semester: 'Sem 3', code: 'CS301', date: 'Dec 2022' },
      { id: 2, subject: 'Digital Logic', semester: 'Sem 3', code: 'CS302', date: 'Dec 2022' },
      { id: 3, subject: 'Operating Systems', semester: 'Sem 4', code: 'CS401', date: 'May 2022' },
    ],
    '2021': [
      { id: 1, subject: 'Mathematics III', semester: 'Sem 3', code: 'MA301', date: 'Dec 2021' },
      { id: 2, subject: 'Java Programming', semester: 'Sem 3', code: 'CS305', date: 'Dec 2021' },
    ],
    '2020': [
      { id: 1, subject: 'Physics', semester: 'Sem 1', code: 'PH101', date: 'Dec 2020' },
      { id: 2, subject: 'Basic Electronics', semester: 'Sem 1', code: 'EC101', date: 'Dec 2020' },
    ],
  };

  const handleDownload = () => {
    window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileQuestion className="w-6 h-6 text-primary" />
          Previous Question Papers
        </h1>
      </div>

      <div className="flex flex-wrap gap-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              activeYear === year
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {papers[activeYear].map((paper) => (
          <div key={paper.id} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                {paper.code}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {paper.date}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {paper.subject}
            </h3>
            
            <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {paper.semester}
            </p>
            
            <button 
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors group-hover:bg-primary group-hover:text-white"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousPapers;
