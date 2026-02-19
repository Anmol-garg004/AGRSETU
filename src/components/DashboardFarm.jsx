import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Leaf, BarChart2, Sprout, Droplets, Wind, ArrowUpRight, Map, AlertCircle, CheckCircle, Smartphone, Calendar, Thermometer } from 'lucide-react';

const DashboardFarm = () => {
    // Real-time Weather Data Integration
    const [weather, setWeather] = useState({ temp: '--', rain: '--', humidity: '--', wind: '--', condition: 'Loading...' });
    const [forecast, setForecast] = useState([]);
    const [soilMoisture, setSoilMoisture] = useState(65);
    const [ndvi, setNdvi] = useState(0.78);
    const [loading, setLoading] = useState(true);

    // LOCKED LOCATION: KR Mangalam University, Sohna, Gurgaon
    const location = {
        lat: 28.2711,
        lon: 77.0678,
        name: "KR Mangalam Univ, Sohna"
    };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Using Open-Meteo API (Free, No Key Required)
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,precipitation,rain,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
                );
                const data = await response.json();

                // Current Weather
                const current = data.current;
                setWeather({
                    temp: `${current.temperature_2m}°`,
                    rain: `${current.precipitation || 0}mm`,
                    humidity: `${current.relative_humidity_2m}%`,
                    wind: `${current.wind_speed_10m} km/h`,
                    condition: getWeatherCondition(current.weather_code)
                });

                // 5-Day Forecast
                const daily = data.daily;
                const newForecast = daily.time.slice(0, 5).map((date, i) => ({
                    date: date,
                    max: daily.temperature_2m_max[i],
                    min: daily.temperature_2m_min[i],
                    code: daily.weather_code[i]
                }));
                setForecast(newForecast);
                setLoading(false);

            } catch (error) {
                console.error("Weather fetch failed:", error);
                setWeather({ temp: '32°', rain: '20%', humidity: '45%', wind: '12km/h', condition: 'Sunny' });
                setLoading(false);
            }
        };

        fetchWeather();

        // 1. Poll Weather API Every 15 Minutes (Real-Time Updates without Refresh)
        const weatherInterval = setInterval(fetchWeather, 900000);

        // 2. Simulate Real-Time Sensor Updates (Soil/NDVI)
        const sensorInterval = setInterval(() => {
            setSoilMoisture(prev => Math.max(30, Math.min(90, prev + (Math.random() - 0.5) * 5)));
            setNdvi(prev => Math.max(0.4, Math.min(0.95, prev + (Math.random() - 0.5) * 0.05)));
        }, 5000);

        return () => {
            clearInterval(weatherInterval);
            clearInterval(sensorInterval);
        };
    }, []);

    // Helper: WMO Weather Code to String
    const getWeatherCondition = (code) => {
        if (code === 0) return 'Clear Sky';
        if (code >= 1 && code <= 3) return 'Partly Cloudy';
        if (code >= 45 && code <= 48) return 'Foggy';
        if (code >= 51 && code <= 67) return 'Rainy';
        if (code >= 71 && code <= 77) return 'Snowy';
        if (code >= 95) return 'Thunderstorm';
        return 'Unknown';
    };

    const crops = [
        { name: 'Wheat (Rabi)', stage: 'Vegetative', health: 'Excellent', progress: 65, harvest: 'Apr 2026', yield: '45 q/ac', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=300&h=200' },
        { name: 'Mustard', stage: 'Flowering', health: 'Good', progress: 40, harvest: 'Mar 2026', yield: '18 q/ac', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=300&h=200' },
        { name: 'Potato', stage: 'Planting', health: 'Excellent', progress: 15, harvest: 'Feb 2026', yield: '120 q/ac', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=300&h=200' },
    ];

    return (
        <div className="fade-in pb-10">
            {/* Header / Welcome Section */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Farm Overview</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">Real-time insights for your land in <span className="text-emerald-600 font-bold">{location.name}</span></p>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Live Monitoring Active</span>
                </div>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-12 gap-6">

                {/* LEFT COLUMN: HERO WEATHER & CROPS (8 cols) */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">

                    {/* 1. HERO WEATHER CARD */}
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl min-h-[220px] flex flex-col justify-between p-8">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl"></div>

                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Map size={16} className="opacity-80" />
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">{location.name}</span>
                                </div>
                                <h2 className="text-5xl font-black tracking-tighter mb-1">{location.name.split(',')[0]}</h2>
                                <p className="text-lg font-medium opacity-90">{weather.condition}</p>
                            </div>
                            <div className="text-right">
                                <h3 className="text-6xl font-black tracking-tighter">{loading ? '--' : weather.temp}</h3>
                                <div className="flex items-center justify-end gap-2 text-sm font-bold opacity-80 mt-1">
                                    <Thermometer size={16} /> Feels like {loading ? '--' : weather.temp}
                                </div>
                            </div>
                        </div>

                        {/* Weather Details Grid */}
                        <div className="relative z-10 grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"><Wind size={20} /></div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Wind</p>
                                    <p className="text-lg font-bold">{loading ? '--' : weather.wind}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"><Droplets size={20} /></div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Humidity</p>
                                    <p className="text-lg font-bold">{loading ? '--' : weather.humidity}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"><CloudRain size={20} /></div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Rain</p>
                                    <p className="text-lg font-bold">{loading ? '--' : weather.rain}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. CROP STATUS CARDS */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                <Sprout size={20} className="text-emerald-600" /> Active Crops
                            </h3>
                            <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">View All History →</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {crops.map((crop, idx) => (
                                <div key={idx} className="group bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Leaf size={60} className="text-emerald-600" />
                                    </div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm">
                                            <img src={crop.image} alt={crop.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">{crop.name}</h4>
                                            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{crop.stage}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="font-bold text-slate-500">Growth</span>
                                                <span className="font-black text-emerald-600">{crop.progress}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${crop.progress}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                                            <div className="text-center">
                                                <p className="text-[10px] text-slate-400 uppercase font-bold">Health</p>
                                                <p className="text-xs font-black text-emerald-600 flex items-center gap-1"><CheckCircle size={10} /> {crop.health}</p>
                                            </div>
                                            <div className="text-center border-l pl-4">
                                                <p className="text-[10px] text-slate-400 uppercase font-bold">Yield</p>
                                                <p className="text-xs font-black text-slate-800">{crop.yield}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: SATELLITE & FORECAST (4 cols) */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">

                    {/* 3. SATELLITE CARD - COMPACT & HIGH TECH */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-4 border-b border-slate-50 flex justify-between items-center">
                            <h4 className="text-xs font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
                                <Map size={14} /> Satellite Pulse
                            </h4>
                            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-100">Live</span>
                        </div>
                        <div className="relative h-48 bg-slate-900 group cursor-pointer">
                            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/82.9739,25.3176,13,0/600x320?access_token=pk.eyJ1IjoidGVtcCIsImEiOiJjbHExcCJ9')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 hover:opacity-100"></div>

                            {/* HUD Overlay */}
                            <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
                                <div className="flex justify-between">
                                    <div className="bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                                        LAT: {location.lat.toFixed(4)}
                                    </div>
                                    <div className="bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                                        LON: {location.lon.toFixed(4)}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="inline-flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-dashed border-emerald-500/50 bg-black/30 backdrop-blur-sm">
                                        <Leaf size={20} className="text-emerald-400 mb-1" />
                                        <span className="text-xs font-black text-white">{ndvi.toFixed(2)}</span>
                                        <span className="text-[8px] font-bold text-emerald-400 uppercase">NDVI</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 text-center divide-x border-t border-slate-50">
                            <div className="p-3 hover:bg-slate-50 transition-colors">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Moisture</p>
                                <p className="text-lg font-black text-blue-600">{soilMoisture.toFixed(0)}%</p>
                            </div>
                            <div className="p-3 hover:bg-slate-50 transition-colors">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Health</p>
                                <p className="text-lg font-black text-emerald-500">Good</p>
                            </div>
                        </div>
                    </div>

                    {/* 4. ADVISORY CARD */}
                    <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 shadow-sm relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 text-amber-100"><AlertCircle size={80} /></div>
                        <h4 className="relative z-10 text-xs font-black text-amber-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <AlertCircle size={14} /> Priority Action
                        </h4>
                        <p className="relative z-10 text-sm text-slate-700 font-medium leading-relaxed mb-4">
                            Irrigation required for <strong>Wheat (Sector B)</strong>. Top-dress Urea due to expected rain in 48h.
                        </p>
                        <button className="relative z-10 w-full py-2 bg-white text-amber-600 text-xs font-bold rounded-lg border border-amber-200 hover:bg-amber-100 transition-colors shadow-sm">
                            Mark as Complete
                        </button>
                    </div>

                    {/* 5. 5-DAY FORECAST */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Calendar size={14} /> 5-Day Forecast
                        </h4>
                        <div className="space-y-4">
                            {loading ? (
                                <div className="text-center py-6 text-slate-400 text-sm">Loading weather data...</div>
                            ) : (
                                forecast.map((day, i) => (
                                    <div key={i} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3 w-1/3">
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                                {day.code > 50 ? <CloudRain size={16} /> : <Sun size={16} />}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-700">{new Date(day.date).toLocaleDateString('en-IN', { weekday: 'short' })}</p>
                                                <p className="text-[10px] text-slate-400 leading-none">{new Date(day.date).getDate()}</p>
                                            </div>
                                        </div>

                                        <div className="w-1/3 text-center">
                                            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded group-hover:bg-slate-200 transition-colors">
                                                {getWeatherCondition(day.code)}
                                            </span>
                                        </div>

                                        <div className="w-1/3 text-right">
                                            <span className="text-sm font-black text-slate-800">{day.max}°</span>
                                            <span className="text-xs font-medium text-slate-400 ml-1">{day.min}°</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardFarm;
