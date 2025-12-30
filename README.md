# 🚀 Inventori System by BangOos Solutions

Sistem manajemen inventori modern dengan multi-role access control menggunakan Next.js, TypeScript, dan Supabase.

## ✨ Features

- **Multi-Role Authentication**: 3 tingkatan akses (Admin, Manager, Employee)
- **Modern UI**: Desain modern dengan TailwindCSS dan Framer Motion
- **Real-time Updates**: Database real-time dengan Supabase
- **Responsive Design**: Mobile-first approach
- **TypeScript**: Full type safety
- **Role-based Access**: Kontrol akses berdasarkan peran pengguna

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript 5
- **Styling**: TailwindCSS 4, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

1. Node.js 18+ installed
2. Supabase account and project

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bangoos/inventori.git
cd inventori
```

2. Install dependencies:

```bash
npm install
```

3. Setup Supabase:

   - Buat project baru di [Supabase Dashboard](https://supabase.com)
   - Jalankan SQL schema dari `supabase-schema.sql`
   - Copy environment variables

4. Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

5. Run development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 👥 User Roles & Access

### 🔴 Admin

- Full access to all features
- User management
- System configuration
- Complete inventory control

### 🟡 Manager

- View and update inventory
- Generate reports
- Manage stock levels
- No user management

### 🟢 Employee

- View inventory only
- Search items
- Check stock status
- Limited access

## 📊 Default Login Credentials

Setelah setup, gunakan credentials berikut:

- **Admin**: admin@inventori.com
- **Manager**: manager@inventori.com
- **Employee**: employee@inventori.com

_Password akan di-setup melalui Supabase Auth_

## 🗄️ Database Schema

### Users Table

- `id`: UUID primary key
- `email`: Unique email address
- `name`: User display name
- `role`: admin | manager | employee

### Inventory Table

- `id`: UUID primary key
- `name`: Item name
- `description`: Item description
- `quantity`: Stock quantity
- `category`: Item category
- `location`: Storage location
- `status`: available | low_stock | out_of_stock

## 🚀 Deployment

### Vercel Deployment

1. Push ke GitHub:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Connect ke Vercel:
   - Import dari GitHub
   - Setup environment variables
   - Deploy

## 📝 Development

### Project Structure

```
├── app/                 # Next.js app router
│   ├── admin/          # Admin dashboard
│   ├── manager/        # Manager dashboard
│   ├── employee/       # Employee dashboard
│   └── api/           # API routes
├── components/         # React components
│   ├── auth/          # Authentication components
│   ├── ui/            # UI components
│   └── dashboard/     # Dashboard components
├── lib/               # Utility functions
│   ├── auth.ts        # Authentication helpers
│   ├── supabase.ts    # Supabase client
│   └── utils.ts       # General utilities
└── types/             # TypeScript types
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 📞 Support

BangOos Solutions

- Website: https://bangoos.id
- Email: halo@bangoos.id
