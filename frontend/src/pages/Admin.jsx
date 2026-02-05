// src/pages/Admin.jsx

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import UserManagement from '../components/UserManagement';
import DeviceManagement from '../components/DeviceManagement';

const Admin = () => {
  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="users">User Management</TabsTrigger>
        <TabsTrigger value="devices">Device Management</TabsTrigger>
      </TabsList>
      <TabsContent value="users">
        <UserManagement />
      </TabsContent>
      <TabsContent value="devices">
        <DeviceManagement />
      </TabsContent>
    </Tabs>
  );
};

export default Admin;