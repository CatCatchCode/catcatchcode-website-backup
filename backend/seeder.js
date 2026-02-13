const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const User = require('./models/User');
const Course = require('./models/Course');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Course.deleteMany();

    const createdUsers = await User.create([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
      },
      {
        name: 'John Doe',
        email: 'user@example.com',
        password: 'password123',
        role: 'user',
      },
    ]);
    
    console.log(`Created ${createdUsers.length} users`.green.inverse);

    const adminUser = createdUsers[0]._id;

    const sampleCourses = [
      // DSA
      {
        title: 'Mastering Data Structures & Algorithms',
        description: 'Comprehensive guide to DSA with Java. Solve 500+ problems.',
        category: 'DSA',
        price: 4999,
        thumbnail: { url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80' },
        createdBy: adminUser,
      },
      {
        title: 'Advanced Algorithms in C++',
        description: 'Deep dive into graph algorithms, dynamic programming, and more.',
        category: 'DSA',
        price: 3999,
        thumbnail: { url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80' },
        createdBy: adminUser,
      },

      // MERN
      {
        title: 'MERN Stack Front To Back',
        description: 'Full stack React, Redux, Node.js, Express & MongoDB development.',
        category: 'MERN',
        price: 5999,
        thumbnail: { url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80' },
        createdBy: adminUser,
      },
      {
        title: 'React & Node E-Commerce',
        description: 'Build a full-featured e-commerce platform from scratch.',
        category: 'MERN',
        price: 6499,
        thumbnail: { url: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80' },
        createdBy: adminUser,
      },

      // Flutter
      {
        title: 'Flutter & Dart - The Complete Guide',
        description: 'A Complete Guide to the Flutter SDK & Flutter Framework for building native iOS and Android apps.',
        category: 'Flutter',
        price: 4499,
        thumbnail: { url: 'https://images.unsplash.com/photo-1617042375876-a72e3c892790?auto=format&fit=crop&w=800&q=80' },
        createdBy: adminUser,
      },
      
      // iOS
      {
        title: 'iOS 17 & Swift 5 - The Complete iOS App Development Bootcamp',
        description: 'From Beginner to iOS App Developer with Just One Course.',
        category: 'iOS',
        price: 6999,
        thumbnail: { url: 'https://images.unsplash.com/photo-1563206767-5b1d9728c798?auto=format&fit=crop&w=800&q=80' },
        createdBy: adminUser,
      },

      // Android
      {
        title: 'Android App Development Masterclass using Kotlin',
        description: 'Learn Kotlin Android App Development And Become an Android Developer.',
        category: 'Android',
        price: 4999,
        thumbnail: { url: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=800&q=80' },
        createdBy: adminUser,
      },

      // AI/ML
      {
        title: 'Machine Learning A-Z: AI, Python & R',
        description: 'Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.',
        category: 'AI/ML',
        price: 7999,
        thumbnail: { url: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80' },
        createdBy: adminUser,
      },
      {
        title: 'Deep Learning Specialization',
        description: 'Master Deep Learning, Neural Networks, CNNs, RNNs, and more.',
        category: 'AI/ML',
        price: 8999,
        thumbnail: { url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80' },
        createdBy: adminUser,
      },

      // Data Analytics
      {
        title: 'The Data Analyst Course: Complete Data Analyst Bootcamp',
        description: 'Complete Data Analyst Training: Python, Excel, SQL, Tableau, Power BI.',
        category: 'Data Analytics',
        price: 5499,
        thumbnail: { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
        createdBy: adminUser,
      },
    ];

    await Course.insertMany(sampleCourses);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Course.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
