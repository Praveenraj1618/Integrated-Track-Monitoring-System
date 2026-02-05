import React from 'react';
import { FileText, Video, Clock, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import { mockEvents, getSeverityColor } from '../utils/mockData';

const EventsTimeline = () => {
  const handleCSVExport = () => {
    // Placeholder for CSV export functionality
    console.log('CSV export clicked');
  };

  const handleMP4Export = () => {
    // Placeholder for MP4 export functionality
    console.log('MP4 export clicked');
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Export Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Event Timeline</span>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCSVExport}
                  className="flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Export CSV</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMP4Export}
                  className="flex items-center space-x-2"
                >
                  <Video className="w-4 h-4" />
                  <span>Export MP4</span>
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Events List */}
      <div className="space-y-4">
        {mockEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={event.thumbnail}
                        alt={event.label}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-600 text-xs font-medium" style={{ display: 'none' }}>
                        {event.label.split(' ')[0]}
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {event.label}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {event.description}
                        </p>
                        
                        {/* Metadata */}
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatTimestamp(event.timestamp)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.segmentId}</span>
                          </div>
                        </div>
                      </div>

                      {/* Severity Badge */}
                      <div className="flex-shrink-0 ml-4">
                        <Badge 
                          className={`${getSeverityColor(event.severity)} px-3 py-1`}
                        >
                          {event.severity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="text-center"
      >
        <Button variant="outline" className="w-full">
          Load More Events
        </Button>
      </motion.div>
    </div>
  );
};

export default EventsTimeline;