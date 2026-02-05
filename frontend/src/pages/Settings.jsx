import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Settings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p>User profile and application settings will be here.</p>
      </CardContent>
    </Card>
  );
};

export default Settings;