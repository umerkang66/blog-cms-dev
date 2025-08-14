# Blog CMS - Full-Stack Content Management System

A modern, feature-rich blog content management system built with Next.js, TypeScript, MongoDB, and Tailwind CSS. This project provides a complete solution for creating, managing, and publishing blog content with user authentication, admin dashboard, and rich text editing capabilities.

## ✨ Key Features

### 🚀 **Core Functionality**
- **Rich Text Editor**: TipTap-based editor with image uploads, YouTube embeds, and link management
- **User Authentication**: NextAuth.js integration with role-based access control
- **Content Management**: Create, edit, delete, and publish blog posts
- **Comment System**: Interactive commenting with replies and like functionality
- **Admin Dashboard**: Comprehensive admin panel for content and user management
- **Search & Filtering**: Advanced search capabilities across posts and content

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Automatic theme detection with smooth transitions
- **Glassmorphism Effects**: Modern UI elements with backdrop blur
- **Smooth Animations**: Micro-interactions and hover effects
- **Infinite Scroll**: Performance-optimized content loading

### 🔧 **Technical Features**
- **TypeScript**: Full type safety and better development experience
- **MongoDB Integration**: Mongoose ODM with Typegoose for data modeling
- **Image Management**: Cloudinary integration for optimized image handling
- **SEO Optimization**: Meta tags, structured data, and URL optimization
- **API Routes**: RESTful API endpoints for all CRUD operations

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 13**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Comprehensive icon library
- **TipTap**: Rich text editor framework

### **Backend**
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB**: NoSQL database with Mongoose ODM
- **NextAuth.js**: Authentication and authorization
- **Cloudinary**: Image upload and optimization
- **Zod**: Schema validation

### **Development Tools**
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- MongoDB database
- Cloudinary account (for image uploads)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-cms-dev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

4. **Database Setup**
   ```bash
   npm run seed
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/          # Admin dashboard components
│   │   ├── content-wrapper.tsx
│   │   ├── latest-posts.tsx
│   │   ├── latest-comments.tsx
│   │   └── latest-users-table.tsx
│   ├── common/         # Shared UI components
│   │   ├── post-card.tsx
│   │   ├── comment-card.tsx
│   │   ├── search-bar.tsx
│   │   └── ui/         # Reusable UI components
│   ├── editor/         # Rich text editor
│   │   ├── index.tsx
│   │   ├── toolbar/
│   │   ├── gallery-modal/
│   │   └── seo-form.tsx
│   └── layout/         # Layout components
│       ├── admin-layout.tsx
│       └── default-layout.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── models/             # MongoDB schemas and models
├── pages/              # Next.js pages and API routes
├── styles/             # Global styles and CSS
└── types/              # TypeScript type definitions
```

## 🎯 Core Components

### **Rich Text Editor**
- **TipTap Integration**: Professional-grade text editing
- **Image Uploads**: Drag & drop with Cloudinary integration
- **YouTube Embeds**: Easy video content integration
- **Link Management**: Internal and external link handling
- **SEO Form**: Meta description and title optimization

### **Admin Dashboard**
- **Content Overview**: Latest posts, comments, and user statistics
- **User Management**: Role-based access control and user administration
- **Post Management**: Create, edit, and publish content
- **Comment Moderation**: Manage user interactions and spam

### **User Features**
- **Authentication**: Secure login with NextAuth.js
- **Profile Management**: User profiles and preferences
- **Content Interaction**: Like, comment, and share posts
- **Search & Discovery**: Find relevant content easily

## 🔐 Authentication & Authorization

### **User Roles**
- **Admin**: Full access to all features and content management
- **User**: Can create posts, comment, and interact with content
- **Guest**: Read-only access to published content

### **Security Features**
- **JWT Tokens**: Secure session management
- **Role-based Access**: Protected routes and components
- **Input Validation**: Zod schema validation for all inputs
- **CSRF Protection**: Built-in Next.js security features

## 📊 Database Schema

### **Post Model**
- Title, content, excerpt, and metadata
- Author reference and publication status
- Tags, categories, and SEO fields
- Like count and comment references

### **User Model**
- Authentication credentials and profile data
- Role-based permissions
- Post and comment relationships
- Activity tracking

### **Comment Model**
- Content and author information
- Nested reply structure
- Like functionality
- Moderation status

## 🎨 Design System

### **Color Palette**
- **Primary**: Neutral grays for text and backgrounds
- **Accent**: Blue tones for interactive elements
- **Success**: Green tones for positive actions
- **Warning**: Yellow/Orange tones for caution
- **Danger**: Red tones for destructive actions

### **Component Variants**
- **Buttons**: Primary, secondary, ghost, and danger variants
- **Cards**: Consistent spacing and shadow system
- **Forms**: Accessible input styling and validation states
- **Navigation**: Responsive navigation with mobile optimization

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Appropriate touch targets and spacing
- **Performance**: Optimized loading and smooth interactions

## 🚀 Performance Features

- **Infinite Scroll**: Efficient content loading
- **Image Optimization**: Cloudinary integration for responsive images
- **Code Splitting**: Next.js automatic code splitting
- **Static Generation**: Pre-rendered pages for better SEO

## 🔧 Customization

### **Adding New Features**
- Follow the established component patterns
- Use the provided TypeScript interfaces
- Implement proper error handling
- Add comprehensive testing

### **Styling Customization**
- Extend Tailwind configuration
- Use CSS custom properties for theming
- Maintain consistent spacing and typography
- Follow accessibility guidelines

## 🧪 Development Workflow

1. **Feature Development**: Create feature branches
2. **Code Quality**: ESLint and Prettier for consistency
3. **Testing**: Manual testing across devices and browsers
4. **Documentation**: Update README and component docs
5. **Deployment**: Build and deploy to production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the established coding patterns
4. Test thoroughly across different devices
5. Submit a pull request with detailed description

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **TipTap**: For the excellent rich text editor
- **Tailwind CSS**: For the utility-first CSS framework
- **MongoDB**: For the flexible NoSQL database

---

**Built with ❤️ using modern web technologies**

*For questions and support, please open an issue in the repository.*
