import React, { useState } from 'react';
import { User, MapPin, FileText, CheckCircle, Edit2, Save, Phone, Shield, ExternalLink } from 'lucide-react';

const DashboardProfile = ({ user, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: user?.name || 'Kishan Kumar',
        phone: '+91 98765 43210',
        address: 'Village Rampur, Dist. Varanasi, UP',
        landSize: '5.2 Acres',
        landId: 'UP-VNS-789012',
        kycStatus: 'Verified'
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsEditing(false);
        onUpdate && onUpdate(profile);
    };

    return (
        <div className="flex flex-col gap-6 fade-in pb-24">
            {/* 3D Profile Header Card */}
            <div className="card p-0 overflow-hidden border-0 shadow-lg relative group bg-white">
                {/* Decorative Background Header */}
                <div className="h-24 bg-gradient-to-r from-emerald-600 to-teal-500 relative">
                    <div className="absolute inset-0 bg-mesh opacity-30"></div>
                </div>

                <div className="px-5 pb-5">
                    <div className="relative flex flex-col items-start -mt-10 mb-6 gap-3">
                        <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-lg z-10">
                            <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-2xl font-black text-slate-300">
                                {profile.name.split(' ').map(n => n[0]).join('')}
                            </div>
                        </div>

                        <div className="w-full flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-black text-slate-800 leading-none mb-1 flex items-center gap-2">
                                    {profile.name}
                                    <CheckCircle size={18} className="text-emerald-500 fill-emerald-50" />
                                </h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mt-1">
                                    Farmer ID: AGR-26-8876 <span className="w-1 h-1 bg-slate-300 rounded-full"></span> Tier 1
                                </p>
                            </div>

                            <button
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all shadow-sm flex items-center gap-2 ${isEditing ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-white border text-slate-600 hover:bg-slate-50'}`}
                            >
                                {isEditing ? <><Save size={12} /> Save</> : <><Edit2 size={12} /> Edit</>}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        {/* Personal Details Section */}
                        <div className="bg-slate-50 rounded-xl p-4 border border-dashed border-slate-200">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <User size={12} /> Personal Details
                            </h3>
                            <div className="space-y-3">
                                <div className="group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Phone</label>
                                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-100 focus-within:border-emerald-200 focus-within:shadow-sm transition-all h-9">
                                        <Phone size={14} className="text-slate-400" />
                                        <input
                                            name="phone"
                                            value={profile.phone}
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            className="bg-transparent border-none w-full text-xs font-bold text-slate-700 focus:ring-0 p-0 placeholder:text-slate-300 h-full"
                                        />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Address</label>
                                    <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-100 focus-within:border-emerald-200 focus-within:shadow-sm transition-all h-9">
                                        <MapPin size={14} className="text-slate-400" />
                                        <input
                                            name="address"
                                            value={profile.address}
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            className="bg-transparent border-none w-full text-xs font-bold text-slate-700 focus:ring-0 p-0 placeholder:text-slate-300 h-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Land & Legal Section */}
                        <div>
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100 relative overflow-hidden group hover:shadow-md transition-all">
                                {/* Watermark - fixed positioning and opacity */}
                                <div className="absolute right-0 bottom-0 opacity-[0.05] pointer-events-none transform translate-x-1/4 translate-y-1/4">
                                    <FileText size={120} />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-0.5">Total Land</p>
                                            <h4 className="text-3xl font-black text-slate-800 tracking-tight">{profile.landSize}</h4>
                                        </div>
                                        <div className="bg-white/80 p-1.5 rounded-lg shadow-sm text-emerald-600">
                                            <Shield size={18} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="bg-white/60 backdrop-blur-sm p-2.5 rounded-lg border border-white/50">
                                            <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Land ID</p>
                                            <div className="text-xs font-black text-slate-800 font-mono tracking-tight break-all">
                                                {profile.landId}
                                            </div>
                                        </div>
                                        <div className="bg-white/60 backdrop-blur-sm p-2.5 rounded-lg flex justify-between items-center border border-white/50">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">Status</span>
                                            <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1 bg-emerald-100 px-2 py-0.5 rounded-full">
                                                <CheckCircle size={10} /> Verified
                                            </span>
                                        </div>
                                    </div>

                                    <button className="w-full mt-4 py-2 bg-white border border-emerald-100 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
                                        View Land Records <ExternalLink size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfile;
