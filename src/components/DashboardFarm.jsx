import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Leaf, BarChart2 } from 'lucide-react';

const DashboardFarm = () => {
    // Mock Weather and Satellite Data Logic
    const [weather, setWeather] = useState({ temp: '32°C', rain: '20%', humidity: '45%' });
    const [soilMoisture, setSoilMoisture] = useState(65);
    const [ndvi, setNdvi] = useState(0.78); // Normalized Difference Vegetation Index

    useEffect(() => {
        // Simulate real-time updates
        const interval = setInterval(() => {
            setSoilMoisture(prev => Math.max(30, Math.min(90, prev + (Math.random() - 0.5) * 5)));
            setNdvi(prev => Math.max(0.4, Math.min(0.95, prev + (Math.random() - 0.5) * 0.05)));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const crops = [
        { name: 'Wheat', planted: 'Oct 2025', harvest: 'Apr 2026', health: 'Excellent', yield: '45 quintal/ac' },
        { name: 'Mustard', planted: 'Nov 2025', harvest: 'Mar 2026', health: 'Good', yield: '18 quintal/ac' },
    ];

    return (
        <div className="grid grid-2">
            {/* Satellite & Weather Validation */}
            <div className="card">
                <h3>Satellite Validation</h3>
                <div className="satellite-grid">
                    <div className="metric-box">
                        <div className="icon-wrapper bg-green-100 text-green-700">
                            <Leaf size={24} />
                        </div>
                        <div className="metric-info">
                            <label>NDVI Score</label>
                            <span className="value">{ndvi.toFixed(2)}</span>
                            <span className="trend positive">High Vegetation Health</span>
                        </div>
                    </div>

                    <div className="metric-box">
                        <div className="icon-wrapper bg-blue-100 text-blue-700">
                            <CloudRain size={24} />
                        </div>
                        <div className="metric-info">
                            <label>Soil Moisture</label>
                            <span className="value">{soilMoisture.toFixed(0)}%</span>
                            <span className="trend neutral">Optimal Range</span>
                        </div>
                    </div>
                </div>

                <div className="weather-widget mt-6">
                    <div className="weather-header flex justify-between items-center mb-4">
                        <h4>Local Weather (Varanasi)</h4>
                        <Sun className="text-yellow-500 animate-spin-slow" size={28} />
                    </div>
                    <div className="weather-stats flex justify-between">
                        <div className="stat">
                            <span className="label">Temp</span>
                            <span className="val">{weather.temp}</span>
                        </div>
                        <div className="stat">
                            <span className="label">Rain Chance</span>
                            <span className="val">{weather.rain}</span>
                        </div>
                        <div className="stat">
                            <span className="label">Humidity</span>
                            <span className="val">{weather.humidity}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Crop Data Aggregation */}
            <div className="card">
                <div className="flex justify-between items-center mb-6">
                    <h3>Active Crops</h3>
                    <button className="btn-sm btn-outline">+ Add Crop</button>
                </div>

                <div className="crop-list">
                    {crops.map((crop, idx) => (
                        <div key={idx} className="crop-item p-4 border rounded-lg mb-4 hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-lg font-semibold">{crop.name}</h4>
                                <span className={`badge ${crop.health === 'Excellent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {crop.health}
                                </span>
                            </div>
                            <div className="grid grid-2 text-sm text-gray-600">
                                <div>Planted: {crop.planted}</div>
                                <div>Est. Harvest: {crop.harvest}</div>
                                <div className="col-span-2 mt-2 font-medium text-gray-800">
                                    Projected Yield: {crop.yield}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardFarm;
