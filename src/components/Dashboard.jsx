import React, { useState } from 'react';
import {
    Users,
    MapPin,
    Leaf,
    CheckCircle,
    BarChart,
    Award,
    Settings,
    Bell,
    LogOut,
    IndianRupee,
    Layout
} from 'lucide-react';
import DashboardProfile from './DashboardProfile';
import DashboardFarm from './DashboardFarm';
import DashboardFinancials from './DashboardFinancials';
import AgriTrustScore from './AgriTrustScore';
import '../index.css';

const Dashboard = ({ user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('Overview');

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return (
                    <div className="grid grid-3 gap-6">
                        <div className="col-span-2 space-y-6">
                            <DashboardFarm />
                            <DashboardFinancials />
                        </div>
                        <div className="col-span-1 space-y-6">
                            <AgriTrustScore />
                            <DashboardProfile user={user} />
                        </div>
                    </div>
                );
            case 'Profile':
                return <DashboardProfile user={user} />;
            case 'Farm Data':
                return <DashboardFarm />;
            case 'Financials':
                return <DashboardFinancials />;
            case 'Trust Score':
                return <div className="flex justify-center"><AgriTrustScore /></div>;
            default:
                return <div className="text-center p-12 text-gray-400">Section Under Development</div>;
        }
    };

    return (
        <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
            {/* Sidebar */}
            <aside style={{ width: '280px', backgroundColor: '#FFFFFF', borderRight: '1px solid #E2E8F0', padding: '1.5rem', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', overflowY: 'auto' }}>
                <div className="logo mb-8" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#166534', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Leaf size={24} /> AGR<span style={{ color: '#1565C0' }}>SETU</span>
                </div>

                <nav style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none' }}>
                        {[
                            { id: 'Overview', icon: <Layout size={20} /> },
                            { id: 'Profile', icon: <Users size={20} /> },
                            { id: 'Farm Data', icon: <MapPin size={20} /> },
                            { id: 'Financials', icon: <IndianRupee size={20} /> }, // Changed from CheckCircle to Rupee
                            { id: 'Trust Score', icon: <Award size={20} /> },
                            { id: 'Settings', icon: <Settings size={20} /> }
                        ].map((item) => (
                            <li key={item.id} style={{ marginBottom: '0.5rem' }}>
                                <button
                                    onClick={() => setActiveTab(item.id)}
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        backgroundColor: activeTab === item.id ? '#F0FDF4' : 'transparent',
                                        color: activeTab === item.id ? '#166534' : '#64748B',
                                        fontWeight: activeTab === item.id ? '600' : '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {item.icon}
                                    {item.id}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#DCFCE7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                            KK
                        </div>
                        <div>
                            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0F172A' }}>Kishan Kumar</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Verified Farmer</div>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #FECACA',
                            backgroundColor: '#FEF2F2',
                            color: '#EF4444',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#FEE2E2'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#FEF2F2'}
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', marginLeft: '280px', maxWidth: '1600px' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1E293B', marginBottom: '0.25rem' }}>{activeTab}</h1>
                        <p style={{ color: '#64748B' }}>Real-time insights for your agricultural success.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <button style={{ padding: '12px', borderRadius: '50%', border: '1px solid #E2E8F0', backgroundColor: 'white', color: '#64748B', cursor: 'pointer', position: 'relative' }}>
                            <Bell size={20} />
                            <span style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', backgroundColor: '#EF4444', borderRadius: '50%' }}></span>
                        </button>
                        <button className="btn btn-primary shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                            + Add New Crop Log
                        </button>
                    </div>
                </header>

                {/* Dynamic Content Area */}
                <div className="dashboard-content fade-up">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
