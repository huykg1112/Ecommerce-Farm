# Agricultural E-Commerce Platform

An e-commerce platform tailored for agriculture, connecting buyers and sellers of farming products with a modern, farmer-friendly interface.

## Description

This project is an e-commerce platform focused on agricultural products, built with **Next.js (TypeScript)**, **shadcn/ui**, **Tailwind CSS**, and **Redux**. It features a responsive design with advanced search (image, text, filters), product listings, shopping cart, and seller dashboards. Optimized for scalability (50,000+ concurrent users), it uses static JSON data initially and is designed to integrate with a REST API.

## Features

- **User Roles**: Buyers, Sellers (agricultural dealers), and Admin (planned).
- **Core Pages**: Home, Product Listings, Seller Shops, Product Details (with chat), Cart, Favorites, Order Tracking, User Profile, Messaging.
- **Seller Tools**: Inventory management, pricing, discounts, and sales analytics.
- **Search**: Image-based, text-based, and advanced filters.
- **Design**: Modern UI with earthy tones (#accc8b, #90c577, #74a65d, #599146, #44703d) and Inter font, inspired by farming aesthetics.

## Tech Stack

- **Frontend**: Next.js (TypeScript/TSX), shadcn/ui, Tailwind CSS, SCSS.
- **State Management**: Redux, React Hooks (useRef, useContext, useEffect, useMemo, useCallback).
- **Data**: Static JSON files (initial), REST API (future).
- **Optimization**: SSR, SSG, ISR, lazy loading, code splitting for high performance.

## Getting Started

### Prerequisites
- Node.js (>= 14.x)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/huykg1112/Ecommerce-Farm.git

2. Install dependencies:
   ```bash
   npm install
   
3. Run the development server:
   ```bash
   npm run dev
4. Open http://localhost:3000 in your browser.
