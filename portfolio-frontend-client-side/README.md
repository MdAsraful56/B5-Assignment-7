# Frontend - Next.js Application

A modern, responsive Next.js application with TypeScript, featuring authentication, blog functionality, and a comprehensive UI component library.

## 🚀 Features

-   **Next.js 14+**: Latest Next.js with App Router
-   **TypeScript**: Full type safety across the application
-   **Authentication**: Complete auth system with login, registration, and protected routes
-   **Blog System**: Full-featured blog with posts and details pages
-   **Project Showcase**: Portfolio/project display functionality
-   **Responsive Design**: Mobile-first, fully responsive layout
-   **Component Library**: Reusable UI components
-   **Form Handling**: Advanced form components with validation
-   **Theme Support**: Dark/light mode with theme provider
-   **SEO Optimized**: Meta tags and SEO best practices

## 🛠️ Tech Stack

-   **Framework**: Next.js 14+
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS / CSS Modules
-   **UI Components**: Custom component library
-   **State Management**: React Hooks & Context API
-   **Forms**: Custom form components
-   **Authentication**: JWT-based auth integration

## 📦 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth route group
│   │   │   └── login/         # Login page
│   │   ├── (dashboard)/       # Dashboard route group
│   │   │   └── dashboard/     # Dashboard page
│   │   ├── about/             # About page
│   │   ├── blog/              # Blog pages
│   │   │   ├── [blogDetails]/ # Dynamic blog post
│   │   │   └── page.tsx       # Blog listing
│   │   ├── Home/              # Home page components
│   │   │   └── shared/        # Shared home components
│   │   ├── project/           # Projects showcase
│   │   │   └── [ProjectDetails]/ # Project details
│   │   ├── Contact.tsx        # Contact page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   │
│   ├── components/            # Reusable components
│   │   ├── modules/           # Feature modules
│   │   │   ├── About.tsx
│   │   │   ├── Auth/          # Auth components
│   │   │   ├── Skill.tsx
│   │   │   ├── form/          # Form components
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   └── Blogs/         # Blog components
│   │   │       ├── Blog.tsx
│   │   │       ├── BlogCard.tsx
│   │   │       └── BlogDetails.tsx
│   │   │
│   │   ├── layout/            # Layout components
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   └── not-found.tsx
│   │   │
│   │   └── ui/                # UI primitives
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── ...
│   │
│   ├── lib/                   # Utility libraries
│   │   └── theme-provider.tsx # Theme context
│   │
│   └── utils/                 # Helper functions
│
├── public/                    # Static assets
│   ├── fonts/
│   └── ...
│
├── .env.local                 # Environment variables
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   npm, yarn, or pnpm
-   Backend API running (see backend README)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Pages & Routes

### Public Routes

-   `/` - Home page
-   `/about` - About page
-   `/blog` - Blog listing
-   `/blog/[id]` - Individual blog post
-   `/project` - Projects showcase
-   `/project/[id]` - Project details
-   `/Contact` - Contact page
-   `/login` - Login page

### Protected Routes (Requires Authentication)

-   `/dashboard` - User dashboard

## 🎨 Component Library

### UI Components

-   **Header**: Navigation header with responsive menu
-   **Footer**: Site footer with links
-   **Button**: Reusable button component
-   **Card**: Content card component
-   **Form Components**: Input, Select, Textarea, etc.

### Module Components

-   **Auth Components**: Login, Register forms
-   **Blog Components**: BlogCard, BlogDetails
-   **Project Components**: ProjectCard, ProjectDetails
-   **Skill Components**: Skills display

## 🔐 Authentication

The application includes a complete authentication system:

-   User registration
-   User login
-   JWT token management
-   Protected routes
-   Automatic token refresh
-   Logout functionality

## 🎨 Styling

This project uses:

-   **Tailwind CSS** for utility-first styling
-   **CSS Modules** for component-scoped styles
-   **Custom fonts** stored in `/public/fonts`
-   **Theme Provider** for dark/light mode support

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🔧 Configuration Files

-   `next.config.js` - Next.js configuration
-   `tailwind.config.js` - Tailwind CSS configuration
-   `tsconfig.json` - TypeScript configuration
-   `postcss.config.js` - PostCSS configuration
-   `components.json` - UI components configuration

## 🌐 API Integration

The frontend communicates with the backend API for:

-   User authentication
-   Blog posts CRUD operations
-   Project data fetching
-   Contact form submissions

API calls are typically made in:

-   Server Components (App Router)
-   API route handlers in `/app/api`
-   Client-side hooks for dynamic interactions

## 📈 Performance Optimization

-   Server-side rendering (SSR) for dynamic pages
-   Static generation (SSG) for static pages
-   Image optimization with Next.js Image component
-   Code splitting and lazy loading
-   Font optimization

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

-   Md Asraful - [GitHub Profile](https://github.com/MdAsraful56)

## 🙏 Acknowledgments

-   Next.js team for the amazing framework
-   Vercel for hosting and deployment platform
-   All contributors who help improve this project

## 🔗 Links

-   [Backend Repository](https://github.com/yourusername/backend)
-   [Live Demo](https://your-demo-url.com)
