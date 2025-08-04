# SplitMate Development Plan

## 🎯 Project Overview

SplitMate is a comprehensive expense tracking and splitting application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to manage group expenses, individual expenses, and track balances with friends.

## 🏗️ Architecture

### Frontend (React.js)

- **Material-UI (MUI)** for consistent, responsive design
- **Custom reusable components** for maintainability
- **State management** with React hooks
- **Responsive design** for mobile and desktop

### Backend (Node.js + Express)

- **RESTful API** with proper error handling
- **JWT authentication** for secure user sessions
- **MongoDB** with Mongoose ODM
- **Rate limiting** and security middleware
- **Google OAuth** and email verification

### Database (MongoDB)

- **User collection** for user profiles and authentication
- **Group collection** for expense groups
- **Transaction collection** for all expenses
- **Friend collection** for tracking relationships

## 📊 Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  googleId: String,
  authProvider: String (email/google),
  profilePicture: String,
  phone: String,
  dateOfBirth: Date,
  currency: String,
  timezone: String,
  isActive: Boolean,
  lastLogin: Date,
  emailVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Group Collection

```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  createdBy: ObjectId (ref: User),
  members: [ObjectId] (ref: User),
  currency: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction Collection

```javascript
{
  _id: ObjectId,
  payer: ObjectId (ref: User),
  participants: [ObjectId] (ref: User),
  amount: Number,
  currency: String,
  description: String,
  category: String,
  group: ObjectId (ref: Group), // Optional for individual expenses
  date: Date,
  splitType: String (equal/percentage/custom),
  customSplits: [{
    user: ObjectId (ref: User),
    amount: Number
  }],
  receipt: String,
  notes: String,
  isSettled: Boolean,
  settledAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Friend Collection

```javascript
{
  _id: ObjectId,
  requester: ObjectId (ref: User),
  recipient: ObjectId (ref: User),
  status: String (accepted), // Only accepted relationships
  hasTransactions: Boolean,
  lastInteraction: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔗 Database Relationships

```
User (1) ←→ (Many) Group (as members)
User (1) ←→ (Many) Transaction (as payer)
User (Many) ←→ (Many) Transaction (as participants)
Group (1) ←→ (Many) Transaction
User (1) ←→ (Many) Friend (as requester)
User (1) ←→ (Many) Friend (as recipient)
```

## 🎯 Core Features

### 1. Authentication System

- **Email/Password** registration and login
- **Google OAuth** integration
- **Email verification** with OTP
- **JWT token** management
- **Password reset** functionality

### 2. Group Expenses

- **Create groups** for shared expenses
- **Add members** to groups
- **Record expenses** within groups
- **Track balances** per group
- **Settle up** functionality

### 3. Individual Expenses (Splitwise Style)

- **Search users by email** to add to expenses
- **Auto-create friendships** when transactions happen
- **Multiple participants** without requiring groups
- **Track individual balances** with each person
- **Balance breakdowns** by expense categories

### 4. Friends Management

- **Automatic friend creation** when transactions occur
- **Search existing friends** by name
- **View all balances** with friends
- **Settle up** with individual friends
- **Transaction history** with each friend

### 5. Dashboard & Analytics

- **Overall balance** overview
- **Friends list** with individual balances
- **Recent transactions** feed
- **Balance breakdowns** by groups and categories
- **Settlement tracking**

## 🔄 Data Flow & User Interactions

### 1. User Registration/Login

```
Frontend → Backend Auth API → JWT Token → Store in localStorage
```

### 2. Adding Individual Expense (Splitwise Style)

```
1. User clicks "Add Expense" → Expenses page
2. Selects "Individual Expense" → Shows email search
3. Searches for user by email → API returns user data
4. Adds user to participants → Shows in participant chips
5. Fills expense details → Calculates split preview
6. Submits expense → Creates transaction
7. Auto-creates friendship → Both users become "friends"
8. Updates dashboard → Shows new balance
```

### 3. Adding Group Expense

```
1. User clicks "Add Expense" → Expenses page
2. Selects "Group Expense" → Shows group selection
3. Selects group → Shows group members
4. Selects participants → Shows split preview
5. Submits expense → Creates transaction in group
6. Updates group balance → Shows in group dashboard
```

### 4. Dashboard Balance Calculation

```
1. User opens dashboard → API fetches friends
2. For each friend → Calculate transaction balance
3. Group transactions by category → Create breakdown
4. Sum all balances → Calculate overall balance
5. Display friends list → Show individual balances
```

### 5. Friend Search & Management

```
1. User searches by email → API finds users
2. Shows search results → User selects participant
3. Adds to expense → Auto-creates friendship
4. Future searches → Can search by name for existing friends
5. Dashboard shows → All people with transaction history
```

## 🛠️ API Endpoints

### Authentication

```
POST /api/auth/signup - User registration
POST /api/auth/login - User login
POST /api/auth/google - Google OAuth
POST /api/auth/send-verification - Send email verification
POST /api/auth/verify-email - Verify email with OTP
GET /api/auth/me - Get current user
PUT /api/auth/profile - Update profile
POST /api/auth/logout - Logout
```

### Friends (Splitwise Style)

```
GET /api/friends - Get all friends with balances
GET /api/friends/search - Search users by email/name
```

### Groups

```
GET /api/groups - Get user's groups
POST /api/groups - Create new group
PUT /api/groups/:id - Update group
DELETE /api/groups/:id - Delete group
POST /api/groups/:id/members - Add member to group
DELETE /api/groups/:id/members/:memberId - Remove member
```

### Transactions

```
GET /api/transactions - Get user's transactions
POST /api/transactions - Create new transaction
PUT /api/transactions/:id - Update transaction
DELETE /api/transactions/:id - Delete transaction
GET /api/transactions/balances - Get all balances
POST /api/transactions/:id/settle - Mark as settled
```

## 🎨 UI/UX Design

### Design System

- **Material-UI** components with custom theming
- **Responsive design** for all screen sizes
- **Consistent spacing** and typography
- **Accessible** color contrast and interactions

### Key Pages

1. **Login/Signup** - Clean, modern authentication screens
2. **Dashboard** - Splitwise-style friends list with balances
3. **Add Expense** - Flexible form for individual/group expenses
4. **Groups** - Group management and overview
5. **History** - Transaction history and analytics
6. **Profile** - User settings and preferences

## 🔒 Security Features

### Authentication Security

- **JWT tokens** with expiration
- **Password hashing** with bcrypt
- **Rate limiting** on auth endpoints
- **Input sanitization** and validation
- **CORS** configuration

### Data Security

- **Environment variables** for sensitive data
- **MongoDB injection** prevention
- **XSS protection** with helmet
- **Secure headers** configuration

## 🚀 Deployment Strategy

### Frontend (Vercel)

- **Static build** optimization
- **Environment variables** configuration
- **Custom domain** setup
- **SSL certificate** management

### Backend (Vercel Functions)

- **Serverless functions** for API endpoints
- **MongoDB Atlas** connection
- **Environment variables** management
- **CORS** configuration for production

### Database (MongoDB Atlas)

- **Cloud-hosted** MongoDB
- **Backup** and recovery
- **Monitoring** and alerts
- **Connection** security

## 📱 Mobile Responsiveness

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile-First Features

- **Touch-friendly** buttons and inputs
- **Swipe gestures** for navigation
- **Optimized** form layouts
- **Fast loading** times

## 🧪 Testing Strategy

### Frontend Testing

- **Component testing** with React Testing Library
- **Integration testing** for user flows
- **E2E testing** with Cypress
- **Accessibility testing** with axe-core

### Backend Testing

- **Unit testing** with Jest
- **API testing** with Supertest
- **Database testing** with test database
- **Security testing** with OWASP guidelines

## 📈 Performance Optimization

### Frontend

- **Code splitting** and lazy loading
- **Image optimization** and compression
- **Bundle size** optimization
- **Caching** strategies

### Backend

- **Database indexing** for queries
- **Query optimization** and pagination
- **Caching** with Redis (future)
- **Compression** middleware

## 🔄 Development Workflow

### Git Workflow

1. **Feature branches** for new development
2. **Pull requests** for code review
3. **Automated testing** on PR
4. **Staging deployment** for testing
5. **Production deployment** after approval

### Code Quality

- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety (future)
- **Documentation** with JSDoc

## 🎯 Success Metrics

### User Engagement

- **Daily active users**
- **Session duration**
- **Feature adoption** rates
- **User retention** rates

### Technical Performance

- **Page load times** < 3 seconds
- **API response times** < 500ms
- **Uptime** > 99.9%
- **Error rates** < 1%

## 🚀 Future Enhancements

### Phase 2 Features

- **Push notifications** for settlements
- **Receipt scanning** with OCR
- **Multi-currency** support
- **Export functionality** (PDF/Excel)
- **Recurring expenses**
- **Budget tracking**

### Phase 3 Features

- **Real-time updates** with WebSockets
- **Mobile app** (React Native)
- **Advanced analytics** and reports
- **Integration** with banking APIs
- **AI-powered** expense categorization

## 📚 Documentation

### For Developers

- **API documentation** with Swagger
- **Component library** documentation
- **Database schema** documentation
- **Deployment** guides

### For Users

- **User guide** and tutorials
- **FAQ** section
- **Video tutorials**
- **Support** documentation

---

This development plan provides a comprehensive roadmap for building SplitMate with a focus on the Splitwise-style individual expense management and automatic friend creation through transactions.
