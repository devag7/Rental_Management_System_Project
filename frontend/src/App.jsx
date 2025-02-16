import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PropertyList from './components/PropertyList';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
      <div className="min-h-screen bg-gray-100">
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
  );
}

export default App;