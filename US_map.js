import React, { useState, useMemo } from 'react';

const AIUsageMap = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [hoveredState, setHoveredState] = useState(null);
  const [viewMode, setViewMode] = useState('points'); // 'points' or 'heatmap'

  // Market share data from First Page Sage (April 2025)
  const platformData = {
    chatgpt: { name: 'ChatGPT', share: 59.7, color: '#10B981', growth: 8 },
    copilot: { name: 'Microsoft Copilot', share: 14.4, color: '#3B82F6', growth: 6 },
    gemini: { name: 'Google Gemini', share: 13.5, color: '#F59E0B', growth: 5 },
    perplexity: { name: 'Perplexity', share: 6.2, color: '#8B5CF6', growth: 10 },
    claude: { name: 'Claude AI', share: 3.2, color: '#EF4444', growth: 14 },
    other: { name: 'Other AI Tools', share: 3.0, color: '#6B7280', growth: 8 }
  };

  // Estimated state usage based on tech adoption patterns, education, urbanization
  const stateMultipliers = {
    'CA': 1.4, 'WA': 1.35, 'MA': 1.3, 'NY': 1.25, 'CT': 1.2,
    'MD': 1.2, 'CO': 1.15, 'TX': 1.1, 'FL': 1.05, 'IL': 1.05,
    'VA': 1.05, 'NJ': 1.0, 'NC': 1.0, 'GA': 0.95, 'AZ': 0.95,
    'NV': 0.95, 'OR': 1.1, 'UT': 1.1, 'MN': 1.05, 'WI': 0.9,
    'MI': 0.9, 'OH': 0.9, 'PA': 0.95, 'IN': 0.85, 'TN': 0.85,
    'KY': 0.8, 'AL': 0.75, 'MS': 0.7, 'AR': 0.75, 'LA': 0.8,
    'OK': 0.8, 'KS': 0.85, 'NE': 0.85, 'IA': 0.8, 'MO': 0.85,
    'SD': 0.75, 'ND': 0.8, 'MT': 0.8, 'WY': 0.75, 'ID': 0.8,
    'NM': 0.85, 'AK': 0.9, 'HI': 1.0, 'ME': 0.9, 'NH': 1.0,
    'VT': 0.95, 'RI': 1.0, 'DE': 1.0, 'SC': 0.85, 'WV': 0.7
  };

  // Simplified state data with boundaries (using approximate SVG paths)
  const stateData = {
    'CA': { x: 80, y: 280, name: 'California', path: 'M 158 207 L 121 215 L 113 280 L 147 338 L 158 270 L 158 207 z' },
    'TX': { x: 320, y: 370, name: 'Texas', path: 'M 240 310 L 240 380 L 340 380 L 360 350 L 350 310 L 240 310 z' },
    'FL': { x: 520, y: 430, name: 'Florida', path: 'M 480 400 L 480 450 L 550 450 L 560 430 L 540 400 L 480 400 z' },
    'NY': { x: 540, y: 160, name: 'New York', path: 'M 520 140 L 520 180 L 570 180 L 570 140 L 520 140 z' },
    'PA': { x: 520, y: 190, name: 'Pennsylvania', path: 'M 500 180 L 500 210 L 560 210 L 560 180 L 500 180 z' },
    'IL': { x: 420, y: 220, name: 'Illinois', path: 'M 400 200 L 400 250 L 430 250 L 430 200 L 400 200 z' },
    'OH': { x: 480, y: 210, name: 'Ohio', path: 'M 460 190 L 460 230 L 500 230 L 500 190 L 460 190 z' },
    'GA': { x: 490, y: 360, name: 'Georgia', path: 'M 470 340 L 470 380 L 510 380 L 510 340 L 470 340 z' },
    'NC': { x: 520, y: 290, name: 'North Carolina', path: 'M 500 280 L 500 310 L 560 310 L 560 280 L 500 280 z' },
    'MI': { x: 450, y: 180, name: 'Michigan', path: 'M 430 160 L 430 200 L 470 200 L 470 160 L 430 160 z' },
    'NJ': { x: 560, y: 200, name: 'New Jersey', path: 'M 550 190 L 550 220 L 570 220 L 570 190 L 550 190 z' },
    'VA': { x: 530, y: 250, name: 'Virginia', path: 'M 510 240 L 510 270 L 560 270 L 560 240 L 510 240 z' },
    'WA': { x: 120, y: 80, name: 'Washington', path: 'M 100 60 L 100 100 L 150 100 L 150 60 L 100 60 z' },
    'AZ': { x: 230, y: 320, name: 'Arizona', path: 'M 210 300 L 210 340 L 250 340 L 250 300 L 210 300 z' },
    'TN': { x: 460, y: 290, name: 'Tennessee', path: 'M 440 280 L 440 310 L 500 310 L 500 280 L 440 280 z' },
    'IN': { x: 450, y: 230, name: 'Indiana', path: 'M 430 220 L 430 250 L 460 250 L 460 220 L 430 220 z' },
    'MO': { x: 360, y: 250, name: 'Missouri', path: 'M 340 240 L 340 270 L 380 270 L 380 240 L 340 240 z' },
    'MD': { x: 550, y: 220, name: 'Maryland', path: 'M 540 210 L 540 230 L 570 230 L 570 210 L 540 210 z' },
    'WI': { x: 410, y: 170, name: 'Wisconsin', path: 'M 390 160 L 390 190 L 420 190 L 420 160 L 390 160 z' },
    'MN': { x: 360, y: 150, name: 'Minnesota', path: 'M 340 140 L 340 170 L 370 170 L 370 140 L 340 140 z' },
    'CO': { x: 290, y: 250, name: 'Colorado', path: 'M 270 240 L 270 270 L 310 270 L 310 240 L 270 240 z' },
    'AL': { x: 470, y: 380, name: 'Alabama', path: 'M 450 360 L 450 390 L 480 390 L 480 360 L 450 360 z' },
    'LA': { x: 370, y: 380, name: 'Louisiana', path: 'M 350 370 L 350 400 L 390 400 L 390 370 L 350 370 z' },
    'KY': { x: 460, y: 260, name: 'Kentucky', path: 'M 440 250 L 440 280 L 480 280 L 480 250 L 440 250 z' },
    'SC': { x: 510, y: 320, name: 'South Carolina', path: 'M 490 310 L 490 340 L 520 340 L 520 310 L 490 310 z' },
    'OK': { x: 330, y: 300, name: 'Oklahoma', path: 'M 310 290 L 310 320 L 360 320 L 360 290 L 310 290 z' },
    'OR': { x: 100, y: 140, name: 'Oregon', path: 'M 80 130 L 80 160 L 130 160 L 130 130 L 80 130 z' },
    'CT': { x: 580, y: 180, name: 'Connecticut', path: 'M 570 170 L 570 190 L 590 190 L 590 170 L 570 170 z' },
    'IA': { x: 370, y: 210, name: 'Iowa', path: 'M 350 200 L 350 230 L 380 230 L 380 200 L 350 200 z' },
    'MS': { x: 420, y: 360, name: 'Mississippi', path: 'M 400 350 L 400 380 L 430 380 L 430 350 L 400 350 z' },
    'AR': { x: 380, y: 330, name: 'Arkansas', path: 'M 360 320 L 360 350 L 390 350 L 390 320 L 360 320 z' },
    'UT': { x: 220, y: 220, name: 'Utah', path: 'M 200 210 L 200 240 L 230 240 L 230 210 L 200 210 z' },
    'KS': { x: 320, y: 260, name: 'Kansas', path: 'M 300 250 L 300 280 L 340 280 L 340 250 L 300 250 z' },
    'NV': { x: 150, y: 240, name: 'Nevada', path: 'M 130 220 L 130 260 L 170 260 L 170 220 L 130 220 z' },
    'NM': { x: 270, y: 300, name: 'New Mexico', path: 'M 250 290 L 250 320 L 280 320 L 280 290 L 250 290 z' },
    'NE': { x: 320, y: 220, name: 'Nebraska', path: 'M 300 210 L 300 240 L 340 240 L 340 210 L 300 210 z' },
    'ID': { x: 200, y: 160, name: 'Idaho', path: 'M 180 140 L 180 180 L 210 180 L 210 140 L 180 140 z' },
    'WV': { x: 500, y: 240, name: 'West Virginia', path: 'M 480 230 L 480 260 L 510 260 L 510 230 L 480 230 z' },
    'MT': { x: 250, y: 140, name: 'Montana', path: 'M 220 120 L 220 160 L 280 160 L 280 120 L 220 120 z' },
    'WY': { x: 260, y: 190, name: 'Wyoming', path: 'M 240 180 L 240 210 L 280 210 L 280 180 L 240 180 z' },
    'SD': { x: 310, y: 180, name: 'South Dakota', path: 'M 290 170 L 290 200 L 330 200 L 330 170 L 290 170 z' },
    'ND': { x: 310, y: 140, name: 'North Dakota', path: 'M 290 130 L 290 160 L 330 160 L 330 130 L 290 130 z' },
    'ME': { x: 590, y: 120, name: 'Maine', path: 'M 580 100 L 580 140 L 600 140 L 600 100 L 580 100 z' },
    'NH': { x: 570, y: 140, name: 'New Hampshire', path: 'M 560 130 L 560 160 L 580 160 L 580 130 L 560 130 z' },
    'VT': { x: 560, y: 140, name: 'Vermont', path: 'M 550 130 L 550 160 L 570 160 L 570 130 L 550 130 z' },
    'MA': { x: 580, y: 160, name: 'Massachusetts', path: 'M 560 150 L 560 180 L 600 180 L 600 150 L 560 150 z' },
    'RI': { x: 590, y: 170, name: 'Rhode Island', path: 'M 585 165 L 585 175 L 595 175 L 595 165 L 585 165 z' },
    'DE': { x: 560, y: 210, name: 'Delaware', path: 'M 555 200 L 555 220 L 565 220 L 565 200 L 555 200 z' },
    'HI': { x: 150, y: 400, name: 'Hawaii', path: 'M 140 390 L 140 410 L 170 410 L 170 390 L 140 390 z' },
    'AK': { x: 120, y: 450, name: 'Alaska', path: 'M 100 440 L 100 470 L 150 470 L 150 440 L 100 440 z' }
  };

  const getUsageIntensity = (stateCode, platform = 'all') => {
    const multiplier = stateMultipliers[stateCode] || 0.9;
    if (platform === 'all') {
      return Math.min(multiplier * 100, 100);
    }
    const platformShare = platformData[platform]?.share || 0;
    return Math.min(multiplier * platformShare, platformShare * 1.5);
  };

  const getColor = (stateCode, platform = 'all') => {
    const intensity = getUsageIntensity(stateCode, platform);
    if (platform !== 'all') {
      const baseColor = platformData[platform]?.color || '#6B7280';
      const opacity = Math.max(0.3, intensity / 100);
      return `${baseColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
    }
    
    // For 'all' platforms, use a heat map from blue to red
    const normalizedIntensity = intensity / 100;
    if (normalizedIntensity < 0.5) {
      const blue = Math.round(255 * (1 - normalizedIntensity * 2));
      return `rgb(${blue}, ${blue}, 255)`;
    } else {
      const red = Math.round(255 * ((normalizedIntensity - 0.5) * 2));
      return `rgb(255, ${255 - red}, ${255 - red})`;
    }
  };

  const getHeatMapColor = (stateCode, platform = 'all') => {
    const intensity = getUsageIntensity(stateCode, platform);
    const normalizedIntensity = Math.min(intensity / 100, 1);
    
    if (platform !== 'all') {
      const baseColor = platformData[platform]?.color;
      const opacity = Math.max(0.2, normalizedIntensity);
      return `${baseColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
    }
    
    // Heat map colors from blue (low) to red (high)
    if (normalizedIntensity < 0.33) {
      const ratio = normalizedIntensity / 0.33;
      return `rgb(${Math.round(64 + ratio * 64)}, ${Math.round(128 + ratio * 64)}, 255)`;
    } else if (normalizedIntensity < 0.67) {
      const ratio = (normalizedIntensity - 0.33) / 0.34;
      return `rgb(${Math.round(128 + ratio * 64)}, ${Math.round(192 - ratio * 64)}, ${Math.round(255 - ratio * 128)})`;
    } else {
      const ratio = (normalizedIntensity - 0.67) / 0.33;
      return `rgb(${Math.round(192 + ratio * 63)}, ${Math.round(128 - ratio * 128)}, ${Math.round(127 - ratio * 127)})`;
    }
  };

  const totalUsers = useMemo(() => {
    return Math.round(260 * 0.23); // ~60 million AI users
  }, []);

  const getStateUsers = (stateCode) => {
    const statePops = {
      'CA': 39, 'TX': 30, 'FL': 22, 'NY': 19, 'PA': 13, 'IL': 12.6,
      'OH': 11.8, 'GA': 10.9, 'NC': 10.7, 'MI': 10, 'NJ': 9.3, 'VA': 8.7,
      'WA': 7.8, 'AZ': 7.4, 'MA': 7, 'TN': 7, 'IN': 6.8, 'MO': 6.2,
      'MD': 6.2, 'WI': 5.9, 'CO': 5.8, 'MN': 5.7, 'SC': 5.3, 'AL': 5.1,
      'LA': 4.6, 'KY': 4.5, 'OR': 4.2, 'OK': 4, 'CT': 3.6, 'UT': 3.4,
      'IA': 3.2, 'NV': 3.2, 'AR': 3, 'MS': 2.9, 'KS': 2.9, 'NM': 2.1,
      'NE': 2, 'ID': 1.9, 'WV': 1.8, 'HI': 1.4, 'NH': 1.4, 'ME': 1.4,
      'MT': 1.1, 'RI': 1.1, 'DE': 1, 'SD': 0.9, 'ND': 0.8, 'AK': 0.7,
      'VT': 0.6, 'WY': 0.6
    };
    
    const statePop = statePops[stateCode] || 1;
    const multiplier = stateMultipliers[stateCode] || 0.9;
    return Math.round(statePop * 0.23 * multiplier * 1000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          AI Platform Usage Across the United States
        </h1>
        <p className="text-gray-600 mb-4">
          Estimated usage patterns based on market share data and regional tech adoption factors
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {Object.entries(platformData).map(([key, data]) => (
            <div key={key} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: data.color }}
                ></div>
                <span className="font-semibold text-sm">{data.name}</span>
              </div>
              <div className="text-lg font-bold text-gray-800">{data.share}%</div>
              <div className="text-xs text-green-600">+{data.growth}% growth</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Platform:
            </label>
            <select 
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white"
            >
              <option value="all">All Platforms Combined</option>
              {Object.entries(platformData).map(([key, data]) => (
                <option key={key} value={key}>{data.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              View Mode:
            </label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('points')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'points' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Points
              </button>
              <button
                onClick={() => setViewMode('heatmap')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'heatmap' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Heat Map
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-gray-50 rounded-lg p-4 border">
        <svg width="650" height="500" viewBox="0 0 650 500" className="w-full h-auto">
          {/* US Map Background */}
          <rect x="0" y="0" width="650" height="500" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
          
          {/* State boundaries and fills */}
          {Object.entries(stateData).map(([stateCode, data]) => (
            <g key={stateCode}>
              {viewMode === 'heatmap' ? (
                <path
                  d={data.path}
                  fill={getHeatMapColor(stateCode, selectedPlatform)}
                  stroke="#374151"
                  strokeWidth="1"
                  opacity="0.8"
                  onMouseEnter={() => setHoveredState(stateCode)}
                  onMouseLeave={() => setHoveredState(null)}
                  className="cursor-pointer transition-all duration-200 hover:opacity-100 hover:stroke-2"
                />
              ) : (
                <path
                  d={data.path}
                  fill="#f1f5f9"
                  stroke="#94a3b8"
                  strokeWidth="1"
                  opacity="0.6"
                />
              )}
            </g>
          ))}

          {/* Points view */}
          {viewMode === 'points' && Object.entries(stateData).map(([stateCode, data]) => {
            const intensity = getUsageIntensity(stateCode, selectedPlatform);
            const radius = Math.max(4, Math.min(20, intensity / 5));
            
            return (
              <g key={stateCode}>
                <circle
                  cx={data.x}
                  cy={data.y}
                  r={radius}
                  fill={getColor(stateCode, selectedPlatform)}
                  stroke="#374151"
                  strokeWidth="2"
                  opacity="0.8"
                  onMouseEnter={() => setHoveredState(stateCode)}
                  onMouseLeave={() => setHoveredState(null)}
                  className="cursor-pointer transition-all duration-200 hover:opacity-100"
                />
                <text
                  x={data.x}
                  y={data.y + 2}
                  textAnchor="middle"
                  className="text-xs font-bold fill-white pointer-events-none select-none"
                  style={{ fontSize: '10px' }}
                >
                  {stateCode}
                </text>
              </g>
            );
          })}

          {/* Heat map state labels */}
          {viewMode === 'heatmap' && Object.entries(stateData).map(([stateCode, data]) => (
            <text
              key={stateCode}
              x={data.x}
              y={data.y + 2}
              textAnchor="middle"
              className="text-xs font-bold fill-gray-800 pointer-events-none select-none"
              style={{ fontSize: '10px' }}
            >
              {stateCode}
            </text>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border">
          <h4 className="font-semibold text-sm text-gray-800 mb-2">
            {viewMode === 'points' ? 'Point Size = Usage Intensity' : 'Color Intensity = Usage Level'}
          </h4>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            {viewMode === 'points' ? (
              <>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Low</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span>High</span>
                </div>
              </>
            ) : (
              <>
                <div className="w-4 h-2 bg-gradient-to-r from-blue-200 to-red-500 rounded"></div>
                <span>Low → High Usage</span>
              </>
            )}
          </div>
        </div>

        {/* Tooltip */}
        {hoveredState && (
          <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border min-w-48">
            <h3 className="font-bold text-gray-800">{stateData[hoveredState]?.name}</h3>
            <div className="mt-2 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Usage Intensity:</span>
                <span className="font-semibold">
                  {getUsageIntensity(hoveredState, selectedPlatform).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Est. Users:</span>
                <span className="font-semibold">
                  {getStateUsers(hoveredState).toLocaleString()}K
                </span>
              </div>
              {selectedPlatform !== 'all' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform:</span>
                  <span className="font-semibold">
                    {platformData[selectedPlatform]?.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800">Total AI Users</h3>
          <p className="text-2xl font-bold text-blue-900">{totalUsers}M</p>
          <p className="text-sm text-blue-700">Estimated US population</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800">Leading Platform</h3>
          <p className="text-2xl font-bold text-green-900">ChatGPT</p>
          <p className="text-sm text-green-700">59.7% market share</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800">Fastest Growing</h3>
          <p className="text-2xl font-bold text-purple-900">Claude AI</p>
          <p className="text-sm text-purple-700">+14% growth rate</p>
        </div>
      </div>

      {/* Data Notes */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Data Sources & Methodology</h4>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <strong>Market Share Data:</strong> Based on First Page Sage research (April 2025) showing ChatGPT leading with 59.7% market share, followed by Microsoft Copilot (14.4%) and Google Gemini (13.5%).
          </p>
          <p>
            <strong>Regional Estimates:</strong> Usage intensity calculated using state-level factors including tech industry presence, educational attainment, urbanization rates, and historical technology adoption patterns.
          </p>
          <p>
            <strong>User Estimates:</strong> Based on ~23% of US adults (approximately 60 million people) reported using AI tools, distributed by state population and adoption multipliers.
          </p>
          <p className="text-xs text-gray-500 mt-3">
            Note: This visualization presents estimated usage patterns for educational purposes. Actual usage may vary. Data reflects approximate market conditions as of 2025.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIUsageMap;