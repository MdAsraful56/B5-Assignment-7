# Backend api/v1 Service

A robust Node.js backend service built with Express and Prisma, featuring authentication, validation, and comprehensive api/v1 endpoints.

## 📋 Features

-   **Authentication & Authorization**: JWT-based authentication with bcrypt password hashing
-   **Database**: Prisma ORM for type-safe database operations
-   **Validation**: Zod schema validation for request data
-   **Security**: CORS enabled, cookie parsing, and secure password handling
-   **Performance**: Compression middleware for optimized responses
-   **Modular Architecture**: Clean separation of concerns with controllers, services, routes, and middleware

## 🛠️ Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express 5.x
-   **Database ORM**: Prisma 6.x
-   **Authentication**: JSON Web Tokens (JWT) + Bcrypt
-   **Validation**: Zod
-   **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm or yarn
-   PostgreSQL/MySQL/MongoDB (depending on your Prisma configuration)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Configure your `.env` file with the following variables:

```env
DATABASE_URL="your-database-connection-string"
JWT_SECRET="your-jwt-secret-key"
PORT=3000
NODE_ENV=development
```

4. Set up Prisma:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

5. Start the development server:

```bash
npm run dev
```

## 📁 Project Structure

```
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── modules/          # Feature modules
│   │   └── auth/         # Authentication module
│   ├── routes/           # api/v1 routes
│   │   ├── auth/         # Auth routes
│   │   ├── contact/      # Contact routes
│   │   ├── post/         # Post routes
│   │   ├── project/      # Project routes
│   │   └── users/        # User routes
│   ├── helpers/          # Helper utilities
│   ├── interfaces/       # TypeScript interfaces
│   └── utils/            # Utility functions
├── prisma/
│   └── schema.prisma     # Prisma schema
└── package.json
```

## 🔐 Authentication

This api/v1 uses JWT-based authentication. Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📝 api/v1 Endpoints

### Authentication

-   `POST /api/v1/auth/register` - Register a new user
-   `POST /api/v1/auth/login` - Login user
-   `POST /api/v1/auth/logout` - Logout user

### Users

-   `GET /api/v1/v1/users` - Get all users
-   `GET /api/v1/users/:id` - Get user by ID
-   `PUT /api/v1/users/:id` - Update user
-   `DELETE /api/v1/users/:id` - Delete user

### Posts

-   `GET /api/v1/posts` - Get all posts
-   `POST /api/v1/posts` - Create new post
-   `GET /api/v1/posts/:id` - Get post by ID
-   `PUT /api/v1/posts/:id` - Update post
-   `DELETE /api/v1/posts/:id` - Delete post

### Projects

-   `GET /api/v1/projects` - Get all projects
-   `POST /api/v1/projects` - Create new project
-   `GET /api/v1/projects/:id` - Get project by ID
-   `PUT /api/v1/projects/:id` - Update project
-   `DELETE /api/v1/projects/:id` - Delete project

### Contact

-   `POST /api/v1/contact` - Submit contact form

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

-   Md Asraful - [GitHub Profile](https://github.com/MdAsraful56)

## 🙏 Acknowledgments

-   Express.js team for the excellent framework
-   Prisma team for the amazing ORM
-   All contributors who help improve this project

-   [Live Demo](https://portfolio-backend-server-side.vercel.app)
