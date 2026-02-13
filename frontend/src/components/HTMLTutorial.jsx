import { useState } from 'react';
import { BookOpen, ChevronRight, Menu, X, Code, Globe, Layout, Type, Image as ImageIcon, List, Table, MousePointer, Hash } from 'lucide-react';

const HTMLTutorial = () => {
  const [activeChapter, setActiveChapter] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const chapters = [
    { id: 'home', title: 'HTML Home', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'intro', title: 'Introduction', icon: <Globe className="w-4 h-4" /> },
    { id: 'structure', title: 'Basic Structure', icon: <Layout className="w-4 h-4" /> },
    { id: 'text', title: 'Headings & Paragraphs', icon: <Type className="w-4 h-4" /> },
    { id: 'links', title: 'Links & Anchors', icon: <MousePointer className="w-4 h-4" /> },
    { id: 'images', title: 'Images', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'lists', title: 'Lists (UL/OL)', icon: <List className="w-4 h-4" /> },
    { id: 'tables', title: 'Tables', icon: <Table className="w-4 h-4" /> },
    { id: 'attributes', title: 'Attributes', icon: <Hash className="w-4 h-4" /> },
    { id: 'forms', title: 'Forms', icon: <Code className="w-4 h-4" /> },
  ];

  const content = {
    home: (
      <div className="space-y-6 animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-900 border-b pb-4">HTML Tutorial - Home</h1>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
          <p className="text-blue-700">
            <strong>Welcome to the HTML Tutorial series!</strong> This resource is designed to help you learn HTML in less than 30 days.
          </p>
        </div>

        <div className="prose max-w-none text-gray-700 space-y-4">
          <p>
            The word <strong>HyperText Markup Language</strong> is composed of the words "hypertext" and "markup language". 
            The term "hypertext" refers to the linking of text with other documents and "markup language" refers to a language that uses a set of tags.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">What is HTML?</h2>
          <p>
            HTML (HyperText Markup Language) was created by <strong>Tim Berners-Lee in 1991</strong> as a standard for creating web pages. 
            It's a markup language used to structure content on the web, defining elements like headings, paragraphs, links, and images.
          </p>
          <p>
            In layman's terms, HTML is like the <strong>skeleton of a website</strong>. It's a set of instructions that tells a web browser how to display text, images, videos, and other elements on a webpage. 
            Think of it as the building blocks that create the structure and look of a website, similar to how bricks and mortar are used to build a house.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg my-6">
            <h3 className="text-lg font-bold mb-3">In a nutshell:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>HTML is the language of the web, used to create websites.</li>
              <li>HTML defines the barebone structure or layout of web pages.</li>
              <li>HTML consists of a set of tags contained within an HTML document.</li>
              <li>Files typically have either a <code>.html</code> or <code>.htm</code> extension.</li>
              <li>There are several versions of HTML, with <strong>HTML5</strong> being the most recent version.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">Features of HTML</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Platform Independent:</strong> Chrome displays the same pages identically across Mac, Linux, and Windows.</li>
            <li><strong>Multimedia Support:</strong> Images, videos, and audio can be added to a web page.</li>
            <li><strong>Markup Language:</strong> HTML is a markup language, not a programming language.</li>
            <li><strong>Integration:</strong> It can be integrated with CSS (for style) and JavaScript (for interactivity).</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">Analogy: HTML, CSS, and JS</h2>
          <p>
            In building a webpage, think of HTML, CSS, and JavaScript as different parts of a car:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="border p-4 rounded-lg bg-white shadow-sm">
              <h3 className="font-bold text-lg text-orange-600 mb-2">HTML</h3>
              <p>Like the car's skeleton/chassis. Forms the basic structure and frame.</p>
            </div>
            <div className="border p-4 rounded-lg bg-white shadow-sm">
              <h3 className="font-bold text-lg text-blue-600 mb-2">CSS</h3>
              <p>Adds the paint and finishing touches. Makes the car look appealing with color and style.</p>
            </div>
            <div className="border p-4 rounded-lg bg-white shadow-sm">
              <h3 className="font-bold text-lg text-yellow-600 mb-2">JavaScript</h3>
              <p>Like the engine. Infuses the car with functionality, movement, and interactivity.</p>
            </div>
          </div>
        </div>
      </div>
    ),
    intro: (
      <div className="space-y-6 animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-900 border-b pb-4">Introduction to Web</h1>
        <p className="text-gray-700">
          The World Wide Web (WWW) is an information system where documents and other web resources are identified by Uniform Resource Locators (URLs).
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mt-6">How Websites Work?</h2>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
          Client (Browser) --Request--&gt; Server <br/>
          Client (Browser) &lt;--Response-- Server
        </div>
        <p className="text-gray-700 mt-4">
          When you enter a URL in your browser, it sends a request to a server. The server processes this request and sends back HTML, CSS, and JavaScript files, which your browser renders into the webpage you see.
        </p>
      </div>
    ),
    structure: (
      <div className="space-y-6 animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-900 border-b pb-4">Basic HTML Structure</h1>
        <p className="text-gray-700">All HTML documents must start with a document type declaration: <code>&lt;!DOCTYPE html&gt;</code>.</p>
        
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md font-mono text-sm overflow-x-auto">
          <pre>{`<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>

    <h1>My First Heading</h1>
    <p>My first paragraph.</p>

</body>
</html>`}</pre>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mt-6">Explanation:</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li><code>&lt;!DOCTYPE html&gt;</code>: Defines the document to be HTML5.</li>
          <li><code>&lt;html&gt;</code>: The root element of an HTML page.</li>
          <li><code>&lt;head&gt;</code>: Contains meta information about the page (like title).</li>
          <li><code>&lt;title&gt;</code>: Specifies a title for the HTML page (shown in browser tab).</li>
          <li><code>&lt;body&gt;</code>: Defines the document's body, and is a container for all the visible contents.</li>
        </ul>
      </div>
    ),
    // ... default content for other sections
  };

  const DefaultContent = ({ title }) => (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-900 border-b pb-4">{title}</h1>
      <p className="text-gray-700">
        This section covers <strong>{title}</strong>. Detailed notes and examples will be added soon.
      </p>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
        <p className="text-yellow-700">
          Work in progress: The content for this chapter is being prepared.
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)] bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden p-4 border-b flex items-center justify-between bg-gray-50">
        <span className="font-semibold text-gray-700">Menu</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-200 rounded">
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`lg:w-64 bg-gray-50 border-r border-gray-200 flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            HTML Tutorial
          </h2>
        </div>
        <div className="overflow-y-auto h-full pb-20">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => {
                setActiveChapter(chapter.id);
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${
                activeChapter === chapter.id
                  ? 'bg-white text-primary border-primary shadow-sm'
                  : 'text-gray-600 border-transparent hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {chapter.icon}
              {chapter.title}
              {activeChapter === chapter.id && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-10 overflow-y-auto bg-white">
        {content[activeChapter] || <DefaultContent title={chapters.find(c => c.id === activeChapter)?.title} />}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12 pt-6 border-t border-gray-100">
          <button 
            disabled={activeChapter === chapters[0].id}
            onClick={() => {
              const idx = chapters.findIndex(c => c.id === activeChapter);
              if (idx > 0) setActiveChapter(chapters[idx - 1].id);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button 
            disabled={activeChapter === chapters[chapters.length - 1].id}
            onClick={() => {
              const idx = chapters.findIndex(c => c.id === activeChapter);
              if (idx < chapters.length - 1) setActiveChapter(chapters[idx + 1].id);
            }}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HTMLTutorial;
