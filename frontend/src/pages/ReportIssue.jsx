// src/pages/ReportIssue.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/button';
import { Upload, MapPin, ArrowLeft } from 'lucide-react';

const ReportIssue = () => {
  const location = useLocation();

  const isStaffReporting = location.pathname.startsWith('/dashboard');

  const backLink = isStaffReporting ? '/dashboard' : '/';
  const backText = isStaffReporting ? 'Back to Dashboard' : 'Back to Home';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <Button asChild variant="outline" size="sm">
            <Link to={backLink}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {backText}
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Report an Issue</CardTitle>
            {/* The typo was in the closing tag below */}
            <CardDescription>
              Submit a new issue for review. Provide as much detail as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
               <div>
                <Label htmlFor="upload">Upload Image/Video</Label>
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location (GPS or Marker)</Label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <Input type="text" id="location" placeholder="e.g., 11.6643, 78.1460" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Short Description</Label>
                <Textarea id="description" placeholder="Describe the issue you observed..." rows={4} />
              </div>
              <Button type="submit" className="w-full">Submit Report</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportIssue;