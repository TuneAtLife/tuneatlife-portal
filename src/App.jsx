import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl mr-3">🎯</span>
              <h1 className="text-2xl font-bold text-gray-900">TuneAtLife</h1>
              <span className="ml-3 text-sm text-gray-500 bg-purple-100 px-2 py-1 rounded">Portal</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">Dashboard</a>
              <a href="#assessments" className="text-gray-600 hover:text-purple-600 transition-colors">Assessments</a>
              <a href="#progress" className="text-gray-600 hover:text-purple-600 transition-colors">Progress</a>
              <a href="#settings" className="text-gray-600 hover:text-purple-600 transition-colors">Settings</a>
            </nav>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                Profile
              </Button>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-4">Welcome to Your Wellness Journey</h2>
          <p className="text-purple-100 text-lg mb-6">
            Track your progress, access personalized insights, and connect with your AI wellness experts.
          </p>
          <Button className="bg-white text-purple-600 hover:bg-gray-100">
            View Dashboard
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: '📊', title: 'View Progress', desc: 'Check your wellness metrics' },
            { icon: '📝', title: 'Take Assessment', desc: 'Update your wellness profile' },
            { icon: '💬', title: 'Chat with AI', desc: 'Get personalized guidance' },
            { icon: '⚙️', title: 'Settings', desc: 'Manage your preferences' },
          ].map((action, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl mb-3">{action.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-gray-600 text-sm">{action.desc}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { type: 'Assessment', desc: 'Completed Fitness Assessment', time: '2 hours ago' },
              { type: 'Chat', desc: 'Spoke with Nutrition Expert', time: '1 day ago' },
              { type: 'Progress', desc: 'Updated sleep tracking data', time: '2 days ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mr-3">
                    {activity.type}
                  </span>
                  <span className="text-gray-900">{activity.desc}</span>
                </div>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer with Legal Links */}
      <Footer />
    </div>
  );
}

export default App;
