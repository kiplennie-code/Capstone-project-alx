Supermarket Yangu — Point of Sale (POS) System

A modern, scalable Point of Sale (POS) system tailored for Kenyan supermarkets 🇰🇪

Supermarket Yangu is a web-based Point of Sale (POS) application designed to meet the operational needs of small to medium-sized supermarkets in Kenya. The system provides a streamlined interface for processing sales, managing inventory, and analyzing business performance, with full localization for Kenyan Shillings (KES) and VAT standards.

The application is built using modern frontend technologies to ensure speed, reliability, and ease of use across desktop and mobile devices.

🎯 Key Objectives

Simplify checkout and sales processing

Provide real-time inventory visibility

Enable accurate VAT and revenue tracking

Offer actionable business insights through analytics

Support offline-first workflows using local storage

✨ Features
🛍️ Point of Sale (POS)

Fast and intuitive checkout workflow

Real-time product search and filtering

Quantity control with stock validation

Automatic VAT calculation (16% – Kenya standard)

Transaction recording with receipt-ready summaries

📦 Inventory Management

Centralized product catalog

Live stock level monitoring

Low-stock and out-of-stock indicators

Category-based product organization

Visual, color-coded stock status alerts

📊 Sales & Analytics

Complete sales transaction history

Revenue tracking in Kenyan Shillings (KES)

Summary metrics (items sold, average sale value)

Time-based sales filtering

Business performance overview dashboard

🎨 User Experience

Clean and professional UI

Fully responsive design (desktop, tablet, mobile)

Consistent loading states and error handling


🛠️ Tech Stack
Frontend

React 18.3.1 – Component-based UI library

React Router 6.30.2 – Client-side routing

Vite 7.2.7 – Fast development and build tool

Tailwind CSS 3.4.1 – Utility-first styling

Lucide React – Icon library

Data & API

Axios 1.13.2 – HTTP client

FakeStore API – Sample product data

LocalStorage – Client-side persistence

Project Structure Analysis

src/
├── components/
│   ├── Footer.jsx          [Missing - referenced but not provided]
│   ├── Loader.jsx          ✓ Simple loading spinner
│   ├── Navbar.jsx          ✓ Navigation with cart counter
│   └── ProductCard.jsx     ✓ Product display component
├── pages/
│   ├── Home.jsx            ✓ Landing page with features
│   ├── POS.jsx             ✓ Main checkout interface
│   ├── Products.jsx        ✓ Inventory table view
│   ├── Sales.jsx           ✓ Sales history display
│   └── Reports.jsx         ✓ Analytics dashboard
├── services/
│   └── fakeStoreApi.js     ✓ API integration layer
└── App.jsx                 ✓ Main application component

📖 Usage Guide
1. Point of Sale (POS)
Navigate to POS: Click "POS" in the navigation menu
Add Products to Cart:

Browse products or use the search bar
Click on a product to add it to the cart
Adjust quantity using +/- buttons
Review cart summary on the right side

Complete Sale:

Verify cart items and total
Click "Complete Sale"
Inventory is automatically updated
Receipt details are saved

2. Inventory Management
View Products: Navigate to "Products" page
Check Stock Levels:

🟢 Green: In Stock (20+)
🟡 Yellow: Good (11-20)
🟠 Orange: Low Stock (1-10)
🔴 Red: Out of Stock (0)

3. Sales History
View Sales: Navigate to "Sales" page

See all completed transactions
View itemized receipts
Check transaction dates and times

4. Reports & Analytics
Access Reports: Navigate to "Reports" page
Available Metrics:

Total Sales Count
Total Revenue (KSh)
Items Sold
Average Sale Value
Low Stock Alerts
Out of Stock Items

