// src/pages/DetectionDetail.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockDetections } from '../lib/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Check, X, UserPlus, ArrowLeft, Play, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const DetectionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Get the current user
  const detection = mockDetections.find((d) => d.id === id);

  if (!detection) {
    return <div>Detection not found.</div>;
  }

  // Define the action buttons based on the user's role
  const AdminActions = () => (
    <>
      <h3 className="text-md font-semibold">Admin Actions</h3>
      <Button><Check className="w-4 h-4 mr-2" />Verify</Button>
      <Button variant="outline"><UserPlus className="w-4 h-4 mr-2" />Assign to Staff</Button>
      <Button variant="destructive"><X className="w-4 h-4 mr-2" />Mark False Positive</Button>
    </>
  );

  const StaffActions = () => (
    <>
      <h3 className="text-md font-semibold">Task Actions</h3>
      <Button variant="outline"><Play className="w-4 h-4 mr-2" />Mark as In Progress</Button>
      <Button><CheckCircle className="w-4 h-4 mr-2" />Complete Task</Button>
    </>
  );

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Visual Evidence</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={detection.image} alt={detection.label} className="rounded-lg w-full" />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{detection.label}</CardTitle>
              <CardDescription>ID: {detection.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm space-y-2">
                <p><strong>Confidence:</strong> {detection.confidence}%</p>
                <p className="flex items-center"><strong>Severity:</strong><Badge className="ml-2">{detection.severity}</Badge></p>
                <p><strong>Status:</strong> {detection.status}</p>
                <p><strong>Timestamp:</strong> {new Date(detection.timestamp).toLocaleString()}</p>
                <p><strong>Location:</strong> {detection.location.lat}, {detection.location.lng}</p>
                <p><strong>Assigned To:</strong> {detection.assignee || 'Unassigned'}</p>
              </div>
              <div className="border-t pt-4 flex flex-col space-y-2">
                {/* Conditionally render actions based on role */}
                {currentUser?.role === 'Admin' && <AdminActions />}
                {currentUser?.role === 'Staff' && <StaffActions />}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetectionDetail;