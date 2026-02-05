// src/components/VibrationWave.jsx

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { generateAnomalyScoreData } from '../lib/mockData';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

const ANOMALY_THRESHOLD = 0.5; // Define the error score that triggers an alert

const RealtimeVibrationChart = () => {
  const [data, setData] = useState(() => Array(200).fill(0));
  const [status, setStatus] = useState({ level: 'Normal', color: 'text-green-600', icon: <CheckCircle /> });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(currentData => generateAnomalyScoreData(currentData, 200));
    }, 100); // Update every 100ms to create a smooth scroll

    return () => clearInterval(interval);
  }, []);

  // Effect to check the latest data point and update the status
  useEffect(() => {
    const latestScore = data[data.length - 1];
    if (latestScore > ANOMALY_THRESHOLD) {
      setStatus({ level: 'Anomaly Detected', color: 'text-red-600', icon: <AlertTriangle /> });
    } else {
      setStatus({ level: 'Normal', color: 'text-green-600', icon: <CheckCircle /> });
    }
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <Activity className="mr-2" />
              Real-time Vibration Anomaly Score
            </CardTitle>
            <CardDescription>
              Autoencoder error score. Spikes indicate potential track anomalies.
            </CardDescription>
          </div>
          <Badge className={`${status.level === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800 animate-pulse'}`}>
            <div className="flex items-center">
              {status.icon}
              <span className="ml-2">Status: {status.level}</span>
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
            {/* Anomaly Threshold Line */}
            <line
              x1="0"
              y1={200 - (ANOMALY_THRESHOLD * 200)}
              x2="800"
              y2={200 - (ANOMALY_THRESHOLD * 200)}
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="4"
            />
            <text x="750" y={195 - (ANOMALY_THRESHOLD * 200)} fill="#f59e0b" fontSize="10">Threshold</text>

            {/* Data Path */}
            <path
              d={data.map((point, index) => {
                const x = (index / (data.length - 1)) * 800;
                const y = 200 - (point * 200); // Scale point to fit 0-200 height
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />

            {/* Highlight Anomaly Spikes */}
            {data.map((point, index) => {
              if (point > ANOMALY_THRESHOLD) {
                const x = (index / (data.length - 1)) * 800;
                const y = 200 - (point * 200);
                return <circle key={index} cx={x} cy={y} r="4" fill="#ef4444" />;
              }
              return null;
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

// We rename the exported component to reflect its new purpose
const VibrationWave = () => {
  return (
    <div className="space-y-6">
      <RealtimeVibrationChart />
    </div>
  );
};

export default VibrationWave;