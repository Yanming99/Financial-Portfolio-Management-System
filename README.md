# Financial-Portfolio-Management-System
# 💼 Financial Portfolio Management System

A full-stack web application for managing personal financial assets, visualizing portfolio performance, and tracking transactions.

## 🚀 Features

- 🔐 **User Authentication** (Registration & Login)
- 📈 **Asset Dashboard** with:
  - Pie Chart for asset distribution
  - Bar Chart for asset values
  - Responsive layout using Tailwind CSS
- 💰 **Add / Edit / Delete Assets**
- 🧮 **Simulated Returns Calculator**
- 📋 **Transaction History Viewer**
- 📊 Interactive charts built with Chart.js

## 🛠️ Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
- [Axios](https://axios-http.com/)

### Backend
- [Spring Boot](https://spring.io/projects/spring-boot)
- RESTful API
- Spring Security
- MySQL or H2 Database

## 📦 Project Structure

```text
portfolio/
├── backend/           # Spring Boot backend
├── frontend/          # Vite + React frontend
│   ├── src/
│   └── public/
├── README.md
└── ...


## ⚙️ Getting Started

### Prerequisites
- Node.js + npm
- Java 17+
- MySQL or use H2 (for testing)

### Setup
```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
./mvnw spring-boot:run
