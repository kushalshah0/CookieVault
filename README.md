# 🍪 CookieVault

A modern, secure full-stack web application for managing and copying website cookies, featuring a public marketing landing page and a login-protected admin dashboard.

## ✨ Features

- 🔐 **Secure Authentication** - NextAuth-based credential authentication
- 🎨 **Modern UI** - Built with Next.js 14, Tailwind CSS, and shadcn/ui
- 🌓 **Dark/Light Theme** - System preference + manual toggle
- 🗄️ **MongoDB Database** - Mongoose ODM for data management
- 🎭 **Animations** - Smooth transitions with Framer Motion
- 📱 **Responsive Design** - Mobile-first approach
- 🚀 **Fast & Optimized** - Built on Next.js App Router
- 🔒 **Route Protection** - Middleware-based authentication

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB instance (local or cloud)
- npm or yarn or pnpm

## 🚀 Getting Started

### 1. Clone or extract the project

```bash
cd cookievault
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/CookieVault

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this

# Admin Credentials (for initial setup)
ADMIN_EMAIL=admin@cookievault.com
ADMIN_PASSWORD=admin123
```

**Important**: Change `NEXTAUTH_SECRET` to a random secure string. You can generate one with:

```bash
openssl rand -base64 32
```

### 4. Start MongoDB

Make sure MongoDB is running locally or update `MONGODB_URI` with your cloud MongoDB connection string.

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Create the admin user

On first run, you need to seed the admin user. You can do this by making a POST request to:

```
POST http://localhost:3000/api/seed
```

Using curl:
```bash
curl -X POST http://localhost:3000/api/seed
```

Or using the browser console on the login page:
```javascript
fetch('/api/seed', { method: 'POST' })
  .then(r => r.json())
  .then(console.log)
```

### 7. Login

Navigate to `/login` and use the credentials from your `.env` file (default: admin@cookievault.com / admin123)

## 📁 Project Structure

```
cookievault/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # NextAuth endpoints
│   │   ├── cookies/         # Cookie CRUD operations
│   │   └── seed/            # Admin seeding
│   ├── dashboard/           # Protected dashboard
│   ├── login/               # Login page
│   ├── terms/               # Terms page
│   ├── disclaimer/          # Disclaimer page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── navbar.tsx           # Navigation bar
│   ├── theme-provider.tsx   # Theme context
│   ├── theme-toggle.tsx     # Theme switcher
│   ├── cookie-dialog.tsx    # Add/Edit cookie modal
│   └── delete-dialog.tsx    # Delete confirmation
├── lib/                     # Utilities
│   ├── mongodb.ts           # Database connection
│   ├── auth.ts              # Auth configuration
│   └── utils.ts             # Helper functions
├── models/                  # Mongoose models
│   ├── Admin.ts             # Admin user model
│   └── Cookie.ts            # Cookie data model
├── types/                   # TypeScript types
│   └── next-auth.d.ts       # NextAuth type extensions
├── middleware.ts            # Route protection
└── package.json             # Dependencies
```

## 🔐 Security Best Practices

- ✅ Password hashing with bcrypt
- ✅ Environment variables for secrets
- ✅ Server-side validation
- ✅ Protected routes with middleware
- ✅ Session-based authentication
- ⚠️ **Remove `/api/seed` endpoint in production**
- ⚠️ **Use strong passwords**
- ⚠️ **Enable HTTPS in production**

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/signin` - Login
- `POST /api/auth/signout` - Logout

### Cookies (Protected)
- `GET /api/cookies` - Get all cookies
- `POST /api/cookies` - Create a cookie
- `GET /api/cookies/[id]` - Get single cookie
- `PUT /api/cookies/[id]` - Update cookie
- `DELETE /api/cookies/[id]` - Delete cookie

### Setup
- `POST /api/seed` - Create admin user (development only)

## 📝 Database Schema

### Admin Collection
```typescript
{
  email: string
  passwordHash: string
  role: string
  createdAt: Date
  updatedAt: Date
}
```

### Cookie Collection
```typescript
{
  websiteName: string
  slug: string
  description: string
  cookies: string
  tags: string[]
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

Make sure to:
- Set all environment variables
- Use a production MongoDB instance
- Set `NODE_ENV=production`
- Remove or protect the `/api/seed` endpoint

## ⚠️ Disclaimer

**For Educational and Testing Purposes Only**

CookieVault is designed for developers and testers working in controlled environments. Users are responsible for:
- Ensuring proper authorization
- Complying with privacy laws
- Implementing additional security as needed
- Using ethical practices

See the full [Disclaimer](/disclaimer) for more information.

## 📄 License

This project is provided as-is for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ using Next.js, TypeScript, and MongoDB
