import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import { LearningPath } from './components/LearningPath';
import { Dashboard } from './pages/Dashboard';

function App() {
  const mockStudentId = '123e4567-e89b-12d3-a456-426614174000';

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
                  Home
                </Link>
                <Link 
                  to="/dashboard" 
                  className="flex items-center ml-4 px-2 py-2 text-gray-700 hover:text-gray-900"
                >
                  <BarChart3 className="h-5 w-5 mr-1" />
                  Analytics
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LearningPath studentId={mockStudentId} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
