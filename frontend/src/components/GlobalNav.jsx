import React from 'react';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';
import { LogOut, Bell } from 'lucide-react';
import { mockDetections } from '../lib/mockData';

const GlobalNav = () => {
  const { currentUser, logout } = useAuth();

  // Simulate new notifications: count tasks assigned to the user that are still 'Verified'
  const newNotificationCount = mockDetections.filter(
    (d) => d.assignee === currentUser?.name && d.status === 'Verified'
  ).length;

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Sentinel Track</h1>
          
          {currentUser && (
            <div className="flex items-center space-x-4">
              {/* Notification Bell for Staff */}
              {currentUser.role === 'Staff' && (
                <div className="relative">
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                  {newNotificationCount > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                  )}
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-gray-700">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.role}</p>
              </div>
              <Button onClick={logout} variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default GlobalNav;