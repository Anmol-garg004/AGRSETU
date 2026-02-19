import React, { useState } from 'react';
import {
    User,
    MapPin,
    FileText,
    CheckCircle,
    Edit2,
    Save,
    Phone,
    Shield,
    CreditCard,
    Landmark,
    Sprout,
    Tractor,
    Leaf,
    Fingerprint,
    Copy,
    Calendar,
    Mail
} from 'lucide-react';

const DashboardProfile = ({ user, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: (user?.name && user.name !== 'Admin User') ? user.name : 'Kishan Kumar',
        phone: '+91 98765 43210',
        email: 'kishan.k@agrsetu.com',
        address: 'KR Mangalam University, Sohna Road, Gurugram, Haryana - 122103',
        aadhaar: 'XXXX-XXXX-8876',
        pan: 'ABCDE1234F',
        dob: '15 Aug 1982',
        landSize: '28 Acres',
        landId: 'HR-GGM-122103',
        khataNo: '00452',
        irrigation: 'Tube Well (Electric)',
        soilType: 'Alluvial (Loamy)',
        majorCrops: ['Wheat', 'Rice', 'Potato', 'Mustard'],
        bankName: 'State Bank of India',
        accountNo: 'XXXX-XXXX-4521',
        ifsc: 'SBIN0001234',
        kccStatus: 'Active - Limit ₹3.0L',
        kycStatus: 'Verified'
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsEditing(false);
        onUpdate && onUpdate(profile);
    };

    const SectionHeader = ({ icon: Icon, title }) => (
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                <Icon size={16} />
            </div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">{title}</h3>
        </div>
    );

    const DetailRow = ({ label, value, name, icon: Icon, editable = true }) => (
        <div className="group">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                {Icon && <Icon size={12} />} {label}
            </label>
            <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${isEditing && editable ? 'bg-white border-emerald-200 shadow-sm' : 'bg-slate-50 border-transparent'}`}>
                {isEditing && editable ? (
                    <input
                        name={name}
                        value={value}
                        onChange={handleChange}
                        className="bg-transparent border-none w-full text-sm font-bold text-slate-800 focus:outline-none placeholder:text-slate-300"
                    />
                ) : (
                    <span className="text-sm font-bold text-slate-800 truncate select-all">{value}</span>
                )}
                {!isEditing && editable && (
                    <button className="text-slate-300 hover:text-emerald-600 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer">
                        <Copy size={12} />
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="fade-in space-y-8 pb-12">
            {/* Header Identity Card */}
            <div className="card p-0 overflow-hidden bg-white border-slate-100 relative shadow-sm">
                <div className="h-32 bg-gradient-to-r from-slate-900 to-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-mesh opacity-20"></div>
                    <div className="absolute -bottom-16 left-8 p-1.5 bg-white rounded-2xl shadow-xl">
                        <div className="h-28 w-auto px-6 min-w-[140px] bg-emerald-600 rounded-xl flex items-center justify-center text-emerald-50 drop-shadow-md text-center">
                            <span className="text-xl font-black leading-tight whitespace-nowrap">Kishan Kumar</span>
                        </div>
                    </div>
                </div>

                <div className="pt-20 pb-8 flex justify-between items-end flex-wrap gap-6 px-8 select-none">
                    <div className="pt-2 pl-80">
                        <div className="flex items-center gap-3 mb-1 min-w-[300px]">
                            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200 whitespace-nowrap">
                                <CheckCircle size={10} /> Verified Farmer
                            </span>
                        </div>
                        <p className="text-xs font-black text-emerald-700 uppercase tracking-widest flex items-center gap-2 mt-2">
                            Unique Farmer ID: <span className="font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">{profile.landId}</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trust Score</p>
                            <p className="text-2xl font-black text-emerald-600 leading-none">94/100</p>
                        </div>

                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8 lg-grid-cols-1">
                {/* Left Column: Personal & Identity */}
                <div className="col-span-8 lg-col-span-12 space-y-8">
                    {/* Personal Information */}
                    <div className="card p-6 border-slate-100 shadow-sm">
                        <SectionHeader icon={User} title="Personal Identity Information" />
                        <div className="grid grid-cols-2 lg-grid-cols-1 gap-6">
                            <DetailRow label="Full Name" value={profile.name} name="name" icon={User} />
                            <DetailRow label="Date of Birth" value={profile.dob} name="dob" icon={Calendar} />
                            <DetailRow label="Primary Phone" value={profile.phone} name="phone" icon={Phone} />
                            <DetailRow label="Email Address" value={profile.email} name="email" icon={Mail} />
                            <div className="col-span-2">
                                <DetailRow label="Permanent Address" value={profile.address} name="address" icon={MapPin} />
                            </div>
                        </div>
                    </div>

                    {/* Government ID Proofs */}
                    <div className="card p-6 border-slate-100 shadow-sm">
                        <SectionHeader icon={Fingerprint} title="Government Identification (KYC)" />
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-slate-50/50 p-4 rounded-2xl border border-dashed border-slate-200">
                                <div className="flex justify-between items-start mb-3">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                        <Fingerprint size={12} className="text-blue-500" /> Aadhaar Card
                                    </label>
                                    <CheckCircle size={14} className="text-emerald-500" />
                                </div>
                                <div className="text-lg font-black text-slate-800 font-mono tracking-wider mb-2">{profile.aadhaar}</div>
                                <p className="text-[10px] text-emerald-600 font-bold bg-emerald-50 inline-block px-2 py-0.5 rounded">Biometric Verified</p>
                            </div>

                            <div className="bg-slate-50/50 p-4 rounded-2xl border border-dashed border-slate-200">
                                <div className="flex justify-between items-start mb-3">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                        <Shield size={12} className="text-blue-500" /> PAN Card
                                    </label>
                                    <CheckCircle size={14} className="text-emerald-500" />
                                </div>
                                <div className="text-lg font-black text-slate-800 font-mono tracking-wider mb-2">{profile.pan}</div>
                                <p className="text-[10px] text-emerald-600 font-bold bg-emerald-50 inline-block px-2 py-0.5 rounded">Tax Compliant</p>
                            </div>
                        </div>
                    </div>

                    {/* Land & Agriculture Details */}
                    <div className="card p-6 border-slate-100 shadow-sm">
                        <SectionHeader icon={Tractor} title="Land & Agriculture Profile" />
                        <div className="grid grid-cols-3 lg-grid-cols-1 gap-6">
                            <DetailRow label="Total Land Area" value={profile.landSize} name="landSize" icon={MapPin} />
                            <DetailRow label="Land ID (Khata No)" value={profile.khataNo} name="khataNo" icon={FileText} />
                            <DetailRow label="Soil Type" value={profile.soilType} name="soilType" icon={Sprout} />
                            <div className="col-span-2">
                                <DetailRow label="Irrigation Source" value={profile.irrigation} name="irrigation" icon={Tractor} />
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-50">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Major Crops Cultivated</label>
                            <div className="flex flex-wrap gap-2">
                                {profile.majorCrops.map((crop, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100 flex items-center gap-1.5 hover:bg-emerald-100 transition-colors cursor-default">
                                        <Leaf size={12} /> {crop}
                                    </span>
                                ))}
                                {isEditing && (
                                    <button className="px-3 py-1.5 bg-slate-50 text-slate-400 border border-dashed border-slate-300 rounded-lg text-xs font-bold hover:text-slate-600 hover:border-slate-400 transition-all cursor-pointer">
                                        + Add Crop
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Financials & Extras */}
                <div className="col-span-4 lg-col-span-12 space-y-8">
                    {/* Banking Details */}
                    <div className="card p-6 border-slate-100 bg-slate-900 text-white relative overflow-hidden shadow-lg">
                        <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                        <div className="flex items-center gap-2 mb-6 opacity-80">
                            <Landmark size={18} />
                            <h3 className="text-sm font-bold uppercase tracking-wide">Banking Details</h3>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bank Name</p>
                                <p className="text-lg font-bold">{profile.bankName}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Account Number</p>
                                <p className="text-xl font-mono tracking-widest">{profile.accountNo}</p>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">IFSC Code</p>
                                    <p className="font-mono">{profile.ifsc}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                    <p className="text-emerald-400 font-bold text-xs flex items-center justify-end gap-1"><CheckCircle size={10} /> Active</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Financial Status */}
                    <div className="card p-6 border-slate-100 shadow-sm">
                        <SectionHeader icon={CreditCard} title="Financial Profile" />
                        <div className="space-y-4">
                            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-bold text-slate-700">KCC Status</span>
                                    <span className="text-[10px] bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Active</span>
                                </div>
                                <div className="text-lg font-black text-emerald-800">₹ 3,00,000</div>
                                <p className="text-[10px] text-emerald-600 mt-1">Available Limit</p>
                            </div>

                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-bold text-slate-700">Crop Insurance</span>
                                    <span className="text-[10px] bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded font-bold">Valid 2026</span>
                                </div>
                                <div className="text-lg font-black text-blue-800">PMFBY Policy</div>
                                <p className="text-[10px] text-blue-600 mt-1">Covering Wheat & Potato</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfile;
