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
        <div className="grid grid-2 gap-6 fade-in">
            {/* Satellite & Weather Validation */}
            <div className="card shadow-sm border-0">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="m-0"><BarChart2 className="text-emerald-600" size={20} /> Satellite Insights</h3>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-wider">Live View</span>
                </div>

                <div className="satellite-metrics mb-8">
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Leaf size={16} className="text-emerald-500" /> NDVI (Crop Health)
                            </span>
                            <span className="text-sm font-bold text-emerald-600">{(ndvi * 100).toFixed(0)}%</span>
                        </div>
                        <div className="metric-progress">
                            <div className="progress-fill bg-emerald-500" style={{ width: `${ndvi * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-emerald-600 font-medium">High Vegetation Health Detected</p>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <CloudRain size={16} className="text-blue-500" /> Soil Moisture
                            </span>
                            <span className="text-sm font-bold text-blue-600">{soilMoisture.toFixed(0)}%</span>
                        </div>
                        <div className="metric-progress">
                            <div className="progress-fill bg-blue-500" style={{ width: `${soilMoisture}%` }}></div>
                        </div>
                        <p className="text-xs text-blue-600 font-medium">Optimal Hydration Level</p>
                    </div>
                </div>

                <div className="weather-stats-premium mt-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Weather: Varanasi</h4>
                        <div className="flex items-center gap-2 text-amber-500">
                            <Sun className="animate-spin-slow" size={24} />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="weather-badge flex-1">
                            <span className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Temp</span>
                            <span className="text-lg font-bold text-slate-800">{weather.temp}</span>
                        </div>
                        <div className="weather-badge flex-1">
                            <span className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Rain</span>
                            <span className="text-lg font-bold text-slate-800">{weather.rain}</span>
                        </div>
                        <div className="weather-badge flex-1">
                            <span className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Humid</span>
                            <span className="text-lg font-bold text-slate-800">{weather.humidity}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Crop Data Aggregation */}
            <div className="card shadow-sm border-0">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="m-0">Active Crops</h3>
                    <button className="btn-sm bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors">
                        + Log New
                    </button>
                </div>

                <div className="crop-list-container">
                    {crops.map((crop, idx) => (
                        <div key={idx} className="crop-card-premium p-5 border rounded-xl mb-4 hover:shadow-md transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 leading-tight">{crop.name}</h4>
                                    <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded uppercase">{crop.health} Health</span>
                                </div>
                                <div className="text-right">
                                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Planned Yield</span>
                                    <span className="text-sm font-bold text-slate-700">{crop.yield}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-lg">
                                    <span className="block text-[9px] text-slate-400 uppercase font-bold mb-0.5">Planted</span>
                                    <span className="text-sm font-semibold text-slate-700">{crop.planted}</span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-lg">
                                    <span className="block text-[9px] text-slate-400 uppercase font-bold mb-0.5">Est. Harvest</span>
                                    <span className="text-sm font-semibold text-slate-700">{crop.harvest}</span>
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
