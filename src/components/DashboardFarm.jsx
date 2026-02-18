import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Leaf, BarChart2, Sprout, Droplets, Wind, ArrowUpRight } from 'lucide-react';

const DashboardFarm = () => {
    // Mock Weather and Satellite Data Logic
    const [weather, setWeather] = useState({ temp: '32°C', rain: '20%', humidity: '45%', wind: '12km/h' });
    const [soilMoisture, setSoilMoisture] = useState(65);
    const [ndvi, setNdvi] = useState(0.78);

    useEffect(() => {
        const interval = setInterval(() => {
            setSoilMoisture(prev => Math.max(30, Math.min(90, prev + (Math.random() - 0.5) * 5)));
            setNdvi(prev => Math.max(0.4, Math.min(0.95, prev + (Math.random() - 0.5) * 0.05)));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const crops = [
        { name: 'Wheat (Rabi)', stage: 'Vegetative', health: 'Excellent', progress: 65, harvest: 'Apr 2026', yield: '45 q/ac' },
        { name: 'Mustard', stage: 'Flowering', health: 'Good', progress: 40, harvest: 'Mar 2026', yield: '18 q/ac' },
        { name: 'Potato', stage: 'Planting', health: 'Excellent', progress: 15, harvest: 'Feb 2026', yield: '120 q/ac' },
    ];

    return (
        <div className="flex flex-col gap-6 fade-in">
            {/* Satellite & Environment Card */}
            <div className="card p-0 overflow-hidden border-0 shadow-sm">
                <div className="p-6 border-b flex justify-between items-center bg-white">
                    <h3 className="flex items-center gap-2 m-0 text-lg font-bold text-slate-800">
                        <BarChart2 className="text-emerald-600" size={20} />
                        Farm Pulse & Satellite Data
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Feed</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-1 divide-x md:divide-x-0 md:divide-y">
                    {/* NDVI Section */}
                    <div className="p-6 bg-slate-50/50">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Vegetation Index (NDVI)</p>
                                <h4 className="text-3xl font-black text-emerald-600">{(ndvi).toFixed(2)}</h4>
                            </div>
                            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                                <Leaf size={20} />
                            </div>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                            <div className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${ndvi * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                            <span className="text-emerald-600 font-bold">Healthy Growth</span> • No stress detected
                        </p>
                    </div>

                    {/* Soil & Weather Section */}
                    <div className="p-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Soil Moisture</p>
                                <div className="flex items-end gap-2">
                                    <h4 className="text-2xl font-black text-blue-600">{soilMoisture.toFixed(0)}%</h4>
                                    <span className="text-xs text-slate-400 font-bold mb-1">Volumetric</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Varanasi Weather</p>
                                <div className="flex items-center gap-3">
                                    <Sun size={24} className="text-amber-500" />
                                    <div>
                                        <span className="block text-lg font-black text-slate-800 leading-none">{weather.temp}</span>
                                        <span className="text-[10px] text-slate-400 font-bold">{weather.rain} Rain</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Crops List - Professional Table View */}
            <div className="card p-0 overflow-hidden border-0 shadow-sm">
                <div className="p-6 border-b flex justify-between items-center bg-white">
                    <h3 className="m-0 text-lg font-bold text-slate-800">Active Crops</h3>
                    <button className="text-xs font-bold text-emerald-600 border border-emerald-200 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors flex items-center gap-1">
                        + Log Crop
                    </button>
                </div>

                <div className="bg-white">
                    {/* List Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="col-span-4">Crop Name</div>
                        <div className="col-span-3">Stage</div>
                        <div className="col-span-3">Health</div>
                        <div className="col-span-2 text-right">Yield</div>
                    </div>

                    {/* List Body */}
                    <div className="divide-y">
                        {crops.map((crop, idx) => (
                            <div key={idx} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="col-span-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                                        <Sprout size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800 leading-tight">{crop.name}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">Harv: {crop.harvest}</p>
                                    </div>
                                </div>

                                <div className="col-span-3">
                                    <span className="inline-block px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                                        {crop.stage}
                                    </span>
                                </div>

                                <div className="col-span-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${crop.progress}%` }}></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-emerald-600">{crop.health}</span>
                                    </div>
                                </div>

                                <div className="col-span-2 text-right">
                                    <span className="text-sm font-black text-slate-700">{crop.yield}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-3 text-xs font-bold text-slate-500 hover:bg-slate-50 border-t transition-colors flex items-center justify-center gap-1">
                        View All History <ArrowUpRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardFarm;
