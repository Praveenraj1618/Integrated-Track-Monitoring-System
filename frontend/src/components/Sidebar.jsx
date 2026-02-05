// src/components/Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListChecks, MessageSquarePlus, Settings, Shield, Train } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ClipboardCheck } from 'lucide-react'; // Add this icon

const allLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['Admin', 'Staff'] },
  // Add the "My Tasks" link here
  { name: 'My Tasks', href: '/dashboard/mytasks', icon: ClipboardCheck, roles: ['Staff'] },
  { name: 'Detections', href: '/dashboard/detections', icon: ListChecks, roles: ['Admin', 'Staff'] },
  { name: 'Report Issue', href: '/dashboard/report', icon: MessageSquarePlus, roles: ['Staff'] },
  { name: 'Admin Panel', href: '/dashboard/admin', icon: Shield, roles: ['Admin'] },
];

const Sidebar = () => {
  const { currentUser } = useAuth();

  // First, check if there is a logged-in user. If not, don't render anything.
  // This is a "guard clause" and makes the component safer.
  if (!currentUser) {
    return null;
  }

  // If we have a user, THEN we filter the links they can see.
  const accessibleLinks = allLinks.filter(link =>
    link.roles.includes(currentUser.role)
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
      <div className="flex items-center justify-center p-4 border-b border-gray-200 h-16">
        <Train className="h-8 w-8 text-blue-600" />
        <h2 className="ml-3 text-2xl font-bold text-gray-800">Sentinel Track</h2>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        {accessibleLinks.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-gray-200">
         <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;