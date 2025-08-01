# SplitMate Development Plan & Architecture Guide

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Frontend Architecture](#frontend-architecture)
6. [Development Phases](#development-phases)
7. [Component Flow Diagrams](#component-flow-diagrams)
8. [Data Flow Patterns](#data-flow-patterns)
9. [Implementation Guidelines](#implementation-guidelines)
10. [Testing Strategy](#testing-strategy)

---

## 🎯 Project Overview

**SplitMate** is a MERN stack expense tracking and splitting application that allows users to:

- Create groups for expense sharing
- Add expenses and split them among group members
- Track balances and settlements
- View transaction history
- Manage user profiles

### Core Features

- **User Authentication** (Signup/Login)
- **Group Management** (Create, Join, Leave)
- **Expense Management** (Add, Edit, Delete)
  - **Group Expenses**: Split expenses among group members
  - **Individual Expenses**: Direct debts between two people
- **Balance Tracking** (Who owes what to whom)
  - **Group Balances**: Per-group balance calculations
  - **Personal Balances**: Overall balance with each person
- **Settlement System** (Mark expenses as paid)
- **Transaction History** (Detailed logs)
- **User Profiles** (Settings, Statistics)
- **Friends Management** (Add, remove friends for individual expenses)

---

## 🏗️ System Architecture

### High-Level Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │
│                 │    │                 │    │                 │
│ • Components    │    │ • Express.js    │    │ • Users         │
│ • State Mgmt    │    │ • JWT Auth      │    │ • Groups        │
│ • Routing       │    │ • API Routes    │    │ • Expenses      │
│ • UI/UX         │    │ • Middleware    │    │ • Transactions  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack

- **Frontend**: React.js, Material-UI, Axios
- **Backend**: Node.js, Express.js, JWT
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT Tokens
- **State Management**: React Context API

---

## 🗄️ Database Schema

### 1. User Collection

```javascript
// Schema: User
{
  _id: ObjectId,
  name: String (required, min: 2, max: 50),
  email: String (required, unique, lowercase),
  password: String (required, min: 6, hashed),
  avatar: String (optional, default: null),
  phone: String (optional),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now),

  // Virtual fields (calculated)
  totalExpenses: Number (virtual),
  totalGroups: Number (virtual),
  balance: Number (virtual)
}

// Indexes
- email: unique
- createdAt: -1
```

### 2. Group Collection

```javascript
// Schema: Group
{
  _id: ObjectId,
  name: String (required, min: 2, max: 100),
  description: String (max: 500),
  creator: ObjectId (ref: 'User', required),
  members: [{
    user: ObjectId (ref: 'User', required),
    role: String (enum: ['admin', 'member'], default: 'member'),
    joinedAt: Date (default: Date.now)
  }],
  totalExpenses: Number (default: 0),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}

// Indexes
- creator: 1
- 'members.user': 1
- createdAt: -1
```

### 3. Expense Collection

```javascript
// Schema: Expense
{
  _id: ObjectId,
  title: String (required, min: 2, max: 100),
  amount: Number (required, min: 0.01),
  description: String (max: 500),
  category: String (enum: ['food', 'transport', 'entertainment', 'shopping', 'utilities', 'other'], default: 'other'),
  expenseType: String (enum: ['group', 'individual'], required),
  group: ObjectId (ref: 'Group', optional), // Required only for group expenses
  paidBy: ObjectId (ref: 'User', required),
  owedBy: ObjectId (ref: 'User', optional), // Required only for individual expenses
  splitWith: [{
    user: ObjectId (ref: 'User', required),
    amount: Number (required, min: 0),
    isPaid: Boolean (default: false),
    paidAt: Date (optional)
  }],
  date: Date (default: Date.now),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}

// Indexes
- group: 1
- paidBy: 1
- owedBy: 1
- expenseType: 1
- 'splitWith.user': 1
- date: -1
- createdAt: -1
```

### 4. Transaction Collection

```javascript
// Schema: Transaction
{
  _id: ObjectId,
  type: String (enum: ['expense', 'settlement'], required),
  from: ObjectId (ref: 'User', required),
  to: ObjectId (ref: 'User', required),
  amount: Number (required, min: 0.01),
  group: ObjectId (ref: 'Group', optional), // Optional for individual transactions
  expense: ObjectId (ref: 'Expense', optional),
  description: String (max: 200),
  date: Date (default: Date.now),
  createdAt: Date (default: Date.now)
}

// Indexes
- from: 1
- to: 1
- group: 1
- expense: 1
- date: -1
- createdAt: -1
```

### 5. Friend Collection

```javascript
// Schema: Friend
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  friend: ObjectId (ref: 'User', required),
  status: String (enum: ['pending', 'accepted', 'blocked'], default: 'pending'),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}

// Indexes
- user: 1
- friend: 1
- status: 1
- createdAt: -1
```

### Database Relationships Diagram

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  User   │     │  Group  │     │ Expense │     │Transaction│   │  Friend │
│         │     │         │     │         │     │         │   │         │
│ _id     │◄────┤ creator │     │ group   │◄────┤ group   │   │ user    │
│ name    │     │ members │     │ paidBy  │     │ from    │   │ friend  │
│ email   │     │ _id     │     │ owedBy  │     │ to      │   │ status  │
│ password│     │ name    │     │ splitWith│    │ amount  │   │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘   └─────────┘
       ▲              ▲              ▲              ▲              ▲
       │              │              │              │              │
       └──────────────┼──────────────┼──────────────┼──────────────┘
                      │              │              │
                      └──────────────┼──────────────┘
                                     │
                                     └────────────────┘
```

### Expense Types Explanation

#### Group Expenses

- **Purpose**: Split expenses among multiple people in a group
- **Example**: Restaurant bill split among 5 friends
- **Fields**: `group` (required), `paidBy`, `splitWith` (array of users)
- **Balance**: Calculated per group

#### Individual Expenses

- **Purpose**: Direct debt between two people
- **Example**: You owe your friend 10,000 PKR for a loan
- **Fields**: `owedBy` (who owes), `paidBy` (who paid), `amount`
- **Balance**: Calculated per person relationship
- **Use Case**: Personal loans, direct payments, informal debts

---

## 🌐 API Endpoints

### Authentication Routes

```
POST   /api/auth/signup     - Register new user
POST   /api/auth/login      - Login user
GET    /api/auth/me         - Get current user
POST   /api/auth/logout     - Logout user
PUT    /api/auth/profile    - Update user profile
```

### Group Routes

```
GET    /api/groups          - Get user's groups
POST   /api/groups          - Create new group
GET    /api/groups/:id      - Get group details
PUT    /api/groups/:id      - Update group
DELETE /api/groups/:id      - Delete group
POST   /api/groups/:id/join - Join group
POST   /api/groups/:id/leave- Leave group
GET    /api/groups/:id/expenses - Get group expenses
GET    /api/groups/:id/balances - Get group balances
```

### Expense Routes

```
GET    /api/expenses        - Get user's expenses (both group and individual)
POST   /api/expenses        - Create new expense
GET    /api/expenses/:id    - Get expense details
PUT    /api/expenses/:id    - Update expense
DELETE /api/expenses/:id    - Delete expense
POST   /api/expenses/:id/settle - Settle expense
GET    /api/expenses/group/:groupId - Get group expenses
GET    /api/expenses/individual - Get individual expenses
GET    /api/expenses/with/:userId - Get expenses with specific user
```

### Transaction Routes

```
GET    /api/transactions    - Get user's transactions
GET    /api/transactions/group/:groupId - Get group transactions
GET    /api/transactions/user/:userId - Get user's transactions
GET    /api/transactions/individual - Get individual transactions
```

### Friend Routes

```
GET    /api/friends         - Get user's friends
POST   /api/friends         - Send friend request
PUT    /api/friends/:id     - Accept/reject friend request
DELETE /api/friends/:id     - Remove friend
GET    /api/friends/pending - Get pending friend requests
GET    /api/friends/search  - Search users to add as friends
```

### Balance Routes

```
GET    /api/balances        - Get user's overall balances
GET    /api/balances/group/:groupId - Get group balances
GET    /api/balances/with/:userId - Get balance with specific user
```

---

## 🎨 Frontend Architecture

### Component Hierarchy

```
App
├── Layout
│   ├── Sidebar
│   └── AppBar
├── Pages
│   ├── Dashboard
│   ├── Groups
│   ├── Expenses
│   ├── History
│   └── Profile
└── Components
    ├── Button
    ├── Card
    ├── InputField
    ├── Select
    ├── Avatar
    ├── Chip
    ├── Modal
    ├── Loading
    └── ...
```

### State Management Structure

```javascript
// Context Structure
{
  auth: {
    user: User | null,
    token: string | null,
    isAuthenticated: boolean,
    loading: boolean
  },
  groups: {
    list: Group[],
    currentGroup: Group | null,
    loading: boolean,
    error: string | null
  },
  expenses: {
    list: Expense[],
    currentExpense: Expense | null,
    loading: boolean,
    error: string | null
  },
  transactions: {
    list: Transaction[],
    loading: boolean,
    error: string | null
  },
  ui: {
    sidebarOpen: boolean,
    notifications: Notification[],
    modals: {
      createGroup: boolean,
      createExpense: boolean,
      settleExpense: boolean
    }
  }
}
```

---

## 📅 Development Phases

### Phase 1: Foundation (Week 1-2)

**Backend Setup**

- [ ] Complete authentication system
- [ ] Implement user CRUD operations
- [ ] Set up JWT middleware
- [ ] Create basic error handling
- [ ] Set up database models and validation

**Frontend Setup**

- [ ] Complete component library
- [ ] Implement authentication pages
- [ ] Set up routing and protected routes
- [ ] Create basic layout components
- [ ] Set up context providers

### Phase 2: Core Features (Week 3-4)

**Group Management**

- [ ] Backend: Group CRUD operations
- [ ] Frontend: Group creation/management UI
- [ ] Group member management
- [ ] Group invitation system
- [ ] Group settings and permissions

**Expense Management**

- [ ] Backend: Expense CRUD operations
- [ ] Frontend: Expense creation/editing
- [ ] Expense splitting logic
- [ ] Category management
- [ ] Expense validation

### Phase 3: Advanced Features (Week 5-6)

**Balance Tracking**

- [ ] Calculate balances per group
- [ ] Show who owes what to whom
- [ ] Balance visualization
- [ ] Balance history tracking

**Settlement System**

- [ ] Mark expenses as paid
- [ ] Settlement tracking
- [ ] Payment history
- [ ] Settlement notifications

### Phase 4: Polish & Testing (Week 7-8)

**UI/UX Improvements**

- [ ] Mobile responsiveness
- [ ] Loading states
- [ ] Error handling
- [ ] Notifications
- [ ] Animations and transitions

**Testing & Documentation**

- [ ] Unit tests
- [ ] Integration tests
- [ ] API documentation
- [ ] User documentation
- [ ] Deployment guide

---

## 🔄 Component Flow Diagrams

### 1. User Authentication Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Login     │───►│   Backend   │───►│  Database   │───►│   JWT       │
│   Form      │    │   Auth      │    │   Check     │    │   Token     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Store     │    │   Validate  │    │   User      │    │   Store     │
│   Token     │    │   Credentials│   │   Found     │    │   in        │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Redirect  │    │   Hash      │    │   Return    │    │   Local     │
│   to        │    │   Password  │    │   User      │    │   Storage   │
│   Dashboard │    │             │    │   Data      │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### 2. Group Creation Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Create    │───►│   Validate  │───►│   Save to   │───►│   Return    │
│   Group     │    │   Form      │    │   Database  │    │   Group     │
│   Form      │    │   Data      │    │             │    │   Data      │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Submit    │    │   Check     │    │   Create    │    │   Update    │
│   Form      │    │   Required  │    │   Group     │    │   UI        │
│             │    │   Fields    │    │   Document  │    │   State     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   API Call  │    │   Return    │    │   Add       │    │   Show      │
│   POST      │    │   Errors    │    │   Creator   │    │   as Admin  │
│   /groups   │    │   if any    │    │   as Admin  │    │   Message   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### 3. Expense Creation Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Add       │───►│   Select    │───►│   Enter     │───►│   Choose    │
│   Expense   │    │   Group     │    │   Amount    │    │   Split     │
│   Button    │    │             │    │   & Title   │    │   Method    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Open      │    │   Load      │    │   Validate  │    │   Calculate │
│   Form      │    │   Group     │    │   Input     │    │   Split     │
│   Modal     │    │   Members   │    │   Fields    │    │   Amounts   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Show      │    │   Display   │    │   Show      │    │   Preview   │
│   Form      │    │   Member    │    │   Real-time │    │   Final     │
│   Fields    │    │   List      │    │   Validation│    │   Split     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Submit    │    │   API Call  │    │   Save      │    │   Update    │
│   Form      │    │   POST      │    │   Expense   │    │   Balances  │
│             │    │   /expenses │    │   to DB     │    │   & UI      │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

---

## Individual Expenses (Splitwise-Style)

### How Individual Expenses Work

Individual expenses allow direct debt tracking between two people, similar to Splitwise's personal expenses feature.

#### Example Scenarios:

1. **Personal Loan**: You borrow 10,000 PKR from your friend
2. **Direct Payment**: You pay for your roommate's groceries
3. **Informal Debt**: Your colleague covers your lunch, you'll pay back later

#### Data Structure:

```javascript
// Individual Expense Example
{
  _id: ObjectId,
  title: "Personal Loan",
  amount: 10000,
  description: "Borrowed money for car repair",
  category: "other",
  expenseType: "individual",
  paidBy: ObjectId("friend_user_id"), // Who paid
  owedBy: ObjectId("current_user_id"), // Who owes
  splitWith: [{
    user: ObjectId("current_user_id"),
    amount: 10000,
    isPaid: false
  }],
  date: Date.now()
}
```

#### Balance Calculation:

- **Positive Balance**: You owe money to someone
- **Negative Balance**: Someone owes you money
- **Zero Balance**: All settled

#### UI Features:

- **Friends List**: Manage people you have expenses with
- **Individual Balances**: See net balance with each person
- **Quick Add**: Simple form for individual expenses
- **Settlement**: Mark individual debts as paid

### Friends Management

#### Friend Request Flow:

1. User searches for other users by email/name
2. Sends friend request
3. Recipient accepts/rejects request
4. Once accepted, can create individual expenses

#### Friend Status:

- **Pending**: Friend request sent but not accepted
- **Accepted**: Friends, can create individual expenses
- **Blocked**: User blocked, no interactions possible

## Database Flow & Data Storage Patterns

### 1. Group Creation Flow

#### When a group is created with 5 members:

**Database Operations:**

```javascript
// 1. Create Group Document
const group = {
  _id: ObjectId("group123"),
  name: "Trip to Islamabad",
  description: "Weekend trip with friends",
  creator: ObjectId("user1"), // Creator becomes admin
  members: [
    { user: ObjectId("user1"), role: "admin", joinedAt: Date.now() },
    { user: ObjectId("user2"), role: "member", joinedAt: Date.now() },
    { user: ObjectId("user3"), role: "member", joinedAt: Date.now() },
    { user: ObjectId("user4"), role: "member", joinedAt: Date.now() },
    { user: ObjectId("user5"), role: "member", joinedAt: Date.now() },
  ],
  totalExpenses: 0,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

// Store in: groups collection
```

**What Gets Stored:**

- ✅ **Group document** in `groups` collection
- ✅ **Member relationships** in the same document
- ✅ **No separate member documents** - everything in one place

### 2. Expense Creation Flow

#### When an expense is added to the group:

**Database Operations:**

```javascript
// 1. Create Expense Document
const expense = {
  _id: ObjectId("expense456"),
  title: "Hotel Bill",
  amount: 50000,
  description: "Hotel accommodation for 2 nights",
  category: "utilities",
  expenseType: "group",
  group: ObjectId("group123"),
  paidBy: ObjectId("user1"), // Who paid
  splitWith: [
    { user: ObjectId("user1"), amount: 10000, isPaid: true },
    { user: ObjectId("user2"), amount: 10000, isPaid: false },
    { user: ObjectId("user3"), amount: 10000, isPaid: false },
    { user: ObjectId("user4"), amount: 10000, isPaid: false },
    { user: ObjectId("user5"), amount: 10000, isPaid: false },
  ],
  date: Date.now(),
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

// 2. Create Transaction Records
const transactions = [
  {
    _id: ObjectId("trans1"),
    type: "expense",
    from: ObjectId("user2"),
    to: ObjectId("user1"),
    amount: 10000,
    group: ObjectId("group123"),
    expense: ObjectId("expense456"),
    description: "Hotel Bill - user2's share",
    date: Date.now(),
  },
  {
    _id: ObjectId("trans2"),
    type: "expense",
    from: ObjectId("user3"),
    to: ObjectId("user1"),
    amount: 10000,
    group: ObjectId("group123"),
    expense: ObjectId("expense456"),
    description: "Hotel Bill - user3's share",
    date: Date.now(),
  },
  // ... similar for user4 and user5
];

// 3. Update Group Total
// Update groups collection: totalExpenses += 50000
```

**What Gets Stored:**

- ✅ **Expense document** in `expenses` collection
- ✅ **Split details** within the expense document
- ✅ **Transaction records** in `transactions` collection (one per person who owes)
- ✅ **Group total** updated in `groups` collection

### 3. Individual Expense Flow

#### When creating a personal debt:

**Database Operations:**

```javascript
// 1. Create Individual Expense
const individualExpense = {
  _id: ObjectId("expense789"),
  title: "Personal Loan",
  amount: 10000,
  description: "Borrowed money for car repair",
  category: "other",
  expenseType: "individual",
  group: null, // No group for individual expenses
  paidBy: ObjectId("user2"), // Friend who lent money
  owedBy: ObjectId("user1"), // You who borrowed
  splitWith: [{ user: ObjectId("user1"), amount: 10000, isPaid: false }],
  date: Date.now(),
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

// 2. Create Transaction Record
const transaction = {
  _id: ObjectId("trans3"),
  type: "expense",
  from: ObjectId("user1"),
  to: ObjectId("user2"),
  amount: 10000,
  group: null, // No group
  expense: ObjectId("expense789"),
  description: "Personal Loan",
  date: Date.now(),
};
```

**What Gets Stored:**

- ✅ **Individual expense** in `expenses` collection
- ✅ **Single transaction** in `transactions` collection
- ✅ **No group updates** (individual expenses don't affect groups)

### 4. User Login & Dashboard Data Fetch

#### When user logs in, fetch dashboard data:

**Database Queries:**

```javascript
// 1. Get User's Groups
const userGroups = await Group.aggregate([
  {
    $match: { "members.user": ObjectId("user1") },
  },
  {
    $lookup: {
      from: "users",
      localField: "members.user",
      foreignField: "_id",
      as: "memberDetails",
    },
  },
  {
    $addFields: {
      memberCount: { $size: "$members" },
      userRole: {
        $arrayElemAt: [
          {
            $filter: {
              input: "$members",
              cond: { $eq: ["$$this.user", ObjectId("user1")] },
            },
          },
          0,
        ],
      },
    },
  },
]);

// 2. Get Recent Expenses (both group and individual)
const recentExpenses = await Expense.find({
  $or: [{ "splitWith.user": ObjectId("user1") }, { paidBy: ObjectId("user1") }],
})
  .populate("paidBy", "name")
  .populate("group", "name")
  .populate("splitWith.user", "name")
  .sort({ date: -1 })
  .limit(10);

// 3. Calculate Balances
const balances = await calculateUserBalances(ObjectId("user1"));

// 4. Get Friends List
const friends = await Friend.find({
  $or: [
    { user: ObjectId("user1"), status: "accepted" },
    { friend: ObjectId("user1"), status: "accepted" },
  ],
})
  .populate("user", "name email")
  .populate("friend", "name email");
```

**What Gets Fetched:**

- ✅ **User's groups** with member details and role
- ✅ **Recent expenses** (both group and individual)
- ✅ **Calculated balances** (per group and per person)
- ✅ **Friends list** for individual expenses

### 5. Balance Calculation Flow

#### How balances are calculated:

**Database Queries:**

```javascript
// Calculate Group Balances
const calculateGroupBalances = async (groupId) => {
  const expenses = await Expense.find({
    group: groupId,
    expenseType: "group",
  }).populate("paidBy", "name");

  const balances = {};

  expenses.forEach((expense) => {
    const paidBy = expense.paidBy._id.toString();
    const perPersonAmount = expense.amount / expense.splitWith.length;

    if (!balances[paidBy]) balances[paidBy] = 0;

    expense.splitWith.forEach((split) => {
      const userId = split.user.toString();
      if (!balances[userId]) balances[userId] = 0;

      if (userId !== paidBy) {
        balances[paidBy] += perPersonAmount;
        balances[userId] -= perPersonAmount;
      }
    });
  });

  return balances;
};

// Calculate Personal Balances
const calculatePersonalBalances = async (userId) => {
  const transactions = await Transaction.find({
    $or: [{ from: userId }, { to: userId }],
    group: null, // Only individual transactions
  })
    .populate("from", "name")
    .populate("to", "name");

  const balances = {};

  transactions.forEach((transaction) => {
    const otherUser = transaction.from._id.equals(userId)
      ? transaction.to._id.toString()
      : transaction.from._id.toString();

    if (!balances[otherUser]) balances[otherUser] = 0;

    if (transaction.from._id.equals(userId)) {
      balances[otherUser] -= transaction.amount; // You owe them
    } else {
      balances[otherUser] += transaction.amount; // They owe you
    }
  });

  return balances;
};
```

### 6. Settlement Flow

#### When someone settles an expense:

**Database Operations:**

```javascript
// 1. Update Expense Split
await Expense.updateOne(
  {
    _id: ObjectId("expense456"),
    "splitWith.user": ObjectId("user2"),
  },
  {
    $set: {
      "splitWith.$.isPaid": true,
      "splitWith.$.paidAt": Date.now(),
    },
  }
);

// 2. Create Settlement Transaction
const settlementTransaction = {
  _id: ObjectId("trans4"),
  type: "settlement",
  from: ObjectId("user2"),
  to: ObjectId("user1"),
  amount: 10000,
  group: ObjectId("group123"),
  expense: ObjectId("expense456"),
  description: "Settled Hotel Bill share",
  date: Date.now(),
};

// 3. Recalculate Balances
await recalculateGroupBalances(ObjectId("group123"));
```

**What Gets Updated:**

- ✅ **Expense split status** in `expenses` collection
- ✅ **New settlement transaction** in `transactions` collection
- ✅ **Recalculated balances** (real-time update)

## Data Flow Patterns

### 1. Dashboard Data Loading

```javascript
// Component: Dashboard
useEffect(() => {
  // 1. Load user's groups
  fetchGroups();

  // 2. Load recent expenses
  fetchRecentExpenses();

  // 3. Calculate balances
  calculateBalances();
}, []);

// Data flow:
// Dashboard → API → Database → Response → State → UI
```

### 2. Real-time Balance Calculation

```javascript
// When expense is added:
// 1. Save expense to database
// 2. Calculate new balances for all group members
// 3. Update group total
// 4. Create transaction records
// 5. Update UI with new balances

const calculateBalances = (expense) => {
  const { amount, paidBy, splitWith, group } = expense;

  // Calculate per-person amount
  const perPersonAmount = amount / splitWith.length;

  // Update balances
  splitWith.forEach((member) => {
    if (member.user !== paidBy) {
      // Member owes money
      updateBalance(member.user, paidBy, perPersonAmount);
    }
  });
};
```

### 3. Settlement Flow

```javascript
// When user settles an expense:
// 1. Mark split as paid
// 2. Update balances
// 3. Create settlement transaction
// 4. Update UI

const settleExpense = async (expenseId, userId) => {
  // 1. Update expense split
  await updateExpenseSplit(expenseId, userId, { isPaid: true });

  // 2. Create settlement transaction
  await createTransaction({
    type: "settlement",
    from: userId,
    to: expense.paidBy,
    amount: userSplit.amount,
    expense: expenseId,
  });

  // 3. Recalculate balances
  await recalculateBalances(expense.group);
};
```

---

## 🛠️ Implementation Guidelines

### Backend Implementation

#### 1. Authentication Middleware

```javascript
// middleware/auth.js
const auth = async (req, res, next) => {
  try {
    // Extract token from header
    // Verify JWT token
    // Find user in database
    // Attach user to request object
    // Call next()
  } catch (error) {
    // Return 401 error
  }
};
```

#### 2. Group Controller

```javascript
// controllers/groupController.js

// Create group
const createGroup = async (req, res) => {
  try {
    // Validate request body
    // Create group with creator as admin
    // Save to database
    // Populate member details
    // Return group data
  } catch (error) {
    // Return error response
  }
};

// Get user's groups
const getUserGroups = async (req, res) => {
  try {
    // Find groups where user is a member
    // Populate member details
    // Calculate group statistics
    // Return groups array
  } catch (error) {
    // Return error response
  }
};

// Join group
const joinGroup = async (req, res) => {
  try {
    // Find group by ID
    // Check if user is already a member
    // Add user to members array
    // Save group
    // Return success response
  } catch (error) {
    // Return error response
  }
};
```

#### 3. Expense Controller

```javascript
// controllers/expenseController.js

// Create expense
const createExpense = async (req, res) => {
  try {
    // Validate request body
    // Create expense with paidBy as current user
    // Save to database
    // Calculate and update balances
    // Create transaction records
    // Populate user details
    // Return expense data
  } catch (error) {
    // Return error response
  }
};

// Get group expenses
const getGroupExpenses = async (req, res) => {
  try {
    // Find expenses by group ID
    // Populate user details
    // Sort by date
    // Return expenses array
  } catch (error) {
    // Return error response
  }
};

// Settle expense
const settleExpense = async (req, res) => {
  try {
    // Find expense by ID
    // Update split status
    // Create settlement transaction
    // Recalculate balances
    // Return success response
  } catch (error) {
    // Return error response
  }
};
```

#### 4. Balance Calculation Service

```javascript
// services/balanceService.js

// Calculate group balances
const calculateGroupBalances = async (groupId) => {
  try {
    // Get all expenses for group
    // Calculate balances for each member
    // Return balance object
  } catch (error) {
    // Handle error
  }
};

// Update balances after expense
const updateBalancesAfterExpense = async (expense) => {
  try {
    // Calculate new balances
    // Update user balances
    // Create transaction records
  } catch (error) {
    // Handle error
  }
};
```

### Frontend Implementation

#### 1. API Service

```javascript
// services/api.js
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  // Get token from localStorage
  // Add to Authorization header
  // Return config
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 errors (logout)
    // Handle other errors
    // Return Promise.reject(error)
  }
);
```

#### 2. Context Provider

```javascript
// context/AuthContext.js
const AuthProvider = ({ children }) => {
  // State for user, token, loading
  // Login function
  // Logout function
  // Check auth status on mount
  // Return context provider
};
```

#### 3. Custom Hooks

```javascript
// hooks/useGroups.js
const useGroups = () => {
  // State for groups, loading, error
  // Fetch groups function
  // Create group function
  // Join group function
  // Leave group function
  // Return functions and state
};

// hooks/useExpenses.js
const useExpenses = () => {
  // State for expenses, loading, error
  // Fetch expenses function
  // Create expense function
  // Update expense function
  // Delete expense function
  // Settle expense function
  // Return functions and state
};
```

### Database Queries

#### 1. Get User's Groups with Member Count

```javascript
// models/Group.js
const getUserGroups = async (userId) => {
  // Aggregate pipeline:
  // 1. Match groups where user is a member
  // 2. Lookup user details
  // 3. Add member count field
  // 4. Sort by creation date
};
```

#### 2. Calculate Group Balances

```javascript
// services/balanceService.js
const calculateGroupBalances = async (groupId) => {
  // Get all expenses for group
  // Calculate balances for each member
  // Return balance object with user details
};
```

#### 3. Get Recent Transactions

```javascript
// models/Transaction.js
const getRecentTransactions = async (userId, limit = 10) => {
  // Find transactions where user is involved
  // Populate user and group details
  // Sort by date
  // Limit results
};
```

---

## 🧪 Testing Strategy

### Unit Tests

- Component rendering tests
- API service tests
- Utility function tests
- Database query tests
- Middleware tests

### Integration Tests

- Authentication flow
- Group creation flow
- Expense creation flow
- Balance calculation
- Settlement process

### E2E Tests

- Complete user journeys
- Cross-browser testing
- Mobile responsiveness
- Error scenarios

### Test Structure

```
tests/
├── unit/
│   ├── components/
│   ├── services/
│   └── utils/
├── integration/
│   ├── auth/
│   ├── groups/
│   └── expenses/
└── e2e/
    ├── user-flows/
    └── error-scenarios/
```

---

## 📚 Additional Resources

### Development Tools

- **Postman/Insomnia**: API testing
- **MongoDB Compass**: Database management
- **React Developer Tools**: Frontend debugging
- **Redux DevTools**: State management debugging

### Documentation

- **API Documentation**: Swagger/OpenAPI
- **Component Documentation**: Storybook
- **Database Documentation**: ERD diagrams
- **Deployment Guide**: Step-by-step instructions

### Code Quality

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **Jest**: Testing framework

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (v5+)
- Git

### Setup Instructions

1. Clone the repository
2. Install dependencies (frontend & backend)
3. Set up environment variables
4. Start MongoDB
5. Run development servers

### Environment Variables

```bash
# Backend (.env)
PORT=5001
MONGODB_URI=mongodb://localhost:27017/splitmate
JWT_SECRET=your_jwt_secret
NODE_ENV=development

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5001/api
```

### Development Commands

```bash
# Install all dependencies
npm run install-all

# Start development servers
npm run dev

# Start only backend
npm run server

# Start only frontend
npm run client

# Database management
npm run db:start
npm run db:stop
npm run db:status
```

---

## 📝 Notes for Developers

### Code Standards

- Use consistent naming conventions
- Write meaningful comments
- Follow DRY principles
- Handle errors gracefully
- Validate input data

### Performance Considerations

- Implement pagination for large datasets
- Use database indexes
- Optimize database queries
- Implement caching where appropriate
- Lazy load components

### Security Best Practices

- Validate all inputs
- Sanitize data
- Use HTTPS in production
- Implement rate limiting
- Secure JWT tokens
- Hash passwords

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificates installed
- [ ] Error monitoring set up
- [ ] Performance monitoring configured
- [ ] Backup strategy implemented

---

This comprehensive guide provides the foundation for developing the SplitMate application. Follow the phases, implement the schemas, and use the provided patterns to build a robust and scalable expense tracking application! 🚀
