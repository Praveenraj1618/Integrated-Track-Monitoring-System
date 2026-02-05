import React from 'react';
import { Settings, Bell } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side - Title */}
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">
              RailTrack Monitor
            </h1>
            <p className="text-sm text-gray-500">Railway Infrastructure Monitoring</p>
          </div>
        </div>

        {/* Right side - Navigation buttons */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Alerts</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;