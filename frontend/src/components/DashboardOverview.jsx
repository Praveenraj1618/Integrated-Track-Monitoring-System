// src/components/DashboardOverview.jsx

import React from 'react';
import StatCard from './StatCard';
import MapComponent from './MapComponent';
import DetectionCard from './DetectionCard';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertTriangle, Clock, ListChecks, ShieldCheck } from 'lucide-react';
import { mockDetections } from '../lib/mockData';

const DashboardOverview = () => {
  const criticalIssues = mockDetections.filter(d => d.severity === 'Critical' && d.status !== 'Resolved');
  const recentDetections = mockDetections.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Critical Issues" value={criticalIssues.length} icon={AlertTriangle} color="red" />
        <StatCard title="Avg. Time to Resolve" value="4.2h" icon={Clock} color="orange" />
        <StatCard title="Detections Today" value="32" icon={ListChecks} color="blue" />
        <StatCard title="Predictive Risk Score" value="78%" icon={ShieldCheck} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MapComponent detections={mockDetections} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Detection Queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDetections.map(detection => (
              <DetectionCard key={detection.id} detection={detection} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;