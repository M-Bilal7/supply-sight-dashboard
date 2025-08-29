# SupplySight Dashboard

A take-home frontend challenge project that implements a **Daily Inventory Dashboard** for a supply chain platform called **SupplySight**.  

The project demonstrates how to build a React + Tailwind application, connect it to a mock GraphQL API, and implement business logic for inventory tracking with filtering, KPIs, and product interactions.

---

## Features

- **Dashboard Layout**
  - Top bar with `SupplySight` logo and date range chips (`7d / 14d / 30d`).
  - KPI Cards:
    - **Total Stock** (sum of all stock).
    - **Total Demand** (sum of all demand).
    - **Fill Rate** = `(sum(min(stock, demand)) / sum(demand)) * 100%`.
  - Line Chart showing **Stock vs Demand trend** (from `kpis(range)` query).
  - Filters Row:
    - Search box (by name, SKU, or ID).
    - Warehouse dropdown (from warehouses query).
    - Status dropdown (`All / Healthy / Low / Critical`).

- **Products Table**
  - Columns: Product, SKU, Warehouse, Stock, Demand, Status.
  - Status rules:
    - **Healthy** = stock > demand (green pill).
    - **Low** = stock = demand (yellow pill).
    - **Critical** = stock < demand (red pill, row tinted).
  - Pagination (10 rows per page).

- **Product Drawer**
  - Opens on row click.
  - Displays product details.
  - **Update Demand** form (GraphQL mutation).
  - **Transfer Stock** form (GraphQL mutation).

- **GraphQL API (Mock)**
  - Built using Apollo Server.
  - Provides queries for products, warehouses, KPIs.
  - Supports mutations for updating demand and transferring stock.

---

## Tech Stack

- **Frontend**
  - React
  - Tailwind CSS
  - Apollo Client
  - Recharts (for chart visualization)

- **Backend (Mock API)**
  - Node.js
  - Apollo Server (GraphQL)

---

## Project Structure

supply-sight-dashboard/

├── src/

│ ├── components/ # KPI Cards, Products Table, Drawer, etc.

│ ├── graphql/ # Queries & Mutations

│ ├── pages/ # ProductsPage (main dashboard)

│ ├── utils/ # Utility functions (computeTotals, etc.)

│ └── index.js # React entry point

├── mock-server/ # Apollo GraphQL server

└── README.md # Project documentation


---

## Setup & Installation

### 1. Clone the Repository
bash
git clone https://github.com/<your-username>/supply-sight-dashboard.git
cd supply-sight-dashboard

### 2. Install Dependencies
bash
npm install

### 3. Start the Mock GraphQL Server
bash
cd mock-server
node index.js

Server will start at:
http://localhost:4000/

### 4. Start the Frontend
In another terminal:
bash
cd ..
npm start

Frontend will run at:
http://localhost:3000/
