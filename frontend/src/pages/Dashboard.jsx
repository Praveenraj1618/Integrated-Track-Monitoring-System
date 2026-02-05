// src/pages/Dashboard.jsx

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import DashboardOverview from '../components/DashboardOverview';
import VibrationWave from '../components/VibrationWave';

const Dashboard = () => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="overview">Dashboard Overview</TabsTrigger>
        <TabsTrigger value="vibration">Vibration Analysis</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <DashboardOverview />
      </TabsContent>
      <TabsContent value="vibration">
        <VibrationWave />
      </TabsContent>
    </Tabs>
  );
};

export default Dashboard;