# Ecommerce Frontend System

A modern Ecommerce Frontend built using React that provides a complete shopping experience including product browsing, authentication, cart management, checkout, payments, order tracking, and user profile management.

This project was designed with a strong focus on user experience, reusable component architecture, responsive design, secure authentication handling, and seamless integration with a Spring Boot backend.

---

# Live Application

https://ecommerce-frontend-rosy-pi.vercel.app/

---

# Backend API

https://ecommerce-backend-jojn.onrender.com

---

# Features

## Authentication

- User Registration
- User Login
- Auto Login After Registration
- JWT Authentication
- Refresh Token Handling
- Protected Routes
- Automatic Logout
- Session Persistence

---

## Product Management

- Product Listing
- Product Details Page
- Product Search
- Category Filtering
- Product Sorting
- Pagination Support
- Dynamic Product Images

---

## Shopping Cart

- Add Products to Cart
- Update Product Quantity
- Remove Products from Cart
- Real-Time Cart Updates
- Cart Total Calculation
- Navbar Cart Count Updates

---

## Checkout & Payments

- Checkout Flow
- Shipping Information
- Order Creation
- Razorpay Payment Integration
- Payment Verification
- Successful Order Placement

---

## Order Management

- View Order History
- Order Details
- Order Tracking
- User-Specific Orders

---

## User Profile

- View Profile
- Edit Profile Information
- Upload Profile Image
- Delete Profile Image
- Profile Validation
- Cloudinary Image Support

---

## User Interface

- Responsive Design
- Modern Layout
- Reusable Components
- Loading States
- Error Handling
- Form Validation
- Authentication-Aware Navigation

---

# Tech Stack

## Frontend

- React
- React Router DOM
- Axios
- Context API
- JavaScript (ES6+)

## Authentication

- JWT Authentication
- Refresh Token Strategy

## Payment Gateway

- Razorpay

## Styling

- CSS3
- Flexbox
- Responsive Design

## Deployment

- Vercel

---

# Project Structure

```text
src
│
├── components
├── pages
├── services
├── context
├── routes
├── utils
├── assets
└── styles
```

---

# Application Pages

## Public Pages

- Login
- Register
- Product Listing
- Product Details

## Protected Pages

- Cart
- Checkout
- Orders
- Profile

---

# Authentication Flow

```text
User Login
     ↓
Access Token Issued
     ↓
Protected Route Access
     ↓
Access Token Expires
     ↓
Refresh Token Request
     ↓
New Access Token Issued
```

---

# Running the Project Locally

## Clone Repository

```bash
git clone https://github.com/naveendp2805/ecommerce-frontend.git
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## Start Development Server

```bash
npm run dev
```

Application runs on:

```text
http://localhost:5173
```

---

# Build for Production

```bash
npm run build
```

---

# Preview Production Build

```bash
npm run preview
```

---

# Deployment

The frontend application is deployed using:

- Vercel
- Render Backend API
- Cloudinary Image Delivery
- Razorpay Payment Gateway

---

# Future Improvements

- Toast Notifications
- Skeleton Loaders
- Dark Mode
- Wishlist Functionality
- Product Reviews & Ratings
- Advanced Filtering
- Admin Dashboard
- Progressive Web App (PWA)

---

# Learning Outcomes

This project helped strengthen understanding of:

- React Fundamentals
- React Router
- Context API
- API Integration using Axios
- Authentication Flows
- Protected Routes
- State Management
- Component Reusability
- Responsive UI Design
- Razorpay Integration
- Frontend Deployment
- Frontend-Backend Integration

---

# Author

## Naveen Durga Prasad

Frontend & Backend Developer interested in:

- Java Backend Engineering
- React Development
- Spring Ecosystem
- System Design
- Cloud Technologies
- Scalable Web Applications

---

If you found this project useful, feel free to star the repository.
