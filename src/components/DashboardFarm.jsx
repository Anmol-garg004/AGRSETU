import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Leaf, BarChart2, Sprout, Droplets, Wind, ArrowUpRight, Map, AlertCircle } from 'lucide-react';

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
        <div className="flex flex-col lg:flex-row gap-6 fade-in items-start">

            {/* Left Column: Main Operations (Crops & Weather) */}
            <div className="flex-1 w-full flex flex-col gap-6">

                {/* Active Crops List - Professional Table View */}
                <div className="card p-0 overflow-hidden border-0 shadow-sm bg-white">
                    <div className="p-6 border-b flex justify-between items-center bg-white">
                        <h3 className="m-0 text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Sprout size={20} className="text-emerald-600" /> Active Crops
                        </h3>
                        <button className="text-xs font-bold text-emerald-600 border border-emerald-200 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors flex items-center gap-1">
                            + Log Crop
                        </button>
                    </div>

                    <div className="bg-white">
                        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <div className="col-span-4">Crop Name</div>
                            <div className="col-span-3">Stage</div>
                            <div className="col-span-3">Health</div>
                            <div className="col-span-2 text-right">Yield</div>
                        </div>

                        <div className="divide-y">
                            {crops.map((crop, idx) => (
                                <div key={idx} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="col-span-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 font-bold">
                                            {crop.name[0]}
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
                    </div>

                    <button className="w-full py-3 text-xs font-bold text-slate-500 hover:bg-slate-50 border-t transition-colors flex items-center justify-center gap-1">
                        View All History <ArrowUpRight size={14} />
                    </button>
                </div>

                {/* Quick Weather Row */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="card p-4 flex items-center gap-3 bg-white border-0 shadow-sm">
                        <div className="p-2 bg-amber-50 text-amber-500 rounded-lg"><Sun size={20} /></div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Temp</p>
                            <p className="text-sm font-black text-slate-800">{weather.temp}</p>
                        </div>
                    </div>
                    <div className="card p-4 flex items-center gap-3 bg-white border-0 shadow-sm">
                        <div className="p-2 bg-blue-50 text-blue-500 rounded-lg"><CloudRain size={20} /></div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Precip</p>
                            <p className="text-sm font-black text-slate-800">{weather.rain}</p>
                        </div>
                    </div>
                    <div className="card p-4 flex items-center gap-3 bg-white border-0 shadow-sm">
                        <div className="p-2 bg-slate-100 text-slate-500 rounded-lg"><Wind size={20} /></div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Wind</p>
                            <p className="text-sm font-black text-slate-800">{weather.wind}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Satellite & Advisory Panel */}
            <div className="w-full lg:w-96 flex flex-col gap-6">

                {/* Satellite Map Card */}
                <div className="card p-0 border-0 shadow-sm bg-white overflow-hidden">
                    <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                        <h4 className="text-xs font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
                            <Map size={14} /> Satellite View
                        </h4>
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                    </div>

                    {/* Fixed Height Map Container */}
                    <div className="h-48 w-full bg-slate-100 relative group cursor-pointer">
                        {/* Placeholder Image */}
                        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/82.9739,25.3176,13,0/600x320?access_token=pk.eyJ1IjoidGVtcCIsImEiOiJjbHExcCJ9')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>

                        {/* Overlay with details */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4">
                            <p className="text-white font-bold text-sm leading-none mb-1">Village Rampur</p>
                            <p className="text-emerald-300 text-[10px] font-black uppercase tracking-wider">Latest Pass: 2h ago</p>
                        </div>
                    </div>

                    <div className="p-4 bg-white grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">NDVI</p>
                            <div className="text-xl font-black text-emerald-600 flex items-center justify-center gap-1">
                                <Leaf size={14} /> {ndvi.toFixed(2)}
                            </div>
                        </div>
                        <div className="text-center border-l">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Moisture</p>
                            <div className="text-xl font-black text-blue-600 flex items-center justify-center gap-1">
                                <Droplets size={14} /> {soilMoisture.toFixed(0)}%
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advisory Card */}
                <div className="card p-5 border-l-4 border-l-amber-500 bg-amber-50/50 border-0 shadow-sm">
                    <div className="flex items-start gap-3">
                        <AlertCircle size={20} className="text-amber-500 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="text-sm font-bold text-slate-800 mb-1">Today's Priority</h4>
                            <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                Irrigate Wheat field (Sector B). Top-dress Urea due to expected rain in 2 days.
                            </p>
                            <button className="text-[10px] font-black text-amber-600 uppercase tracking-widest hover:underline">Mark Complete</button>
                        </div>
                    </div>
                </div>

                {/* Forecast List */}
                <div className="card p-4 border-0 shadow-sm bg-white">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">5-Day Forecast</h4>
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">{i === 0 ? 'Today' : `Feb ${19 + i}`}</span>
                                <div className="flex items-center gap-2">
                                    <Sun size={14} className="text-amber-500" />
                                    <span className="font-bold text-slate-700">{32 - i}°C</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardFarm;
