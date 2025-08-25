import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Property from '../pages/Property';
import PropertyDetailsPage from '../pages/PropertyDetailsPage';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Messages from '../pages/Messages';
import ProtectedRoute from '../components/';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/property" element={<ProtectedRoute><Property /></ProtectedRoute>} />
        <Route path="/property/:id" element={<ProtectedRoute><PropertyDetailsPage /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
