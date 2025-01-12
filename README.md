# GPU Marketplace Application

A full-stack web application for buying and selling GPUs (Graphics Processing Units). Users can list their GPUs for sale, browse available GPUs, and manage their listings.

## Features

### User Authentication

- User registration and login
- JWT-based authentication
- Secure password hashing using bcrypt
- Protected routes for authenticated users

### GPU Management

- Create, read, update, and delete GPU listings
- Search and filter GPUs by various criteria
- Upload GPU images
- Price history tracking
- Detailed GPU specifications display

### User Dashboard

- Manage personal GPU listings
- View saved/favorite GPUs
- Transaction history
- Profile management

## Tech Stack

### Frontend

- React with Vite
- TypeScript for type safety
- Tailwind CSS for styling
- Axios for API requests
- Lucide React for icons
- React Router for navigation

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- CORS enabled
- Environment variables support

## Running the Application

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the backend directory:

   ```env
   PORT=5004
   MONGODB_URI=mongodb+srv://arpita_bm:arpitabm@cluster0.fv42x.mongodb.net/GPUManagement
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=your_jwt_secret_here
   ```

4. **Start the Server**

   ```bash
   # Development mode with auto-reload
   npm run dev

   # OR Production mode
   npm start
   ```

   The backend server will run on http://localhost:5004

5. **Verify Backend**
   - Check health endpoint: http://localhost:5004/health
   - Should return: `{ "status": "ok" }`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:5173

## Development Workflow

1. **Running Both Services**

   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

2. **Making Changes**
   - Frontend changes will hot-reload automatically
   - Backend changes will auto-reload with nodemon
   - TypeScript will check types in real-time
   - ESLint will check code quality

## Common Development Commands

### Backend Commands

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test          # Run tests
npm run lint      # Run ESLint
```

### Frontend Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Troubleshooting

### Backend Issues

1. **MongoDB Connection Errors**

   - Check MongoDB URI in .env
   - Verify network connectivity
   - Ensure MongoDB service is running

2. **Port Already in Use**
   ```bash
   # Check what's using port 5004
   lsof -i :5004
   # Kill the process
   kill -9 <PID>
   ```

### Frontend Issues

1. **TypeScript Errors**

   - Run `npm run type-check` to verify types
   - Check `tsconfig.json` configuration
   - Verify import paths

2. **API Connection Issues**
   - Verify backend is running
   - Check CORS configuration
   - Confirm API URL in frontend .env

## Project Structure
