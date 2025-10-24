import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* Homepage Link */}
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              My Blog
            </Link>
          </div>
        </header>

        {/* Routes */}
        <main className="flex-grow py-10">
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/post/:slug" element={<BlogDetail />} />
          </Routes>
        </main>

        
      </div>
    </Router>
  );
}
