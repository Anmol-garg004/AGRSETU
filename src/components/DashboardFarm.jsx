import React, { useState, useEffect } from 'react';
import {
    CloudRain,
    Sun,
    Sprout,
    Droplets,
    Wind,
    AlertCircle,
    Calendar,
    Thermometer,
    Satellite,
    MapPin
} from 'lucide-react';

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
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,precipitation,rain,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
                );
                const data = await response.json();

                const current = data.current;
                setWeather({
                    temp: `${current.temperature_2m}°`,
                    rain: `${current.precipitation || 0}mm`,
                    humidity: `${current.relative_humidity_2m}%`,
                    wind: `${current.wind_speed_10m} km/h`,
                    condition: getWeatherCondition(current.weather_code)
                });

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
        <div className="space-y-12 animate-in fade-in duration-700 pb-28">

            {/* 1. TOP HERO: PROFESSIONAL SATELLITE FEED - FULL LANDING EXPERIENCE */}
            <div className="relative group overflow-hidden rounded-[3rem] bg-slate-950 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-slate-800 h-[650px] w-full">
                <iframe
                    src="https://agrsetumap.vercel.app/"
                    className="absolute inset-0 w-full h-full border-0 opacity-85 group-hover:opacity-100 transition-opacity duration-1000 scale-[1.01]"
                    title="Live Satellite Map"
                    loading="lazy"
                />

                {/* Visual Gradient for better text readability */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none"></div>
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none"></div>

                {/* Overlay UI - Top Left Labels */}
                <div className="absolute top-10 left-10 z-20 flex flex-col gap-3">
                    <div className="flex items-center gap-3 bg-emerald-500 text-white px-4 py-2 rounded-2xl shadow-lg shadow-emerald-500/20 w-fit">
                        <div className="relative flex items-center justify-center">
                            <Satellite className="animate-spin-slow" size={18} />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">Live Satellite Interface</span>
                    </div>

                    <div className="bg-slate-950/80 backdrop-blur-2xl border border-white/10 p-6 rounded-[2rem] w-[300px] shadow-2xl transform transition-transform group-hover:scale-105 duration-500">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-1.5 h-10 bg-emerald-500 rounded-full"></div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Land Asset</p>
                                <h2 className="text-2xl font-black text-white tracking-tight">Sohna Sector 12</h2>
                            </div>
                        </div>
                        <p className="text-xs font-bold text-slate-300 flex items-center gap-2 leading-relaxed">
                            <MapPin size={14} className="text-emerald-400" /> KR Mangalam University Grounds, Haryana, India
                        </p>
                    </div>
                </div>

                {/* Bottom Stats Grid */}
                <div className="absolute bottom-10 inset-x-10 z-20 flex justify-between items-end">
                    <div className="flex gap-4">
                        <div className="bg-slate-950/80 backdrop-blur-2xl border border-white/10 p-5 rounded-3xl min-w-[160px] shadow-2xl">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 text-center">Calculated Coverage</p>
                            <p className="text-3xl font-black text-white leading-none text-center">28.43 <span className="text-xs font-bold text-slate-500">AC</span></p>
                        </div>
                        <div className="bg-slate-950/80 backdrop-blur-2xl border border-white/10 p-5 rounded-3xl min-w-[160px] shadow-2xl">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 text-center">NDVI Health Index</p>
                            <p className="text-3xl font-black text-emerald-400 leading-none text-center">84.2<span className="text-xs font-bold text-emerald-700">%</span></p>
                        </div>
                    </div>

                    {/* Scroll Hint */}
                    <div className="hidden lg:flex flex-col items-center gap-2 text-white/40">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em]">Insights Below</span>
                        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
                    </div>
                </div>
            </div>

            {/* 2. DYNAMIC WEATHER & ALERTS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Weather Hub (Left 5 Columns) */}
                <div className="lg:col-span-5 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm relative overflow-hidden flex flex-col justify-between group">
                    <div className="relative z-10 flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                                <CloudRain className="text-blue-500" /> Climate Engine
                            </h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time Telemetry</p>
                        </div>
                        <div className="text-right">
                            <span className="text-5xl font-black text-slate-900 tracking-tighter tabular-nums">{loading ? '--' : weather.temp}</span>
                            <p className="text-sm font-black text-blue-500 uppercase tracking-wide">{weather.condition}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <WeatherStat icon={Wind} label="Wind Speed" value={weather.wind} color="text-slate-600" />
                        <WeatherStat icon={Droplets} label="Humidity" value={weather.humidity} color="text-slate-600" />
                        <WeatherStat icon={CloudRain} label="Precipitation" value={weather.rain} color="text-emerald-600" />
                        <WeatherStat icon={Thermometer} label="Heat Index" value={weather.temp} color="text-amber-600" />
                    </div>
                </div>

                {/* Priority Alerts (Remaining 7 Columns) */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="bg-amber-50 group border border-amber-100 p-6 rounded-[2rem] flex items-center gap-6 relative overflow-hidden">
                        <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                            <AlertCircle size={32} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="bg-amber-200 text-amber-800 text-[10px] font-black uppercase px-2 py-0.5 rounded">High Priority</span>
                                <h4 className="text-lg font-black text-amber-900 tracking-tight leading-none">Irrigation Alert</h4>
                            </div>
                            <p className="text-amber-800/80 text-sm font-medium leading-snug">
                                Sector 12-B Wheat plots are showing <strong>38% moisture levels</strong>. Automated scheduling is recommended within 12 hours.
                            </p>
                        </div>
                        <button className="bg-amber-900 text-amber-50 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black transition-colors shadow-lg active:scale-95">
                            Automate
                        </button>
                    </div>

                    <div className="bg-white border border-slate-100 p-6 rounded-[2rem] flex items-center gap-6 shadow-sm">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                            <Sun size={32} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg font-black text-slate-900 tracking-tight leading-none mb-1">Harvest Window</h4>
                            <p className="text-slate-500 text-sm font-medium leading-snug">
                                Ideal atmospheric conditions predicted for <strong>Mustard harvest</strong> starting Tuesday, March 14th.
                            </p>
                        </div>
                        <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 py-2 border rounded-xl hover:bg-slate-50">Details</button>
                    </div>
                </div>
            </div>

            {/* 3. CROP PERFORMANCE & TRENDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Crop Health Index */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm col-span-1 lg:col-span-2">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                            <Sprout className="text-emerald-500" /> Asset Vitality
                        </h3>
                        <div className="flex gap-2">
                            <button className="text-[10px] font-black text-slate-400 uppercase tracking-tighter px-3 py-1 bg-slate-50 rounded-lg">View All Sectors</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {crops.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((crop, i) => (
                            <div key={i} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:border-emerald-200 transition-colors group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                        <Sprout size={16} />
                                    </div>
                                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded uppercase">{crop.health}</span>
                                </div>
                                <h4 className="font-black text-slate-900 text-sm leading-none mb-1">{crop.name}</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-4">{crop.stage}</p>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-end text-[10px] font-bold mb-1">
                                        <span className="text-slate-400 uppercase tracking-widest">Growth</span>
                                        <span className="text-slate-900">{crop.progress}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${crop.progress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Compact Forecast */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative">
                    <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
                        <Calendar className="text-blue-500" /> 5-Day Outlook
                    </h3>
                    <div className="space-y-2">
                        {loading ? (
                            <div className="py-8 text-center text-slate-300 font-bold uppercase tracking-widest text-[10px]">Processing Satellite Data...</div>
                        ) : forecast.map((day, i) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-2xl border border-transparent hover:bg-slate-50 hover:border-slate-100 transition-all">
                                <span className="font-black text-slate-400 text-xs w-12">{new Date(day.date).toLocaleDateString('en-IN', { weekday: 'short' })}</span>
                                <div className="flex items-center gap-3 flex-1 px-4">
                                    {day.code > 50 ? <CloudRain size={16} className="text-blue-400" /> : <Sun size={16} className="text-amber-400" />}
                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{getWeatherCondition(day.code)}</span>
                                </div>
                                <span className="font-black text-slate-900 text-sm">{day.max}° <span className="text-slate-300 font-medium text-xs">/ {day.min}°</span></span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Internal Helper Components
const WeatherStat = ({ icon: Icon, label, value, color }) => (
    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors duration-500">
        <div className={`flex items-center gap-2 mb-1 ${color}`}>
            <Icon size={14} strokeWidth={2.5} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
        </div>
        <p className="text-xl font-black text-slate-900 leading-none">{value}</p>
    </div>
);

export default DashboardFarm;
