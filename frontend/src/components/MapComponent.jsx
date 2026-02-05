import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MapPin } from 'lucide-react';

const MapComponent = ({ detections }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Live Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300">
          <div className="text-center text-gray-500">
            <MapPin className="mx-auto h-12 w-12" />
            <p className="mt-2 font-semibold">Map Component Placeholder</p>
            <p className="text-sm">(Leaflet/Mapbox integration here)</p>
            <p className="text-sm mt-1">{detections?.length || 0} detections would be plotted.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapComponent;