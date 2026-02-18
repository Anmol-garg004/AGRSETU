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
        <div className="flex flex-col gap-6 fade-in">
            {/* Satellite & Weather Validation */}
            <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="flex items-center gap-2 m-0 text-xl font-bold">
                        <BarChart2 className="text-emerald-600" size={24} />
                        Satellite Insights
                    </h3>
                    <span className="status-badge bg-emerald-50 text-emerald-600 text-xs px-3 py-1">Live View</span>
                </div>

                <div className="metrics-grid grid grid-cols-2 gap-8 lg-grid-cols-1">
                    <div className="space-y-6">
                        <div className="metric-group">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Leaf size={16} className="text-emerald-600" /> NDVI (Crop Health)
                                </span>
                                <span className="text-base font-black text-emerald-600">{(ndvi * 100).toFixed(0)}%</span>
                            </div>
                            <div className="metric-progress mb-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="metric-fill bg-emerald-600 h-full rounded-full transition-all duration-1000" style={{ width: `${ndvi * 100}%` }}></div>
                            </div>
                            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">High Vegetation Health Detected</p>
                        </div>

                        <div className="metric-group">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <CloudRain size={16} className="text-blue-600" /> Soil Moisture
                                </span>
                                <span className="text-base font-black text-blue-600">{soilMoisture.toFixed(0)}%</span>
                            </div>
                            <div className="metric-progress mb-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="metric-fill bg-blue-600 h-full rounded-full transition-all duration-1000" style={{ width: `${soilMoisture}%` }}></div>
                            </div>
                            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Optimal Hydration Level</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-2xl border flex flex-col justify-center">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Weather: Varanasi</h4>
                            <div className="flex items-center gap-2 text-amber-500">
                                <Sun size={24} />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {[
                                { label: 'Temp', value: weather.temp },
                                { label: 'Rain', value: weather.rain },
                                { label: 'Humid', value: weather.humidity }
                            ].map((w, idx) => (
                                <div key={idx} className="flex-1 bg-white p-3 rounded-xl border text-center shadow-sm">
                                    <span className="block text-[10px] text-slate-400 uppercase font-black mb-1">{w.label}</span>
                                    <span className="text-lg font-black text-slate-800">{w.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Crop Data Aggregation */}
            <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="m-0 text-xl font-bold">Active Crops</h3>
                    <button className="btn-premium py-2 px-4 text-xs font-bold rounded-xl shadow-lg hover:shadow-emerald-500/20">
                        + Log New
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 lg-grid-cols-1">
                    {crops.map((crop, idx) => (
                        <div key={idx} className="p-5 border rounded-2xl hover:border-emerald-200 transition-all group bg-slate-50/50 hover:bg-white hover:shadow-md">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="text-xl font-black text-slate-900 leading-none mb-2">{crop.name}</h4>
                                    <span className="status-badge bg-emerald-100 text-emerald-700 text-[10px] px-2.5 py-0.5 rounded-lg font-bold">{crop.health}</span>
                                </div>
                                <div className="text-right">
                                    <span className="block text-[10px] text-slate-400 uppercase font-black mb-1">Target Yield</span>
                                    <span className="text-base font-black text-slate-700">{crop.yield.split(' ')[0]} <span className="text-xs text-slate-400 font-bold">{crop.yield.split(' ').slice(1).join(' ')}</span></span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white p-2.5 rounded-xl border border-transparent shadow-sm group-hover:border-slate-100">
                                    <span className="block text-[10px] text-slate-400 uppercase font-black mb-0.5">Planted</span>
                                    <span className="text-sm font-bold text-slate-700">{crop.planted}</span>
                                </div>
                                <div className="bg-white p-2.5 rounded-xl border border-transparent shadow-sm group-hover:border-slate-100">
                                    <span className="block text-[10px] text-slate-400 uppercase font-black mb-0.5">Est. Harvest</span>
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
