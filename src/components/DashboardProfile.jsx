import React, { useState } from 'react';
import { User, MapPin, FileText, CheckCircle, Edit2, Save } from 'lucide-react';

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
        <div className="grid grid-cols-1 gap-8 fade-in">
            {/* Identity Card */}
            <div className="card p-8">
                <div className="flex justify-between items-start mb-8">
                    <h3 className="m-0 text-xl font-bold">Digital Identity</h3>
                    <span className={`status-badge ${profile.kycStatus === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                        <CheckCircle size={14} />
                        {profile.kycStatus}
                    </span>
                </div>

                <div className="flex items-center gap-4 mb-8">
                    <div className="avatar-initials text-xl">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="truncate">
                        <h2 className="text-xl font-black text-slate-900 leading-none mb-2 truncate">{profile.name}</h2>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Farmer ID: AGR-26-8876</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="form-group">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><PhoneIcon /></span>
                            <input
                                type="text"
                                name="phone"
                                value={profile.phone}
                                disabled={!isEditing}
                                className="w-full pl-12"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Address</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><MapPin size={18} /></span>
                            <input
                                type="text"
                                name="address"
                                value={profile.address}
                                disabled={!isEditing}
                                className="w-full pl-12"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Land Details */}
            <div className="card p-8">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="m-0 text-xl font-bold">Land Records</h3>
                    {!isEditing ? (
                        <button className="p-2 border rounded-xl hover:bg-slate-50 transition-all bg-transparent" onClick={() => setIsEditing(true)}>
                            <Edit2 size={18} className="text-slate-600" />
                        </button>
                    ) : (
                        <button className="p-2 bg-emerald-600 text-white rounded-xl shadow-md border-0" onClick={handleSave}>
                            <Save size={18} />
                        </button>
                    )}
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border mb-6 group hover:bg-white hover:border-slate-200 transition-all">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-xl border">
                            <FileText size={24} className="text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Land Size</label>
                            <input
                                className="w-full bg-transparent border-none p-0 text-lg font-black text-slate-800"
                                name="landSize"
                                value={profile.landSize}
                                disabled={!isEditing}
                                onChange={handleChange}
                            />
                            <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-2">
                                Land ID: {profile.landId}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                    <h4 className="flex items-center gap-2 text-xs font-black text-emerald-700 uppercase tracking-widest mb-4">
                        <CheckCircle size={16} /> Verified
                    </h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6">
                        System automatically cross-referenced with Bhulekh UP Govt. records.
                    </p>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Match Score</span>
                            <span className="text-xs font-black text-emerald-600">100%</span>
                        </div>
                        <div className="metric-progress">
                            <div className="metric-fill bg-emerald-600" style={{ width: '100%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PhoneIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
);

export default DashboardProfile;
