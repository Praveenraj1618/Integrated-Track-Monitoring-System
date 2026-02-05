// src/pages/LandingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Shield, Megaphone } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="px-6 py-4 bg-white border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Sentinel Track</h1>
        <Button asChild>
          <Link to="/login">Staff Login</Link>
        </Button>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Real-time rail safety — detect, prioritize, resolve.
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Our platform uses AI to monitor railway infrastructure, enabling faster issue detection and resolution to ensure public safety.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link to="/report">
                <Megaphone className="mr-2 h-5 w-5" />
                Report an Issue
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;