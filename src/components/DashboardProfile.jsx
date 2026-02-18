import React, { useState } from 'react';
import { User, MapPin, FileText, CheckCircle, Edit2, Save, Phone, Shield } from 'lucide-react';

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
        <div className="flex flex-col gap-6 fade-in">
            {/* 3D Profile Header Card */}
            <div className="card p-0 overflow-hidden border-0 shadow-lg relative group">
                {/* Decorative Background Mesh */}
                <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-mesh opacity-30"></div>
                </div>

                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="flex items-end gap-5">
                            <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-2xl font-black text-slate-300">
                                    {profile.name.split(' ').map(n => n[0]).join('')}
                                </div>
                            </div>
                            <div className="mb-2">
                                <h2 className="text-2xl font-black text-slate-800 leading-none mb-1 flex items-center gap-2">
                                    {profile.name}
                                    <CheckCircle size={18} className="text-emerald-500 fill-emerald-50" />
                                </h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    Farmer ID: AGR-26-8876 <span className="w-1 h-1 bg-slate-300 rounded-full"></span> Tier 1 Member
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${isEditing ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-white border text-slate-600 hover:bg-slate-50'}`}
                        >
                            {isEditing ? <><Save size={14} /> Save Changes</> : <><Edit2 size={14} /> Edit Profile</>}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-8 lg-grid-cols-1">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b pb-2 mb-4">Personal Details</h3>
                                <div className="space-y-4">
                                    <div className="group">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Phone Number</label>
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-transparent group-hover:border-slate-200 transition-colors">
                                            <Phone size={16} className="text-slate-400" />
                                            <input
                                                name="phone"
                                                value={profile.phone}
                                                disabled={!isEditing}
                                                onChange={handleChange}
                                                className="bg-transparent border-none w-full text-sm font-bold text-slate-700 focus:ring-0 p-0"
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Primary Address</label>
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-transparent group-hover:border-slate-200 transition-colors">
                                            <MapPin size={16} className="text-slate-400" />
                                            <input
                                                name="address"
                                                value={profile.address}
                                                disabled={!isEditing}
                                                onChange={handleChange}
                                                className="bg-transparent border-none w-full text-sm font-bold text-slate-700 focus:ring-0 p-0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b pb-2 mb-4">Land & Legal</h3>
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100 relative overflow-hidden">
                                <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
                                    <FileText size={120} />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Total Verified Land</p>
                                            <h4 className="text-3xl font-black text-slate-800">{profile.landSize}</h4>
                                        </div>
                                        <div className="bg-white/60 backdrop-blur-sm p-2 rounded-lg">
                                            <Shield size={24} className="text-emerald-600" />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="bg-white/60 backdrop-blur-sm p-3 rounded-xl flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">Land ID</span>
                                            <span className="text-xs font-black text-slate-800 font-mono">{profile.landId}</span>
                                        </div>
                                        <div className="bg-white/60 backdrop-blur-sm p-3 rounded-xl flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">Verification Source</span>
                                            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                                                <CheckCircle size={12} /> Bhulekh UP Govt.
                                            </span>
                                        </div>
                                    </div>
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
