import React, { useState, useEffect } from 'react';
import { CircuitBoard, User, LogOut } from 'lucide-react';
import Login from './components/Login';
import Register from './components/Register';
import GpuList from './components/GpuList';
import AddGpu from './components/AddGpu';
import axios from 'axios';
import { Gpu } from './types';

interface User {
  email: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [gpus, setGpus] = useState<Gpu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // TODO: Fetch user data
    }
    fetchGpus();
  }, []);

  const fetchGpus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5004/api/gpus', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGpus(response.data);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch GPUs');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <CircuitBoard className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">GPU Marketplace</span>
            </div>
            <div className="flex items-center">
              {isLoggedIn ? (
                <>
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="ml-2 text-gray-800">{user?.email}</span>
                  <button
                    onClick={handleLogout}
                    className="ml-4 flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="ml-1">Logout</span>
                  </button>
                </>
              ) : (
                <div className="space-x-4">
                  <button
                    onClick={() => setShowLogin(true)}
                    className={`px-4 py-2 rounded ${
                      showLogin ? 'bg-indigo-600 text-white' : 'text-gray-600'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowLogin(false)}
                    className={`px-4 py-2 rounded ${
                      !showLogin ? 'bg-indigo-600 text-white' : 'text-gray-600'
                    }`}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto">
            {showLogin ? (
              <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
            ) : (
              <Register setShowLogin={setShowLogin} />
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <AddGpu onAddGpu={fetchGpus} />
            <GpuList gpus={gpus} loading={loading} error={error} fetchGpus={fetchGpus} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;