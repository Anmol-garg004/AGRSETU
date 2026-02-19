import React, { useState, useEffect } from 'react';
import { Compass, Navigation, Activity, Target, Battery, Signal, Maximize2 } from 'lucide-react';

const SatelliteMap = ({ lat, lon }) => {

    const [telemetry, setTelemetry] = useState({
        alt: 120.5,
        speed: 0.0,
        battery: 88,
        sats: 12,
        mode: 'LOITER'
    });

    // Simulate telemetry data updates
    useEffect(() => {
        const interval = setInterval(() => {
            setTelemetry(prev => ({
                ...prev,
                alt: Math.max(118, Math.min(125, prev.alt + (Math.random() - 0.5))),
                speed: Math.max(0, Math.min(2, prev.speed + (Math.random() - 0.5) * 0.1)),
                sats: Math.floor(10 + Math.random() * 4),
                battery: Math.max(20, prev.battery - 0.01)
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Google Maps Embed URL (Satellite View)
    // q=lat,lon
    // t=k (Satellite)
    // z=19 (Zoom level)
    const googleMapsUrl = `https://maps.google.com/maps?q=${lat},${lon}&t=k&z=19&ie=UTF8&iwloc=&output=embed`;

    return (
        <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-900 bg-black group">

            {/* Google Maps Embed Iframe */}
            <iframe
                width="100%"
                height="100%"
                src={googleMapsUrl}
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                title="Satellite View"
                className="absolute inset-0 w-full h-full grayscale-[20%] contrast-125 brightness-90"
                style={{ filter: 'hue-rotate(-10deg) contrast(1.1) saturate(1.2)' }}
            ></iframe>

            {/* Drone HUD Overlay - Mission Planner Style */}
            <div className="absolute inset-0 pointer-events-none z-[20] flex flex-col justify-between p-4 mix-blend-screen text-green-400 font-mono text-xs select-none">

                {/* Top HUD Bar */}
                <div className="flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent p-2 -m-4 mb-0 pt-4 px-6 rounded-t-3xl backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-bold font-sans text-white drop-shadow-md tracking-wider">DISARMED</span>
                            <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] items-center gap-1 flex animate-pulse border border-red-400">NO GPS FIX</span>
                        </div>
                        <div className="h-8 w-[1px] bg-white/20"></div>
                        <div>
                            <div className="flex items-center gap-1 text-white/80"><Battery size={14} className="text-yellow-400" /> {telemetry.battery.toFixed(0)}%</div>
                            <div className="flex items-center gap-1 text-white/80"><Signal size={14} className="text-emerald-400" /> {telemetry.sats} Sats</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-lg font-bold text-white font-mono tracking-widest">{new Date().toLocaleTimeString('en-IN', { hour12: false })}</span>
                            <span className="text-emerald-400 text-[10px]">SYSTEM ONLINE</span>
                        </div>
                        <div className="p-2 border border-white/20 rounded-full bg-black/20 backdrop-blur-sm">
                            <Compass className="animate-spin-slow text-white" size={24} />
                        </div>
                    </div>
                </div>

                {/* Center Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70">
                    <Target size={48} className="text-white drop-shadow-lg" strokeWidth={1} />
                    <div className="absolute top-1/2 left-1/2 w-[200px] h-[1px] bg-white/30 -translate-x-1/2"></div>
                    <div className="absolute top-1/2 left-1/2 h-[100px] w-[1px] bg-white/30 -translate-y-1/2"></div>
                </div>

                {/* Floating Telemetry Panels */}
                <div className="flex justify-between items-end mt-auto">

                    {/* Left Panel: Flight Data */}
                    <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-3 min-w-[140px] shadow-2xl">
                        <h4 className="flex items-center gap-2 text-white/70 border-b border-white/10 pb-1 mb-2 font-bold uppercase tracking-wider text-[10px]">
                            <Activity size={12} /> Flight Data
                        </h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            <div>
                                <span className="block text-[8px] text-white/50 uppercase">Ground Speed</span>
                                <span className="text-lg font-bold text-white">{telemetry.speed.toFixed(2)} <span className="text-[10px] text-white/50">m/s</span></span>
                            </div>
                            <div>
                                <span className="block text-[8px] text-white/50 uppercase">Altitude</span>
                                <span className="text-lg font-bold text-emerald-400">{telemetry.alt.toFixed(1)} <span className="text-[10px] text-white/50">m</span></span>
                            </div>
                            <div>
                                <span className="block text-[8px] text-white/50 uppercase">Dist to Home</span>
                                <span className="text-lg font-bold text-white">0.00 <span className="text-[10px] text-white/50">m</span></span>
                            </div>
                            <div>
                                <span className="block text-[8px] text-white/50 uppercase">Vertical Spd</span>
                                <span className="text-lg font-bold text-white">0.00 <span className="text-[10px] text-white/50">m/s</span></span>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Map Controls */}
                    <div className="flex flex-col gap-2 pointer-events-auto">
                        <a href={`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`} target="_blank" rel="noreferrer" className="p-2 bg-black/60 border border-white/10 rounded-lg text-white hover:bg-emerald-600 hover:border-emerald-500 transition-colors shadow-lg flex items-center justify-center">
                            <Maximize2 size={16} />
                        </a>
                        <button className="p-2 bg-black/60 border border-white/10 rounded-lg text-white hover:bg-emerald-600 hover:border-emerald-500 transition-colors shadow-lg">
                            <Navigation size={16} />
                        </button>
                    </div>

                </div>
            </div>

            {/* Scanlines Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/3/3a/Transparent_scanlines_pattern.png')] opacity-10 mix-blend-overlay z-[25]"></div>
        </div>
    );
};

export default SatelliteMap;
