# 🛠️ SplitMate - Expense Tracking & Splitting Application

A MERN-stack application for tracking and splitting expenses with friends, roommates, and colleagues.

## 📋 Features

- **User Authentication**: Secure signup/login with JWT
- **Group Management**: Create and manage expense groups
- **Expense Tracking**: Add and track expenses with custom splits
- **Balance Calculation**: Automatic balance calculation for all members
- **Settlement Tracking**: Record payments and settlements
- **Transaction History**: Complete audit trail of all transactions

## 🏗️ Tech Stack

### Frontend

- **React.js** - UI framework
- **Material-UI (MUI)** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd SplitMate
   ```

2. **Install dependencies**

   ```bash
   npm run install-all
   ```

3. **Environment Setup**

   ```bash
   # Copy backend environment file
   cp backend/env.example backend/.env

   # Edit backend/.env with your configuration
   MONGODB_URI=mongodb://localhost:27017/splitmate
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Start the application**

   ```bash
   # Development mode (both frontend and backend)
   npm run dev

   # Or start separately
   npm run server  # Backend only
   npm run client  # Frontend only
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
SplitMate/
├── frontend/                 # React frontend
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── theme/           # MUI theme config
│   │   ├── utils/           # Utility functions
│   │   └── assets/          # Static assets
│   └── package.json
├── backend/                  # Node.js backend
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Express middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   └── package.json
└── package.json             # Root package.json
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

- **Signup**: Create new account with name, email, and password
- **Login**: Authenticate with email and password
- **Protected Routes**: All group and expense operations require authentication
- **Token Storage**: JWT tokens stored in localStorage

## 📊 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Groups (Protected)

- `GET /api/groups` - Get user's groups
- `POST /api/groups` - Create new group

### Expenses (Protected)

- `GET /api/expenses` - Get user's expenses
- `POST /api/expenses` - Create new expense

## 🎨 UI Components

The application uses Material-UI components with a custom theme:

- **Cards**: For displaying information
- **Forms**: For data input with validation
- **Buttons**: Consistent styling across the app
- **Snackbars**: For notifications and feedback
- **Navigation**: App bar with user info and logout

## 🔧 Development

### Adding New Features

1. **Backend**: Add routes, controllers, and models as needed
2. **Frontend**: Create components and integrate with API
3. **Testing**: Add unit tests for new functionality

### Code Style

- Use consistent naming conventions
- Follow the established folder structure
- Use Material-UI theme for styling
- Implement proper error handling
- Add loading states for async operations

## 🚀 Deployment

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build
```

### Backend (Render/Railway)

- Set environment variables
- Deploy Node.js application
- Configure MongoDB connection

## 📝 TODO

- [ ] Implement group creation and management
- [ ] Add expense tracking functionality
- [ ] Implement balance calculation
- [ ] Add settlement tracking
- [ ] Create transaction history
- [ ] Add user profile management
- [ ] Implement real-time notifications
- [ ] Add data export functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**SplitMate Team** - Building better expense management together! 💰
