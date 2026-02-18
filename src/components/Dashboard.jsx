import React, { useState } from 'react';
import {
    Users,
    MapPin,
    Leaf,
    Award,
    Settings,
    Bell,
    LogOut,
    IndianRupee,
    Layout,
    Search,
    ChevronRight,
    Menu,
    X
} from 'lucide-react';
import DashboardProfile from './DashboardProfile';
import DashboardFarm from './DashboardFarm';
import DashboardFinancials from './DashboardFinancials';
import AgriTrustScore from './AgriTrustScore';
import '../index.css';

const Dashboard = ({ user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setIsSidebarOpen(false);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return (
                    <div className="grid grid-cols-12 gap-8 lg-grid-cols-1">
                        <div className="col-span-8 lg-col-span-12 space-y-8">
                            <DashboardFarm />
                            <DashboardFinancials />
                        </div>
                        <div className="col-span-4 lg-col-span-12 space-y-8">
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
                return (
                    <div className="flex flex-col items-center justify-center p-20 text-center card bg-slate-50 border-dashed">
                        <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                            <Settings className="text-slate-300 animate-spin-slow" size={40} />
                        </div>
                        <h3 className="text-slate-400">Section Under Development</h3>
                        <p className="text-slate-400 text-sm">We're working hard to bring this feature to you soon.</p>
                    </div>
                );
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`mobile-overlay ${isSidebarOpen ? 'active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            <div className="dashboard-container">
                {/* Professional Sidebar */}
                <aside className={`dashboard-sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                    <div className="p-8 flex items-center justify-between">
                        <div
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => handleTabChange('Overview')}
                        >
                            <div className="avatar-initials bg-emerald-600 shadow-lg group-hover:scale-110 transition-transform" style={{ color: 'white', border: 'none' }}>
                                <Leaf size={22} color="white" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-slate-800 uppercase">
                                AGR<span className="text-emerald-600">SETU</span>
                            </span>
                        </div>
                        {/* Mobile Close Button */}
                        <button
                            className="show-mobile p-2 text-slate-400 hover:text-slate-900 bg-transparent border-0 cursor-pointer"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex-1 px-4 py-4 space-y-2">
                        {[
                            { id: 'Overview', icon: Layout },
                            { id: 'Profile', icon: Users },
                            { id: 'Farm Data', icon: MapPin },
                            { id: 'Financials', icon: IndianRupee },
                            { id: 'Trust Score', icon: Award },
                            { id: 'Settings', icon: Settings }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleTabChange(item.id)}
                                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold transition-all border-0 cursor-pointer ${activeTab === item.id
                                    ? 'active-tab shadow-sm'
                                    : 'text-slate-400 bg-white hover:bg-slate-50 hover:text-slate-600'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                                    <span className="text-sm">{item.id}</span>
                                </div>
                                {activeTab === item.id && <ChevronRight size={14} className="opacity-50" />}
                            </button>
                        ))}
                    </nav>

                    <div className="p-6 mt-auto border-t">
                        <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 mb-4">
                            <div className="avatar-initials">
                                KK
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-black text-slate-800 truncate mb-1">Kishan Kumar</p>
                                <span className="status-badge bg-emerald-50 text-emerald-600" style={{ fontSize: '10px' }}>Verified</span>
                            </div>
                        </div>
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-black transition-all cursor-pointer border-0"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </aside>

                {/* Premium Main Content Area */}
                <main className="dashboard-main">
                    <header className="flex items-center justify-between gap-6 mb-12 fade-in">
                        <div className="flex items-center gap-4">
                            {/* Mobile Menu Toggle */}
                            <button
                                className="show-mobile p-3 bg-white border rounded-2xl text-slate-600 shadow-sm hover:bg-slate-50 cursor-pointer"
                                onClick={() => setIsSidebarOpen(true)}
                            >
                                <Menu size={24} />
                            </button>

                            <div>
                                <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                                    Dashboard <ChevronRight size={10} /> {activeTab}
                                </div>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">{activeTab}</h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative hide-mobile">
                                <Search className="absolute left-4 top-1/2" size={18} style={{ transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    placeholder="Search analytics..."
                                    className="px-12 py-3 w-64"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button className="relative w-12 h-12 flex items-center justify-center bg-white border rounded-2xl text-slate-500 hover:bg-slate-50 cursor-pointer">
                                    <Bell size={20} />
                                    <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
                                </button>
                                <button className="btn-premium">
                                    <IndianRupee size={18} /> Funding
                                </button>
                            </div>
                        </div>
                    </header>

                    <div className="dashboard-content fade-in">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </>
    );
};

export default Dashboard;
