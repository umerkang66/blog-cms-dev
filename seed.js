const mongoose = require('mongoose');
require('dotenv').config({ path: './.env.local' });

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log(mongoose.modelNames());
});

// Define the schemas directly in the seed file
const thumbnailSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    public_id: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    meta: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    tags: [{ type: String, default: [] }],
    thumbnail: thumbnailSchema,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    likedByCurrentUser: { type: Boolean, default: false },
  },
  {
    collection: 'posts',
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    provider: { type: String, enum: ['github', 'google'], default: 'github' },
    avatar: { type: String, trim: true },
  },
  {
    collection: 'users',
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

// Create models
const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);

// Sample data for seeding posts
const samplePosts = [
  {
    title: 'The Future of Web Development: AI-Powered Tools',
    content: `
      <p>The landscape of web development is rapidly evolving with the integration of artificial intelligence. From automated code generation to intelligent debugging, AI is transforming how developers build and maintain web applications.</p>
      
      <p>Modern frameworks and tools are incorporating machine learning algorithms to provide better developer experience, faster development cycles, and more robust applications. The future promises even more sophisticated AI assistance that could revolutionize the entire development workflow.</p>
      
      <p>As we move forward, developers need to adapt to these new tools while maintaining the human creativity and problem-solving skills that make great applications possible.</p>
    `,
    meta: 'Exploring how artificial intelligence is reshaping web development practices and tools in 2024',
    slug: 'future-web-development-ai-tools',
    tags: ['Web Development', 'AI', 'Technology', 'Programming'],
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      public_id: 'seed_ai_web_dev',
    },
  },
  {
    title: 'Building Scalable React Applications with TypeScript',
    content: `
      <p>TypeScript has become the standard for building large-scale React applications. Its type safety and enhanced developer experience make it an essential tool for modern web development.</p>
      
      <p>In this comprehensive guide, we'll explore advanced TypeScript patterns, proper type definitions, and best practices for creating maintainable React components. We'll also cover state management, custom hooks, and performance optimization techniques.</p>
      
      <p>Whether you're a beginner or an experienced developer, understanding TypeScript with React will significantly improve your code quality and development efficiency.</p>
    `,
    meta: 'A comprehensive guide to building scalable React applications using TypeScript best practices',
    slug: 'scalable-react-typescript-applications',
    tags: ['React', 'TypeScript', 'Frontend', 'Web Development'],
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
      public_id: 'seed_react_typescript',
    },
  },
  {
    title: 'The Art of Database Design: MongoDB Best Practices',
    content: `
      <p>Database design is crucial for application performance and scalability. MongoDB, as a NoSQL database, offers unique advantages and challenges that developers must understand to build efficient applications.</p>
      
      <p>We'll dive deep into schema design principles, indexing strategies, and query optimization techniques. Learn how to structure your data for optimal performance and how to avoid common pitfalls that can lead to slow queries and poor user experience.</p>
      
      <p>Proper database design is the foundation of any successful application, and these best practices will help you build robust, scalable systems.</p>
    `,
    meta: 'Essential MongoDB design principles and best practices for building scalable applications',
    slug: 'mongodb-database-design-best-practices',
    tags: ['MongoDB', 'Database', 'Backend', 'Performance'],
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop',
      public_id: 'seed_mongodb_design',
    },
  },
  {
    title: 'Next.js 13+ Features: App Router and Server Components',
    content: `
      <p>Next.js 13+ introduces revolutionary changes with the App Router and Server Components. These features fundamentally change how we think about React applications and their architecture.</p>
      
      <p>The App Router provides a more intuitive file-based routing system, while Server Components enable better performance and SEO through server-side rendering. We'll explore how to leverage these features to build faster, more efficient applications.</p>
      
      <p>Understanding these new paradigms is essential for modern React development and will give you a competitive edge in building next-generation web applications.</p>
    `,
    meta: 'Exploring Next.js 13+ App Router and Server Components for modern web development',
    slug: 'nextjs-13-app-router-server-components',
    tags: ['Next.js', 'React', 'Web Development', 'Performance'],
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1555066931-4365d9b2d0c9?w=800&h=600&fit=crop',
      public_id: 'seed_nextjs_13',
    },
  },
  {
    title: 'CSS Grid vs Flexbox: When to Use Each',
    content: `
      <p>CSS Grid and Flexbox are powerful layout systems that solve different problems in web design. Understanding when and how to use each can significantly improve your CSS skills and create better user interfaces.</p>
      
      <p>Flexbox excels at one-dimensional layouts and component alignment, while CSS Grid is perfect for two-dimensional layouts and complex page structures. We'll explore practical examples and real-world use cases for both systems.</p>
      
      <p>Mastering both layout systems will make you a more versatile frontend developer and enable you to create sophisticated, responsive designs.</p>
    `,
    meta: 'Understanding the differences between CSS Grid and Flexbox and when to use each layout system',
    slug: 'css-grid-vs-flexbox-when-to-use',
    tags: ['CSS', 'Frontend', 'Web Design', 'Layout'],
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      public_id: 'seed_css_layout',
    },
  },
  {
    title: 'API Security Best Practices for Modern Web Applications',
    content: `
      <p>Security is paramount in today's interconnected web. APIs are the backbone of modern applications, making them prime targets for malicious attacks. Implementing proper security measures is not optional—it's essential.</p>
      
      <p>We'll cover authentication, authorization, input validation, rate limiting, and other critical security practices. Learn how to protect your APIs from common vulnerabilities like SQL injection, XSS, and CSRF attacks.</p>
      
      <p>Building secure APIs from the ground up will save you from costly security breaches and protect your users' data and trust.</p>
    `,
    meta: 'Essential security practices for building and maintaining secure web APIs',
    slug: 'api-security-best-practices-web-applications',
    tags: ['Security', 'API', 'Backend', 'Web Development'],
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
      public_id: 'seed_api_security',
    },
  },
  {
    title: 'Performance Optimization Techniques for React Applications',
    content: `
      <p>Performance is a key factor in user experience and business success. React applications can become slow as they grow, but there are numerous techniques to keep them fast and responsive.</p>
      
      <p>We'll explore React.memo, useMemo, useCallback, code splitting, lazy loading, and other optimization strategies. Learn how to identify performance bottlenecks and implement solutions that make a real difference.</p>
      
      <p>Optimizing React applications is both an art and a science, and mastering these techniques will make you a more valuable developer.</p>
    `,
    meta: 'Advanced techniques for optimizing React application performance and user experience',
    slug: 'react-performance-optimization-techniques',
    tags: ['React', 'Performance', 'Frontend', 'Optimization'],
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      public_id: 'seed_react_performance',
    },
  },
  {
    title: 'Building a Blog CMS with Next.js and MongoDB',
    content: `
      <p>Content Management Systems are essential for modern websites. Building one from scratch gives you complete control over features and functionality while learning valuable development skills.</p>
      
      <p>This project combines Next.js for the frontend, MongoDB for data storage, and various modern web technologies to create a robust blogging platform. We'll cover user authentication, content creation, image management, and more.</p>
      
      <p>Building a CMS is an excellent way to practice full-stack development and create something useful for content creators.</p>
    `,
    meta: 'Step-by-step guide to building a complete blog CMS using Next.js and MongoDB',
    slug: 'building-blog-cms-nextjs-mongodb',
    tags: ['Next.js', 'MongoDB', 'CMS', 'Full-stack'],
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
      public_id: 'seed_blog_cms',
    },
  },
  {
    title: 'Modern JavaScript Features Every Developer Should Know',
    content: `
      <p>JavaScript has evolved significantly in recent years, introducing powerful features that make development more efficient and code more readable. Staying up-to-date with these features is crucial for modern web development.</p>
      
      <p>We'll explore ES6+ features like destructuring, spread operators, arrow functions, async/await, and modules. These features have become standard in modern JavaScript and are essential for writing clean, maintainable code.</p>
      
      <p>Understanding modern JavaScript features will make you a more productive developer and enable you to write better code.</p>
    `,
    meta: 'Essential modern JavaScript features and how to use them effectively in web development',
    slug: 'modern-javascript-features-developers',
    tags: ['JavaScript', 'ES6', 'Web Development', 'Programming'],
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
      public_id: 'seed_modern_js',
    },
  },
  {
    title: 'Responsive Design Principles for Modern Web Applications',
    content: `
      <p>Responsive design is no longer optional—it's essential for modern web applications. With users accessing websites from devices of all sizes, creating adaptable layouts is crucial for user experience and business success.</p>
      
      <p>We'll explore mobile-first design, flexible grids, responsive images, and CSS media queries. Learn how to create websites that look great and function perfectly on any device, from mobile phones to large desktop screens.</p>
      
      <p>Mastering responsive design will make you a more versatile developer and ensure your applications reach the widest possible audience.</p>
    `,
    meta: 'Comprehensive guide to responsive design principles and implementation techniques',
    slug: 'responsive-design-principles-web-applications',
    tags: ['Responsive Design', 'CSS', 'Web Design', 'UX'],
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      public_id: 'seed_responsive_design',
    },
  },
  {
    title: 'State Management in React: Context API vs Redux',
    content: `
      <p>State management is a critical aspect of React application architecture. Choosing the right solution can make the difference between a maintainable codebase and a complex, hard-to-debug application.</p>
      
      <p>We'll compare React's built-in Context API with Redux, exploring when to use each solution. Learn about state patterns, performance considerations, and best practices for managing application state effectively.</p>
      
      <p>Understanding state management options will help you make informed decisions about your application architecture and build better React applications.</p>
    `,
    meta: 'Comparing React Context API and Redux for effective state management in React applications',
    slug: 'react-state-management-context-api-redux',
    tags: ['React', 'State Management', 'Redux', 'Context API'],
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
      public_id: 'seed_state_management',
    },
  },
  {
    title: 'Testing Strategies for Full-Stack Web Applications',
    content: `
      <p>Testing is essential for building reliable, maintainable web applications. A comprehensive testing strategy covers unit tests, integration tests, and end-to-end tests across the entire application stack.</p>
      
      <p>We'll explore testing frameworks, mocking strategies, and best practices for testing both frontend and backend code. Learn how to write tests that catch bugs early and give you confidence in your code changes.</p>
      
      <p>Good testing practices will save you time in the long run and help you build more robust applications that your users can depend on.</p>
    `,
    meta: 'Comprehensive testing strategies and best practices for full-stack web applications',
    slug: 'testing-strategies-full-stack-applications',
    tags: ['Testing', 'Full-stack', 'Quality Assurance', 'Web Development'],
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      public_id: 'seed_testing_strategies',
    },
  },
  {
    title: 'Deploying Web Applications: From Development to Production',
    content: `
      <p>Deployment is the final step in bringing your web application to life. Understanding the deployment process and choosing the right hosting solution is crucial for success.</p>
      
      <p>We'll cover deployment strategies, environment configuration, CI/CD pipelines, and monitoring. Learn how to deploy your applications reliably and maintain them in production environments.</p>
      
      <p>Proper deployment practices ensure your applications are available to users and can handle real-world traffic and usage patterns.</p>
    `,
    meta: 'Complete guide to deploying web applications from development to production environments',
    slug: 'deploying-web-applications-development-production',
    tags: ['Deployment', 'DevOps', 'CI/CD', 'Web Development'],
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
      public_id: 'seed_deployment',
    },
  },
];

// Database connection string - will be loaded from .env.local file
const MONGODB_URI = process.env.MONGO_URL;

async function seedDatabase() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    console.log('Using connection string:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Delete all existing posts
    console.log('Deleting all existing posts...');
    const deleteResult = await Post.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing posts`);

    // Find a user to use as the author (you may need to create one first)
    let author = await User.findOne({});

    if (!author) {
      console.log('No users found. Creating a default admin user...');
      author = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        provider: 'github',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      });
      console.log('Created default admin user:', author.name);
    } else {
      console.log('Using existing user as author:', author.name);
    }

    // Create posts with the found/created author
    console.log('Creating new posts...');
    const postsToCreate = samplePosts.map(post => ({
      ...post,
      author: author._id,
      likes: [],
      likedByCurrentUser: false,
    }));

    const createdPosts = await Post.insertMany(postsToCreate);
    console.log(`Successfully created ${createdPosts.length} posts`);

    // Display created posts
    console.log('\nCreated posts:');
    createdPosts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title} (${post.slug})`);
    });

    console.log('\nDatabase seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    console.error('Stack trace:', error.stack);
  } finally {
    // Close the database connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('Database connection closed');
    }
    process.exit(0);
  }
}

// Run the seeding function
seedDatabase();
