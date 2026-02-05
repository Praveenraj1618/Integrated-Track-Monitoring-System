// src/components/DeviceManagement.jsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { mockDevices } from '../lib/mockData';

const getStatusColor = (status) => {
  if (status === 'Online') return 'bg-green-100 text-green-800';
  if (status === 'Offline') return 'bg-red-100 text-red-800';
  return 'bg-yellow-100 text-yellow-800';
};

const DeviceManagement = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Device & Asset Health</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockDevices.map(device => (
              <tr key={device.id}>
                <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-700">{device.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={getStatusColor(device.status)}>{device.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default DeviceManagement;