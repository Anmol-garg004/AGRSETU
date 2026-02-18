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
        <div className="grid grid-cols-2 gap-5 lg-grid-cols-1 fade-in">
            {/* Satellite & Weather Validation */}
            <div className="card p-5">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="flex items-center gap-2 m-0 text-lg font-bold">
                        <BarChart2 className="text-emerald-600" size={20} />
                        Satellite Insights
                    </h3>
                    <span className="status-badge bg-emerald-50 text-emerald-600 text-[10px] px-2 py-1">Live View</span>
                </div>

                <div className="space-y-6">
                    <div className="metric-group">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                                <Leaf size={14} className="text-emerald-600" /> NDVI (Crop Health)
                            </span>
                            <span className="text-sm font-black text-emerald-600">{(ndvi * 100).toFixed(0)}%</span>
                        </div>
                        <div className="metric-progress mb-1">
                            <div className="metric-fill bg-emerald-600" style={{ width: `${ndvi * 100}%` }}></div>
                        </div>
                        <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">High Vegetation Health Detected</p>
                    </div>

                    <div className="metric-group">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                                <CloudRain size={14} className="text-blue-600" /> Soil Moisture
                            </span>
                            <span className="text-sm font-black text-blue-600">{soilMoisture.toFixed(0)}%</span>
                        </div>
                        <div className="metric-progress mb-1">
                            <div className="metric-fill bg-blue-600" style={{ width: `${soilMoisture}%` }}></div>
                        </div>
                        <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Optimal Hydration Level</p>
                    </div>
                </div>

                <div className="mt-6 bg-slate-50 p-4 rounded-xl border">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Weather: Varanasi</h4>
                        <div className="flex items-center gap-2 text-amber-500">
                            <Sun size={20} />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {[
                            { label: 'Temp', value: weather.temp },
                            { label: 'Rain', value: weather.rain },
                            { label: 'Humid', value: weather.humidity }
                        ].map((w, idx) => (
                            <div key={idx} className="flex-1 bg-white p-2 rounded-lg border text-center shadow-sm">
                                <span className="block text-[9px] text-slate-400 uppercase font-black mb-0.5">{w.label}</span>
                                <span className="text-sm font-black text-slate-800">{w.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Crop Data Aggregation */}
            <div className="card p-5">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="m-0 text-lg font-bold">Active Crops</h3>
                    <button className="btn-premium py-1.5 px-3 text-[10px]">
                        + Log New
                    </button>
                </div>

                <div className="space-y-3">
                    {crops.map((crop, idx) => (
                        <div key={idx} className="p-4 border rounded-xl hover:border-emerald-200 transition-all group bg-slate-50/50">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="text-lg font-black text-slate-900 leading-none mb-1.5">{crop.name}</h4>
                                    <span className="status-badge bg-emerald-50 text-emerald-600 text-[10px] px-2">{crop.health}</span>
                                </div>
                                <div className="text-right">
                                    <span className="block text-[9px] text-slate-400 uppercase font-black mb-0.5">Target Yield</span>
                                    <span className="text-sm font-black text-slate-700">{crop.yield.split(' ')[0]} <span className="text-[10px] text-slate-400 font-bold">{crop.yield.split(' ').slice(1).join(' ')}</span></span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white p-2 rounded-lg border border-transparent shadow-sm">
                                    <span className="block text-[9px] text-slate-400 uppercase font-black mb-0.5">Planted</span>
                                    <span className="text-xs font-bold text-slate-700">{crop.planted}</span>
                                </div>
                                <div className="bg-white p-2 rounded-lg border border-transparent shadow-sm">
                                    <span className="block text-[9px] text-slate-400 uppercase font-black mb-0.5">Est. Harvest</span>
                                    <span className="text-xs font-bold text-slate-700">{crop.harvest}</span>
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
