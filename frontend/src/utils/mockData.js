// Mock data for RailTrack Monitor Dashboard

export const mockEvents = [
  {
    id: 1,
    label: "Rock between rails",
    severity: "Critical",
    timestamp: "2024-01-15 14:30:25",
    segmentId: "S001",
    thumbnail: "/api/placeholder/150/100",
    description: "Large rock detected between railway tracks at segment S001"
  },
  {
    id: 2,
    label: "Small crack",
    severity: "Warn",
    timestamp: "2024-01-15 13:45:12",
    segmentId: "S002",
    thumbnail: "/api/placeholder/150/100",
    description: "Minor crack detected in rail surface at segment S002"
  },
  {
    id: 3,
    label: "Misalignment",
    severity: "Info",
    timestamp: "2024-01-15 12:15:08",
    segmentId: "S003",
    thumbnail: "/api/placeholder/150/100",
    description: "Slight rail misalignment detected at segment S003"
  }
];

export const mockHealthScores = [
  { segment: "S001", score: 95, timestamp: "2024-01-15T14:30:00Z" },
  { segment: "S002", score: 87, timestamp: "2024-01-15T14:30:00Z" },
  { segment: "S003", score: 60, timestamp: "2024-01-15T14:30:00Z" },
  { segment: "S004", score: 45, timestamp: "2024-01-15T14:30:00Z" },
  { segment: "S005", score: 90, timestamp: "2024-01-15T14:30:00Z" },
  { segment: "S006", score: 78, timestamp: "2024-01-15T14:30:00Z" },
  { segment: "S007", score: 92, timestamp: "2024-01-15T14:30:00Z" },
  { segment: "S008", score: 55, timestamp: "2024-01-15T14:30:00Z" }
];

export const mockTrendData = [
  { time: "00:00", score: 85 },
  { time: "04:00", score: 87 },
  { time: "08:00", score: 82 },
  { time: "12:00", score: 78 },
  { time: "16:00", score: 75 },
  { time: "20:00", score: 80 }
];

export const getSeverityColor = (severity) => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'bg-red-500 text-white';
    case 'warn':
      return 'bg-orange-500 text-white';
    case 'info':
      return 'bg-blue-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export const getHealthScoreColor = (score) => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 50) return 'bg-orange-500';
  return 'bg-red-500';
};

// Vibration data for track segments
export const mockVibrationData = [
  {
    segment: "S001",
    frequency: 15.2,
    amplitude: 0.8,
    timestamp: "2024-01-15T14:30:00Z",
    status: "normal"
  },
  {
    segment: "S002", 
    frequency: 18.5,
    amplitude: 1.2,
    timestamp: "2024-01-15T14:30:00Z",
    status: "warning"
  },
  {
    segment: "S003",
    frequency: 22.1,
    amplitude: 2.1,
    timestamp: "2024-01-15T14:30:00Z",
    status: "critical"
  },
  {
    segment: "S004",
    frequency: 12.8,
    amplitude: 0.6,
    timestamp: "2024-01-15T14:30:00Z",
    status: "normal"
  },
  {
    segment: "S005",
    frequency: 16.3,
    amplitude: 0.9,
    timestamp: "2024-01-15T14:30:00Z",
    status: "normal"
  },
  {
    segment: "S006",
    frequency: 19.7,
    amplitude: 1.5,
    timestamp: "2024-01-15T14:30:00Z",
    status: "warning"
  },
  {
    segment: "S007",
    frequency: 14.1,
    amplitude: 0.7,
    timestamp: "2024-01-15T14:30:00Z",
    status: "normal"
  },
  {
    segment: "S008",
    frequency: 25.3,
    amplitude: 2.8,
    timestamp: "2024-01-15T14:30:00Z",
    status: "critical"
  }
];

// Real-time vibration wave data points
export const generateVibrationWave = (segment, timePoints = 100) => {
  const vibration = mockVibrationData.find(v => v.segment === segment);
  if (!vibration) return [];
  
  const { frequency, amplitude } = vibration;
  const waveData = [];
  
  for (let i = 0; i < timePoints; i++) {
    const time = (i / timePoints) * 10; // 10 second window
    const baseWave = amplitude * Math.sin(2 * Math.PI * frequency * time);
    const noise = (Math.random() - 0.5) * 0.1 * amplitude; // Add some noise
    const value = baseWave + noise;
    
    waveData.push({
      time: time,
      value: value,
      timestamp: new Date(Date.now() + i * 100).toISOString()
    });
  }
  
  return waveData;
};

export const getVibrationStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'normal':
      return 'text-green-500';
    case 'warning':
      return 'text-orange-500';
    case 'critical':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export const getVibrationStatusBg = (status) => {
  switch (status.toLowerCase()) {
    case 'normal':
      return 'bg-green-100 border-green-200';
    case 'warning':
      return 'bg-orange-100 border-orange-200';
    case 'critical':
      return 'bg-red-100 border-red-200';
    default:
      return 'bg-gray-100 border-gray-200';
  }
};