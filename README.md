# TripNest Frontend

The frontend of **TripNest**, a travel planning SaaS platform that allows users to explore destinations, create and manage trip itineraries, and personalize their travel experience.

## 🚀 Features

- User Authentication (Login/Register)
- Responsive UI with Tailwind CSS
- Reusable components (Header, Footer, Layouts)
- State management using React hooks/context
- Protected routes for authenticated users

## 🛠 Tech Stack

- **Next.js**
- **React.js**
- **Tailwind CSS** (Styling)
- **Fetch** (API calls)
- **App Router** (Routing)

## 📂 Folder Structure

```
tripnest_frontend/
│── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages
│   ├── layouts/        # Layout components
│   ├── context/        # Global state management
│   ├── utils/          # Helper functions
│   └── App.jsx         # Root component
│── public/
│── package.json
```

## ⚙️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/rajansharma001/tripnest_frontend.git
   cd tripnest_frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your API base URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Run the app:
   ```bash
   npm run dev
   ```
