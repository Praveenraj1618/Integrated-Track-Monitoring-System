import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { MapPin, AlertTriangle, Layers, Navigation, Calendar, User, Eye } from 'lucide-react';

// Custom icons by defect severity
const createCustomMarker = (severity) => {
  let color = '#ef4444'; // Critical - Red
  let haloColor = 'rgba(239, 68, 68, 0.35)';

  if (severity === 'High') {
    color = '#f97316'; // High - Orange
    haloColor = 'rgba(249, 115, 22, 0.35)';
  } else if (severity === 'Medium') {
    color = '#eab308'; // Medium - Amber/Yellow
    haloColor = 'rgba(234, 179, 8, 0.35)';
  } else if (severity === 'Low') {
    color = '#3b82f6'; // Low - Blue
    haloColor = 'rgba(59, 130, 246, 0.35)';
  }

  return L.divIcon({
    className: 'custom-track-marker',
    html: `
      <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background: ${haloColor}; animation: pulseRing 2s cubic-bezier(0.24, 0, 0.38, 1) infinite;"></div>
        <div style="position: relative; width: 24px; height: 24px; border-radius: 50%; background: ${color}; border: 2.5px solid #ffffff; box-shadow: 0 4px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
          <svg style="width: 12px; height: 12px; color: #ffffff;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
  });
};

// Component to dynamically fit all markers in view
const MapBoundsAdjuster = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (points && points.length > 0) {
      map.fitBounds(points, { padding: [50, 50], maxZoom: 16 });
    }
  }, [points, map]);

  return null;
};

const MapComponent = ({ detections = [] }) => {
  const [selectedSeverity, setSelectedSeverity] = useState('All');

  // Filter valid detections with coordinates
  const validDetections = useMemo(() => {
    return (detections || []).filter(
      (d) => d?.location && typeof d.location.lat === 'number' && typeof d.location.lng === 'number'
    );
  }, [detections]);

  const filteredDetections = useMemo(() => {
    if (selectedSeverity === 'All') return validDetections;
    return validDetections.filter((d) => d.severity?.toLowerCase() === selectedSeverity.toLowerCase());
  }, [validDetections, selectedSeverity]);

  // Points for bounds fitting & rail polyline
  const points = useMemo(() => {
    return filteredDetections.map((d) => [d.location.lat, d.location.lng]);
  }, [filteredDetections]);

  // Default fallback center Salem / Tamil Nadu track coordinates from mock data
  const defaultCenter = points.length > 0 ? points[0] : [11.6643, 78.1460];

  const getSeverityBadgeClass = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <Card className="h-full flex flex-col shadow-sm border">
      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(0.7); opacity: 0.9; }
          70% { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .leaflet-container {
          z-index: 10 !important;
          font-family: inherit;
        }
        .custom-track-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>

      <CardHeader className="pb-3 border-b bg-gray-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-blue-100 text-blue-700 rounded-md">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-gray-900">Live Track Inspection Map</CardTitle>
              <p className="text-xs text-gray-500">Real-time GPS defect telemetry & track corridor</p>
            </div>
          </div>

          {/* Severity Filter Pills */}
          <div className="flex items-center space-x-1 bg-white p-1 rounded-lg border text-xs shadow-xs">
            {['All', 'Critical', 'High', 'Medium'].map((severity) => (
              <button
                key={severity}
                type="button"
                onClick={() => setSelectedSeverity(severity)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  selectedSeverity === severity
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {severity}
                {severity === 'All' ? ` (${validDetections.length})` : ''}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1 relative min-h-[500px]">
        {validDetections.length === 0 ? (
          <div className="h-[500px] bg-gray-50 flex items-center justify-center border-t">
            <div className="text-center text-gray-500">
              <AlertTriangle className="mx-auto h-10 w-10 text-gray-400 mb-2" />
              <p className="font-semibold text-gray-700">No Track Defects Plotted</p>
              <p className="text-sm text-gray-400">Telemetry coordinates will appear here when detected.</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-[520px] relative rounded-b-lg overflow-hidden">
            <MapContainer
              center={defaultCenter}
              zoom={15}
              scrollWheelZoom={true}
              style={{ width: '100%', height: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapBoundsAdjuster points={points} />

              {/* Railway track corridor line */}
              {points.length > 1 && (
                <Polyline
                  positions={points}
                  pathOptions={{
                    color: '#334155',
                    weight: 3.5,
                    dashArray: '8, 8',
                    opacity: 0.8,
                  }}
                />
              )}

              {/* Defect Markers */}
              {filteredDetections.map((detection) => (
                <Marker
                  key={detection.id}
                  position={[detection.location.lat, detection.location.lng]}
                  icon={createCustomMarker(detection.severity)}
                >
                  <Tooltip direction="top" offset={[0, -18]} opacity={0.95}>
                    <div className="text-xs font-semibold">
                      {detection.label} • <span className="uppercase">{detection.severity}</span>
                    </div>
                  </Tooltip>

                  <Popup className="track-defect-popup" maxWidth={280}>
                    <div className="p-1 space-y-2">
                      {detection.image && (
                        <div className="relative rounded overflow-hidden h-28 bg-gray-100">
                          <img
                            src={detection.image}
                            alt={detection.label}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-1.5 right-1.5">
                            <span
                              className={`px-2 py-0.5 text-[11px] font-bold rounded shadow-xs border ${getSeverityBadgeClass(
                                detection.severity
                              )}`}
                            >
                              {detection.severity}
                            </span>
                          </div>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-gray-900 text-sm">{detection.label}</h4>
                          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {detection.confidence}% conf.
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">ID: #{detection.id}</p>
                      </div>

                      <div className="border-t pt-2 space-y-1 text-xs text-gray-600">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center text-gray-500">
                            <Navigation className="h-3.5 w-3.5 mr-1" />
                            GPS:
                          </span>
                          <span className="font-mono text-[11px]">
                            {detection.location.lat.toFixed(4)}, {detection.location.lng.toFixed(4)}
                          </span>
                        </div>

                        {detection.assignee && (
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-gray-500">
                              <User className="h-3.5 w-3.5 mr-1" />
                              Assignee:
                            </span>
                            <span className="font-medium text-gray-700">{detection.assignee}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="flex items-center text-gray-500">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            Logged:
                          </span>
                          <span>{new Date(detection.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button
                          asChild
                          size="sm"
                          className="w-full text-xs h-7 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-1"
                        >
                          <Link to={`/dashboard/detections/${detection.id}`}>
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Map Legend Overlay */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-2 rounded-lg border shadow-md text-xs z-[400] flex items-center space-x-3 pointer-events-auto">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="text-gray-700 font-medium">Critical</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                <span className="text-gray-700 font-medium">High</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                <span className="text-gray-700 font-medium">Medium</span>
              </div>
              <div className="border-l pl-2 text-gray-500 flex items-center space-x-1">
                <Layers className="h-3.5 w-3.5 text-gray-400" />
                <span>Track Corridor</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapComponent;