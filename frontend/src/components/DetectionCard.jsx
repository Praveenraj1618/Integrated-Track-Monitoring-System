import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const DetectionCard = ({ detection }) => {
  return (
    <div className="p-4 flex items-center space-x-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
      <img src={detection.image} alt={detection.label} className="w-20 h-16 object-cover rounded-md bg-gray-200" />
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{detection.label}</h4>
        <p className="text-sm text-gray-500">{new Date(detection.timestamp).toLocaleDateString()}</p>
        <Badge variant={detection.severity === 'Critical' ? 'destructive' : 'secondary'}>
          {detection.severity}
        </Badge>
      </div>
      <Button asChild variant="outline" size="sm">
        <Link to={`detections/${detection.id}`}>View</Link>
      </Button>
    </div>
  );
};

export default DetectionCard;