# Vehicle Rental System - Server

🚀 **Live URL:** [https://vehicles-server-five.vercel.app](https://vehicles-server-five.vercel.app)

A comprehensive backend server application for managing vehicle rental operations. Built with TypeScript and Express.js, this RESTful API provides secure authentication, vehicle management, booking operations, and automated rental status updates.

---

## ✨ Features

- **JWT Authentication & Authorization** - Secure token-based authentication with role-based access control (Admin & Customer)
- **Vehicle Management** - Complete CRUD operations for vehicles with real-time availability tracking
- **Booking System** - Automated booking management with dynamic price calculation based on rental duration
- **Role-Based Permissions** - Separate access levels for administrators and customers
- **Automated Status Updates** - Daily cron job automatically updates expired bookings and vehicle availability
- **Business Logic Protection** - Prevents deletion of booked vehicles and users with active rentals
- **Password Security** - Bcrypt hashing with salt rounds for secure password storage
- **Input Validation** - Comprehensive validation for all API endpoints
- **Database Automation** - Auto-initialization of PostgreSQL tables on server startup

---

## 🛠️ Technology Stack

### Core Technologies
- **Node.js** - JavaScript runtime environment
- **TypeScript** - Type-safe programming language
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database management system
- **Vercel** - Serverless deployment platform

### Dependencies
- **pg** - PostgreSQL client for Node.js with connection pooling
- **jsonwebtoken** - JWT token generation and verification
- **bcryptjs** - Password hashing and comparison
- **node-cron** - Task scheduling for automated operations
- **dotenv** - Environment variable management

---

## 📋 Setup & Usage Instructions

### Prerequisites

Ensure you have the following installed on your system:
- Node.js (v14.x or higher)
- npm or yarn package manager
- PostgreSQL (v12 or higher)
- Git

### Installation Steps

**1. Clone the Repository**
```bash
git clone https://github.com/mrashed21/vehicles-server.git
cd vehicles-server
```

**2. Install Dependencies**
```bash
npm install
```

**3. Environment Configuration**

Create a `.env` file in the root directory:
```env
CONNECTION_STR=postgresql://username:password@localhost:5432/vehicle_rental
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
```

Replace with your actual PostgreSQL credentials and a strong JWT secret.

**4. Start PostgreSQL**

Ensure your PostgreSQL server is running:
```bash
# macOS (Homebrew)
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows - Start from Services
```

**5. Build the Project**
```bash
npm run build
```

**6. Run the Server**

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start at `http://localhost:5000`

### Usage

#### API Base URL
```
Local: http://localhost:5000/api/v1
Production: https://vehicles-server-five.vercel.app/api/v1
```

#### Authentication

**Signup (Create User)**
```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "role": "customer"
}
```

**Login**
```http
POST /api/v1/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Returns a JWT token for authenticated requests.

#### Vehicles

**Create Vehicle (Admin Only)**
```http
POST /api/v1/vehicles
Authorization: Bearer {token}
Content-Type: application/json

{
  "vehicle_name": "Toyota Camry",
  "type": "car",
  "registration_number": "ABC-1234",
  "daily_rent_price": 50,
  "availability_status": "available"
}
```

**Get All Vehicles**
```http
GET /api/v1/vehicles
```

**Get Single Vehicle**
```http
GET /api/v1/vehicles/{vehicleId}
```

**Update Vehicle (Admin Only)**
```http
PUT /api/v1/vehicles/{vehicleId}
Authorization: Bearer {token}
```

**Delete Vehicle (Admin Only)**
```http
DELETE /api/v1/vehicles/{vehicleId}
Authorization: Bearer {token}
```

#### Bookings

**Create Booking**
```http
POST /api/v1/bookings
Authorization: Bearer {token}
Content-Type: application/json

{
  "customer_id": 1,
  "vehicle_id": 2,
  "rent_start_date": "2024-12-15",
  "rent_end_date": "2024-12-20"
}
```

**Get Bookings**
```http
GET /api/v1/bookings
Authorization: Bearer {token}
```
Admin sees all bookings; customers see only their own.

**Update Booking Status**
```http
PUT /api/v1/bookings/{bookingId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "cancelled"
}
```

#### User Management

**Get All Users (Admin Only)**
```http
GET /api/v1/users
Authorization: Bearer {token}
```

**Update User**
```http
PUT /api/v1/users/{userId}
Authorization: Bearer {token}
```

**Delete User (Admin Only)**
```http
DELETE /api/v1/users/{userId}
Authorization: Bearer {token}
```

### Deployment

**Deploy to Vercel:**

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Configure environment variables in Vercel dashboard:
   - `CONNECTION_STR`
   - `JWT_SECRET`
   - `PORT`

### Automated Tasks

The server runs a daily cron job at midnight that automatically:
- Updates expired bookings from "active" to "returned"
- Releases vehicles back to "available" status

This ensures accurate availability without manual intervention.

---

## 📁 Project Structure

```
vehicles-server/
├── src/
│   ├── config/              # Configuration files
│   ├── database/            # Database connection & initialization
│   ├── middleware/          # Authentication middleware
│   ├── modules/
│   │   ├── auth/           # Authentication logic
│   │   ├── bookings/       # Booking operations
│   │   ├── user/           # User management
│   │   └── vehicle/        # Vehicle operations
│   ├── router/             # Route aggregator
│   └── index.ts            # Application entry point
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 👤 Author

**Mohammed Rashed**
- GitHub: [@mrashed21](https://github.com/mrashed21)

---

## 📝 License

This project is available for use under the terms specified in the repository.

---

**Built with TypeScript, Express.js, and PostgreSQL**