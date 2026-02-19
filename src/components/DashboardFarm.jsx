import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Sprout, Droplets, Wind, Map, AlertCircle, Calendar, Thermometer, ChevronRight } from 'lucide-react';
import SatelliteMap from './SatelliteMap';

const DashboardFarm = ({ searchQuery = '' }) => {
    // Real-time Weather Data Integration
    const [weather, setWeather] = useState({ temp: '--', rain: '--', humidity: '--', wind: '--', condition: 'Loading...' });
    const [forecast, setForecast] = useState([]);
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
                // Using Open-Meteo API
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
        // Poll Weather API Every 15 Minutes
        const weatherInterval = setInterval(fetchWeather, 900000);
        return () => clearInterval(weatherInterval);
    }, []);

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
        { name: 'Wheat (Rabi)', stage: 'Vegetative', health: 'Excellent', progress: 65, harvest: 'Apr 2026', yield: '45 q/ac' },
        { name: 'Mustard', stage: 'Flowering', health: 'Good', progress: 40, harvest: 'Mar 2026', yield: '18 q/ac' },
        { name: 'Potato', stage: 'Planting', health: 'Excellent', progress: 15, harvest: 'Feb 2026', yield: '120 q/ac' },
    ];

    return (
        <div className="space-y-6">

            {/* 1. HERO MAIN CARD: Weather & Status */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl min-h-[200px] flex md:flex-row flex-col">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -ml-10 -mb-10 pointer-events-none"></div>

                {/* Left: Location & Main Temp */}
                <div className="p-8 flex flex-col justify-between w-full md:w-1/2 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-1 rounded-md bg-white/10 text-[10px] font-bold uppercase tracking-widest border border-white/10 flex items-center gap-2">
                                <Map size={12} /> {location.name}
                            </span>
                        </div>
                        <h2 className="text-5xl font-black tracking-tight mb-2">{loading ? '--' : weather.temp}</h2>
                        <p className="text-xl font-medium text-blue-200">{weather.condition}</p>
                    </div>
                </div>

                {/* Right: Weather Details Grid */}
                <div className="p-8 w-full md:w-1/2 bg-white/5 backdrop-blur-sm border-l border-white/5 flex flex-col justify-center">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white/5 rounded-2xl">
                            <div className="flex items-center gap-2 mb-1 text-slate-300">
                                <Wind size={16} /> <span className="text-xs font-bold uppercase">Wind Spd</span>
                            </div>
                            <p className="text-xl font-bold">{loading ? '--' : weather.wind}</p>
                        </div>
                        <div className="p-3 bg-white/5 rounded-2xl">
                            <div className="flex items-center gap-2 mb-1 text-slate-300">
                                <Droplets size={16} /> <span className="text-xs font-bold uppercase">Humidity</span>
                            </div>
                            <p className="text-xl font-bold">{loading ? '--' : weather.humidity}</p>
                        </div>
                        <div className="p-3 bg-white/5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                            <div className="flex items-center gap-2 mb-1 text-emerald-300">
                                <CloudRain size={16} /> <span className="text-xs font-bold uppercase">Rainfall</span>
                            </div>
                            <p className="text-xl font-bold text-emerald-400">{loading ? '--' : weather.rain}</p>
                        </div>
                        <div className="p-3 bg-white/5 rounded-2xl">
                            <div className="flex items-center gap-2 mb-1 text-slate-300">
                                <Thermometer size={16} /> <span className="text-xs font-bold uppercase">Feels Like</span>
                            </div>
                            <p className="text-xl font-bold">{loading ? '--' : weather.temp}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. PRIORITY ACTION CARD */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex items-start gap-4 shadow-sm">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-full shrink-0">
                    <AlertCircle size={24} />
                </div>
                <div>
                    <h4 className="text-amber-800 font-bold mb-1">Attention Required: Irrigation Alert</h4>
                    <p className="text-amber-700 text-sm mb-3">
                        Soil moisture levels in <strong>Wheat (Sector B)</strong> have dropped below 40%. Schedule irrigation within 24 hours to maintain yield consistency.
                    </p>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-amber-700 transition-colors">
                        Scheule Irrigation
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 3. CROP STATUS */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Sprout className="text-emerald-500" size={20} /> Crop Health
                        </h3>
                        <span className="text-xs font-bold text-emerald-600 cursor-pointer">View All</span>
                    </div>

                    <div className="space-y-4">
                        {crops.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((crop, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                                        {crop.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-700 text-sm">{crop.name}</h4>
                                        <p className="text-xs text-slate-400">{crop.stage}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded mb-1">{crop.health}</span>
                                    <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden ml-auto">
                                        <div className="h-full bg-emerald-500" style={{ width: `${crop.progress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. 5-DAY FORECAST COMPACT */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Calendar className="text-blue-500" size={20} /> Forecast
                    </h3>
                    <div className="space-y-3">
                        {loading ? (
                            <p className="text-slate-400 text-sm">Loading...</p>
                        ) : (
                            forecast.map((day, i) => (
                                <div key={i} className="flex justify-between items-center text-sm p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                    <span className="font-bold text-slate-600 w-12">{new Date(day.date).toLocaleDateString('en-IN', { weekday: 'short' })}</span>
                                    <div className="flex items-center gap-2 flex-1 justify-center text-slate-500">
                                        {day.code > 50 ? <CloudRain size={14} className="text-blue-400" /> : <Sun size={14} className="text-amber-400" />}
                                        <span className="text-xs">{getWeatherCondition(day.code)}</span>
                                    </div>
                                    <span className="font-black text-slate-800">{day.max}° <span className="text-slate-300 font-normal">/ {day.min}°</span></span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* 5. SATELLITE WIDGET - Live Map */}
            <SatelliteMap lat={location.lat} lon={location.lon} />

        </div>
    );
};

export default DashboardFarm;
