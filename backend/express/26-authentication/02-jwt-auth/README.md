# JWT Authentication API

A production-style REST API implementing **JWT-based authentication**, **refresh token rotation**, **session management**, **email verification**, and **password reset using OTP**.

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Nodemailer
* Gmail OAuth2
* express-validator

## Features

* User registration & login
* JWT access tokens
* Refresh tokens with rotation
* HttpOnly refresh-token cookies
* Server-side session management
* Multiple active sessions
* Logout from current session
* Logout from all sessions
* Email verification using OTP
* Resend verification OTP
* Forgot password using OTP
* Password reset
* Password reset session invalidation
* Request validation
* Centralized error handling

## Authentication Flow

```text
Register
   ↓
Email Verification OTP
   ↓
Verify Email
   ↓
Access Token + Refresh Token
   ↓
Authenticated Requests
   ↓
Refresh Access Token
```

### Password Reset

```text
Forgot Password
   ↓
Password Reset OTP
   ↓
Verify OTP
   ↓
Set New Password
   ↓
All Existing Sessions Revoked
```

## Project Structure

```text
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── validators/
├── app.js
└── server.js
```

## Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
GOOGLE_USER=your_gmail_address
```

Never commit `.env` or expose secrets publicly.

## Installation

```bash
git clone <repository-url>
cd jwt-auth-project
npm install
```

Create `.env`, configure the required variables, then run:

```bash
npm run dev
```

For production:

```bash
npm start
```

## API Routes

### Authentication

| Method | Endpoint                            | Description                |
| ------ | ----------------------------------- | -------------------------- |
| POST   | `/api/auth/register`                | Register user              |
| POST   | `/api/auth/verify-email`            | Verify email OTP           |
| POST   | `/api/auth/resend-verification-otp` | Resend verification OTP    |
| POST   | `/api/auth/login`                   | Login                      |
| POST   | `/api/auth/refresh`                 | Refresh access token       |
| GET    | `/api/auth/me`                      | Get authenticated user     |
| POST   | `/api/auth/logout`                  | Logout current session     |
| POST   | `/api/auth/logout-all`              | Logout all sessions        |
| GET    | `/api/auth/sessions`                | Get active sessions        |
| POST   | `/api/auth/forgot-password`         | Request password reset OTP |
| POST   | `/api/auth/reset-password`          | Reset password             |

## Security

* Passwords are hashed using bcrypt.
* OTPs are stored as bcrypt hashes.
* Access and refresh tokens use separate secrets.
* Refresh tokens are stored in HttpOnly cookies.
* Refresh tokens are rotated on refresh.
* OTPs expire after a limited time.
* OTP verification attempts are limited.
* Resend requests have a cooldown.
* Password reset revokes existing sessions.
* Sensitive credentials are stored in environment variables.


