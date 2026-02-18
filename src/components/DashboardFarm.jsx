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
        <div className="grid grid-cols-2 gap-8 lg-grid-cols-1 fade-in">
            {/* Satellite & Weather Validation */}
            <div className="card p-8">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="flex items-center gap-2 m-0 text-xl font-bold">
                        <BarChart2 className="text-emerald-600" size={24} />
                        Satellite Insights
                    </h3>
                    <span className="status-badge bg-emerald-50 text-emerald-600">Live View</span>
                </div>

                <div className="space-y-8">
                    <div className="metric-group">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Leaf size={16} className="text-emerald-600" /> NDVI (Crop Health)
                            </span>
                            <span className="text-sm font-black text-emerald-600">{(ndvi * 100).toFixed(0)}%</span>
                        </div>
                        <div className="metric-progress mb-2">
                            <div className="metric-fill bg-emerald-600" style={{ width: `${ndvi * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">High Vegetation Health Detected</p>
                    </div>

                    <div className="metric-group">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <CloudRain size={16} className="text-blue-600" /> Soil Moisture
                            </span>
                            <span className="text-sm font-black text-blue-600">{soilMoisture.toFixed(0)}%</span>
                        </div>
                        <div className="metric-progress mb-2">
                            <div className="metric-fill bg-blue-600" style={{ width: `${soilMoisture}%` }}></div>
                        </div>
                        <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Optimal Hydration Level</p>
                    </div>
                </div>

                <div className="mt-10 bg-slate-50 p-6 rounded-2xl border">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Weather: Varanasi</h4>
                        <div className="flex items-center gap-2 text-amber-500">
                            <Sun size={24} />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        {[
                            { label: 'Temp', value: weather.temp },
                            { label: 'Rain', value: weather.rain },
                            { label: 'Humid', value: weather.humidity }
                        ].map((w, idx) => (
                            <div key={idx} className="flex-1 bg-white p-3 rounded-xl border text-center">
                                <span className="block text-[10px] text-slate-400 uppercase font-black mb-1">{w.label}</span>
                                <span className="text-base font-black text-slate-800">{w.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Crop Data Aggregation */}
            <div className="card p-8">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="m-0 text-xl font-bold">Active Crops</h3>
                    <button className="btn-premium py-2 px-4 text-xs">
                        + Log New
                    </button>
                </div>

                <div className="space-y-4">
                    {crops.map((crop, idx) => (
                        <div key={idx} className="p-6 border rounded-2xl hover:border-emerald-200 transition-all group">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h4 className="text-xl font-black text-slate-900 leading-none mb-2">{crop.name}</h4>
                                    <span className="status-badge bg-emerald-50 text-emerald-600">{crop.health}</span>
                                </div>
                                <div className="text-right">
                                    <span className="block text-[10px] text-slate-400 uppercase font-black mb-1">Target Yield</span>
                                    <span className="text-sm font-black text-slate-700">{crop.yield.split(' ')[0]} <span className="text-xs text-slate-400">{crop.yield.split(' ').slice(1).join(' ')}</span></span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-xl border border-transparent group-hover:bg-white group-hover:border-slate-100 transition-all">
                                    <span className="block text-[10px] text-slate-400 uppercase font-black mb-1">Planted</span>
                                    <span className="text-sm font-bold text-slate-700">{crop.planted}</span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-transparent group-hover:bg-white group-hover:border-slate-100 transition-all">
                                    <span className="block text-[10px] text-slate-400 uppercase font-black mb-1">Est. Harvest</span>
                                    <span className="text-sm font-bold text-slate-700">{crop.harvest}</span>
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
