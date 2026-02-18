import React, { useState } from 'react';
import {
    Users,
    MapPin,
    Leaf,
    CheckCircle,
    BarChart,
    Calendar,
    Settings,
    Bell,
    LogOut
} from 'lucide-react';
import '../index.css';

const Dashboard = ({ user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('Overview');

    const stats = [
        { label: "My Farms", value: "2", icon: <MapPin size={24} />, color: "#2E7D32" },
        { label: "Crop Health", value: "98%", icon: <Leaf size={24} />, color: "#4CAF50" },
        { label: "Trust Score", value: "780", icon: <CheckCircle size={24} />, color: "#1565C0" },
    ];

    const recentActivity = [
        { date: "Feb 18, 2026", action: "Loan Approved", amount: "₹50,000", status: "Completed" },
        { date: "Feb 15, 2026", action: "Soil Test Report", amount: "-", status: "Verified" },
        { date: "Feb 10, 2026", action: "Harvest Logged", amount: "Wheat", status: "Pending" },
    ];

    return (
        <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
            {/* Sidebar */}
            <aside style={{ width: '280px', backgroundColor: '#FFFFFF', borderRight: '1px solid #E2E8F0', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div className="logo mb-8" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2E7D32', display: 'flex', alignItems: 'center' }}>
                    AGR<span style={{ color: '#1565C0' }}>SETU</span>
                </div>

                <nav style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none' }}>
                        {['Overview', 'Farm Data', 'Financials', 'Marketplace', 'Settings'].map((item) => (
                            <li key={item} style={{ marginBottom: '0.5rem' }}>
                                <button
                                    onClick={() => setActiveTab(item)}
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        backgroundColor: activeTab === item ? '#F0FDF4' : 'transparent',
                                        color: activeTab === item ? '#15803D' : '#64748B',
                                        fontWeight: activeTab === item ? '600' : '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {item === 'Overview' && <BarChart size={20} />}
                                    {item === 'Farm Data' && <MapPin size={20} />}
                                    {item === 'Financials' && <CheckCircle size={20} />}
                                    {item === 'Marketplace' && <Users size={20} />}
                                    {item === 'Settings' && <Settings size={20} />}
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#DCFCE7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                            AG
                        </div>
                        <div>
                            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0F172A' }}>AGR User</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Farmer</div>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #E2E8F0',
                            backgroundColor: 'white',
                            color: '#EF4444',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.25rem' }}>Dashboard Overview</h1>
                        <p style={{ color: '#64748B' }}>Welcome back, check your farm's health and credit score.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button style={{ padding: '10px', borderRadius: '50%', border: '1px solid #E2E8F0', backgroundColor: 'white', color: '#64748B', cursor: 'pointer' }}>
                            <Bell size={20} />
                        </button>
                        <button className="btn btn-primary">Add New Crop</button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-3 mb-8" style={{ gap: '1.5rem' }}>
                    {stats.map((stat, i) => (
                        <div key={i} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: `${stat.color}15`, color: stat.color }}>
                                {stat.icon}
                            </div>
                            <div>
                                <p style={{ fontSize: '0.875rem', color: '#64748B' }}>{stat.label}</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0F172A' }}>{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid #E2E8F0' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1E293B' }}>Recent Activity</h3>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#F8FAFC' }}>
                            <tr>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748B', textTransform: 'uppercase' }}>Date</th>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748B', textTransform: 'uppercase' }}>Action</th>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748B', textTransform: 'uppercase' }}>Amount/Crop</th>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748B', textTransform: 'uppercase' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivity.map((activity, i) => (
                                <tr key={i} style={{ borderBottom: i === recentActivity.length - 1 ? 'none' : '1px solid #F1F5F9' }}>
                                    <td style={{ padding: '1rem 1.5rem', color: '#64748B', fontSize: '0.875rem' }}>{activity.date}</td>
                                    <td style={{ padding: '1rem 1.5rem', color: '#1E293B', fontWeight: '500', fontSize: '0.875rem' }}>{activity.action}</td>
                                    <td style={{ padding: '1rem 1.5rem', color: '#64748B', fontSize: '0.875rem' }}>{activity.amount}</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '999px',
                                            fontSize: '0.75rem',
                                            fontWeight: '500',
                                            backgroundColor: activity.status === 'Completed' ? '#DCFCE7' : activity.status === 'Pending' ? '#FEF3C7' : '#DBEAFE',
                                            color: activity.status === 'Completed' ? '#166534' : activity.status === 'Pending' ? '#92400E' : '#1E40AF'
                                        }}>
                                            {activity.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
