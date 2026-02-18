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
        <div className="grid grid-2">
            {/* Identity Card */}
            <div className="card">
                <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <h3>Digital Identity</h3>
                    <span className={`status-badge ${profile.kycStatus === 'Verified' ? 'status-success' : 'status-pending'}`}>
                        <CheckCircle size={14} style={{ marginRight: '4px' }} />
                        {profile.kycStatus}
                    </span>
                </div>

                <div className="profile-header flex items-center gap-4 mb-6">
                    <div className="avatar-large">
                        <User size={40} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{profile.name}</h2>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>Farmer ID: AGR-2026-8876</p>
                    </div>
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label>Phone Number</label>
                        <div className="input-display">
                            <span className="icon"><PhoneIcon /></span>
                            <input
                                type="text"
                                name="phone"
                                value={profile.phone}
                                disabled={!isEditing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <div className="input-display">
                            <span className="icon"><MapPin size={18} /></span>
                            <input
                                type="text"
                                name="address"
                                value={profile.address}
                                disabled={!isEditing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Land Details */}
            <div className="card">
                <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3>Land Records</h3>
                    {!isEditing ? (
                        <button className="btn-icon" onClick={() => setIsEditing(true)}><Edit2 size={18} /></button>
                    ) : (
                        <button className="btn-icon text-primary" onClick={handleSave}><Save size={18} /></button>
                    )}
                </div>

                <div className="land-card mb-4">
                    <div className="flex items-start gap-4">
                        <div className="land-icon">
                            <FileText size={24} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Total Land Size</label>
                            <input
                                className="input-transparent"
                                name="landSize"
                                value={profile.landSize}
                                disabled={!isEditing}
                                onChange={handleChange}
                            />
                            <div className="meta-text mt-2">
                                Land ID: <span className="font-mono">{profile.landId}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="verification-box">
                    <h4><CheckCircle size={16} color="#166534" /> Government Records Verified</h4>
                    <p>Linked with Bhulekh UP Land Records Database.</p>
                    <div className="progress-bar-container">
                        <div className="progress-label">Data Match Score</div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '100%' }}></div>
                        </div>
                        <div className="progress-value">100%</div>
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
