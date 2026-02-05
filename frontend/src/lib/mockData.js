// src/lib/mockData.js

export const mockDetections = [
  {
    id: 'DET001',
    label: 'Track Crack',
    severity: 'Critical',
    status: 'Verified',
    confidence: 94,
    timestamp: '2025-09-15T14:30:00Z',
    location: { lat: 11.6643, lng: 78.1460 },
    image: 'https://placehold.co/800x600/ff6347/ffffff?text=Track+Crack',
    assignee: 'Team Alpha',
  },
  {
    id: 'DET002',
    label: 'Vegetation Overgrowth',
    severity: 'Medium',
    status: 'Reported',
    confidence: 88,
    timestamp: '2025-09-15T12:15:00Z',
    location: { lat: 11.6655, lng: 78.1482 },
    image: 'https://placehold.co/800x600/228b22/ffffff?text=Vegetation',
    assignee: null,
  },
  {
    id: 'DET003',
    label: 'Missing Fastener',
    severity: 'High',
    status: 'In Progress',
    confidence: 91,
    timestamp: '2025-09-15T09:05:00Z',
    location: { lat: 11.6621, lng: 78.1445 },
    image: 'https://placehold.co/800x600/ffa500/ffffff?text=Missing+Fastener',
    assignee: 'John Doe', 
  },
  // ... other mockDetections objects
];

// --- VIBRATION DATA AND FUNCTIONS ---

export const mockVibrationData = [
  { segment: 'S001', frequency: 120, amplitude: 0.5, status: 'normal' },
  { segment: 'S002', frequency: 125, amplitude: 0.8, status: 'warning' },
  { segment: 'S003', frequency: 118, amplitude: 0.4, status: 'normal' },
  { segment: 'S004', frequency: 135, amplitude: 1.5, status: 'critical' },
  { segment: 'S005', frequency: 122, amplitude: 0.6, status: 'normal' },
  { segment: 'S006', frequency: 128, amplitude: 0.9, status: 'warning' },
];

export const generateVibrationWave = (segmentId, points) => {
  const segment = mockVibrationData.find(v => v.segment === segmentId) || mockVibrationData[0];
  const data = [];
  const frequency = segment.frequency / 10;
  const amplitude = segment.amplitude;
  const noise = amplitude * 0.2;

  for (let i = 0; i < points; i++) {
    const value = Math.sin(i / frequency) * amplitude + (Math.random() - 0.5) * noise;
    data.push({ x: i, value: value });
  }
  return data;
};

export const getVibrationStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'critical': return 'text-red-600';
    case 'warning': return 'text-orange-500';
    case 'normal': return 'text-green-600';
    default: return 'text-gray-500';
  }
};

export const getVibrationStatusBg = (status) => {
  switch (status?.toLowerCase()) {
    case 'critical': return 'bg-red-50 border-red-200';
    case 'warning': return 'bg-orange-50 border-orange-200';
    case 'normal': return 'bg-green-50 border-green-200';
    default: return 'bg-gray-50 border-gray-200';
  }
};

export const mockUsers = [
  { id: 'USR001', name: 'John Doe', email: 'john.doe@example.com', role: 'Inspector', status: 'Active' },
  { id: 'USR002', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Admin', status: 'Active' },
  { id: 'USR003', name: 'Peter Jones', email: 'peter.jones@example.com', role: 'Engineer', status: 'Inactive' },
  { id: 'USR004', name: 'Mary Williams', email: 'mary.w@example.com', role: 'Inspector', status: 'Active' },
];

export const mockDevices = [
  { id: 'CAM-01A', type: 'Camera', location: 'KM 14.5', status: 'Online', lastSeen: new Date().toISOString() },
  { id: 'VIB-02B', type: 'Vibration Sensor', location: 'KM 18.2', status: 'Offline', lastSeen: '2025-09-17T10:00:00Z' },
  { id: 'CAM-01C', type: 'Camera', location: 'KM 22.0', status: 'Maintenance', lastSeen: '2025-09-18T08:30:00Z' },
  { id: 'VIB-03D', type: 'Vibration Sensor', location: 'KM 25.9', status: 'Online', lastSeen: new Date().toISOString() },
];

// src/lib/mockData.js (add this to the end)

// Simulates a real-time stream of anomaly scores
export const generateAnomalyScoreData = (currentData, maxPoints) => {
  // Remove the oldest data point if the array is full
  const data = currentData.length >= maxPoints ? currentData.slice(1) : [...currentData];

  let newScore;
  // 95% chance of a normal, low score
  if (Math.random() > 0.05) {
    newScore = Math.random() * 0.1 + 0.05; // Stable score between 0.05 and 0.15
  } else {
    // 5% chance of a high-score anomaly (a spike)
    newScore = Math.random() * 0.5 + 0.5; // Spike score between 0.5 and 1.0
  }

  data.push(newScore);
  return data;
};