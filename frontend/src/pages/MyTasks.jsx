// src/pages/MyTasks.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockDetections } from '../lib/mockData';
import { useAuth } from '../context/AuthContext';

const MyTasks = () => {
  const { currentUser } = useAuth();

  // Filter detections to show only those assigned to the current user
  const myTasks = mockDetections.filter(
    (detection) => detection.assignee === currentUser?.name
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Assigned Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {myTasks.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            {/* ... table headers ... */}
            <tbody className="bg-white divide-y divide-gray-200">
              {myTasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{task.label}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge>{task.severity}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{task.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/dashboard/detections/${task.id}`} className="text-blue-600 hover:text-blue-900">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 py-8">You have no tasks assigned to you.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MyTasks;