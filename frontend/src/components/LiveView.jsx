import React, { useState } from 'react';
import { Play, Square, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { motion } from 'framer-motion';

const LiveView = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentSeverity, setCurrentSeverity] = useState('Info');

  const toggleStream = () => {
    setIsStreaming(!isStreaming);
    // Simulate severity changes
    const severities = ['Info', 'Warn', 'Critical'];
    setCurrentSeverity(severities[Math.floor(Math.random() * severities.length)]);
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'Critical':
        return <AlertTriangle className="w-4 h-4" />;
      case 'Warn':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500 text-white border-red-600';
      case 'Warn':
        return 'bg-orange-500 text-white border-orange-600';
      default:
        return 'bg-blue-500 text-white border-blue-600';
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="relative">
          {/* Video Player */}
          <div className="relative bg-gray-900 rounded-t-lg overflow-hidden">
            <video
              className="w-full h-64 object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/sample-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Overlay with severity badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 left-4"
            >
              <Badge 
                className={`${getSeverityColor(currentSeverity)} flex items-center space-x-1 px-3 py-1`}
              >
                {getSeverityIcon(currentSeverity)}
                <span>{currentSeverity}</span>
              </Badge>
            </motion.div>

            {/* Streaming indicator */}
            {isStreaming && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-4 right-4"
              >
                <div className="flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">LIVE</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Controls */}
          <div className="p-6 bg-white rounded-b-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Live Camera Feed</h3>
                <p className="text-sm text-gray-500">
                  {isStreaming ? 'Streaming active' : 'Stream paused'}
                </p>
              </div>
              
              <Button
                onClick={toggleStream}
                variant={isStreaming ? "destructive" : "default"}
                className="flex items-center space-x-2"
              >
                {isStreaming ? (
                  <>
                    <Square className="w-4 h-4" />
                    <span>Stop Stream</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Start Stream</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveView;