const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const User = require('./models/User');
const Resource = require('./models/Resource');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    const admin = await User.findOne({ email: 'admin@example.com' });
    const user = await User.findOne({ email: 'user@example.com' });

    if (!admin || !user) {
      console.error('Users not found. Run basic seeder first.'.red);
      process.exit(1);
    }

    const resources = [
      {
        user: user._id,
        title: 'React Crash Course 2024',
        url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
        section: 'Video',
        provider: 'youtube',
        progress: 0,
        isCompleted: false,
        timestamps: [
          { label: 'Introduction', time: 0 },
          { label: 'Setup', time: 120 },
          { label: 'Components', time: 300 },
          { label: 'Props', time: 600 },
          { label: 'State', time: 900 }
        ]
      },
      {
        user: user._id,
        title: 'Complete Web Dev Playlist',
        url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agq5TrH9XLIKQ8ETXhOdNaZ',
        section: 'Video',
        provider: 'youtube',
        progress: 25,
        isCompleted: false,
      },
      {
        user: user._id,
        title: 'DSA Roadmap Notion',
        url: 'https://www.notion.so/DSA-Roadmap-123',
        section: 'Notes',
        provider: 'notion',
        progress: 50,
        isCompleted: false,
      },
      {
        user: user._id,
        title: 'System Design PDF',
        url: 'https://example.com/system-design.pdf',
        section: 'Handwritten',
        provider: 'pdf',
        progress: 100,
        isCompleted: true,
      }
    ];

    await Resource.deleteMany({ user: user._id }); // Clear old
    await Resource.insertMany(resources);

    console.log('Dummy Resources Added!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

importData();
