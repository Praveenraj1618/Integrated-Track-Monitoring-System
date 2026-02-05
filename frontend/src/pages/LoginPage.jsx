// src/pages/LoginPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Train } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const LoginPage = () => {
  const { login } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Train className="mx-auto h-10 w-10 text-blue-600" />
          <CardTitle className="mt-4">Sentinel Track</CardTitle>
          <CardDescription>Staff & Admin Portal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-gray-600">
            Select a role to simulate login:
          </p>
          <div className="flex flex-col space-y-2">
            <Button onClick={() => login('Admin')}>Login as Admin</Button>
            <Button onClick={() => login('Staff')} variant="secondary">Login as Staff (Inspector)</Button>
          </div>
           <p className="text-center text-sm text-gray-600 pt-4">
              Reporting an issue?{' '}
              <Link to="/" className="font-medium text-blue-600 hover:underline">
                Return to public page
              </Link>
            </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;