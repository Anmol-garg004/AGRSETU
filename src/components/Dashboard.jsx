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
    History,
    Layout,
    Search,
    ChevronRight,
    Menu,
    X,
    Landmark
} from 'lucide-react';
import DashboardProfile from './DashboardProfile';
import DashboardFarm from './DashboardFarm';

import DashboardTransactions from './DashboardTransactions';
import AgriTrustScore from './AgriTrustScore';
import DashboardFunding from './DashboardFunding';
import '../index.css';

const Dashboard = ({ user, onLogout }) => {
    // Default Sidebar: CLOSED (as requested)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Overview');

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        // Always close sidebar after selection
        setIsSidebarOpen(false);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return (
                    <div className="overview-container space-y-8">
                        {/* Welcome Section */}
                        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
                            <div>
                                <h1 className="text-3xl font-black text-slate-800 tracking-tight">Overview</h1>
                                <p className="text-slate-500 font-medium mt-1">
                                    Welcome back, <span className="text-emerald-600 font-bold">{user?.name || 'Kishan Kumar'}</span>
                                </p>
                            </div>
                            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">System Live</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-8">
                            {/* Main Farm Data Section - Left Column */}
                            <div className="col-span-12 xl:col-span-8 space-y-8">
                                <DashboardFarm />
                            </div>

                            {/* Right Column - Trust Score & Quick Profile */}
                            <div className="col-span-12 xl:col-span-4 space-y-8">
                                <AgriTrustScore />
                                <div className="card p-6 border-slate-100 shadow-sm bg-indigo-900 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-16 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                                        <div className="space-y-3">
                                            <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-bold transition-all flex items-center justify-between px-4">
                                                Update Land Record <ChevronRight size={16} />
                                            </button>
                                            <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-bold transition-all flex items-center justify-between px-4">
                                                Apply for KCC Loan <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Profile':
                return <DashboardProfile user={user} />;
            case 'Farm Data':
                return <DashboardFarm />;

            case 'Trust Score':
                return <div className="flex justify-center"><AgriTrustScore /></div>;
            case 'Transactions':
                return <DashboardTransactions />;
            case 'Funding':
                return <DashboardFunding />;
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
            {/* Overlay for both Mobile and Desktop when Sidebar is Open (Optional preference) */}
            <div
                className={`mobile-overlay ${isSidebarOpen ? 'active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
                style={{ zIndex: 90 }} // Below content if Sidebar is push, above if overlay
            />

            <div className="dashboard-container">
                {/* Professional Sidebar - Hidden by default as requested */}
                <aside
                    className={`dashboard-sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}
                    style={{
                        transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        zIndex: 100,
                        height: '100vh',
                        width: '280px',
                        transition: 'transform 0.3s ease-in-out',
                        boxShadow: isSidebarOpen ? '0 0 50px rgba(0,0,0,0.2)' : 'none'
                    }}
                >
                    <div className="p-6 flex items-center justify-between">
                        <div
                            className="flex items-center gap-2 cursor-pointer group"
                            onClick={() => handleTabChange('Overview')}
                        >
                            <div className="avatar-initials bg-emerald-600 shadow-lg group-hover:scale-110 transition-transform w-8 h-8" style={{ color: 'white', border: 'none' }}>
                                <Leaf size={18} color="white" />
                            </div>
                            <span className="text-xl font-black tracking-tighter text-slate-800 uppercase">
                                AGR<span className="text-emerald-600">SETU</span>
                            </span>
                        </div>
                        {/* Close Button */}
                        <button
                            className="p-2 text-slate-400 hover:text-slate-900 bg-transparent border-0 cursor-pointer"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex-1 px-3 py-2 space-y-1">
                        {[
                            { id: 'Overview', icon: Layout },
                            { id: 'Profile', icon: Users },
                            { id: 'Farm Data', icon: MapPin },

                            { id: 'Funding', icon: Landmark },
                            { id: 'Trust Score', icon: Award },
                            { id: 'Transactions', icon: History }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleTabChange(item.id)}
                                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl font-bold transition-all border-0 cursor-pointer ${activeTab === item.id
                                    ? 'active-tab shadow-sm'
                                    : 'text-slate-400 bg-transparent hover:bg-slate-50 hover:text-slate-600'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={18} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                                    <span className="text-sm">{item.id}</span>
                                </div>
                                {activeTab === item.id && <ChevronRight size={14} className="opacity-50" />}
                            </button>
                        ))}
                    </nav>

                    <div className="p-4 mt-auto border-t">
                        <div className="bg-slate-50 p-3 rounded-xl flex items-center gap-3 mb-3">
                            <div className="avatar-initials w-8 h-8 text-xs">
                                KK
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-black text-slate-800 truncate">Kishan Kumar</p>
                                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-md font-bold">Verified</span>
                            </div>
                        </div>
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-black transition-all cursor-pointer border-0 text-sm"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </aside>

                {/* Premium Main Content Area */}
                <main className="dashboard-main w-full" style={{ paddingLeft: '0' }}>
                    <header className="sticky top-0 bg-slate-50/90 backdrop-blur-md z-40 border-b border-slate-200">
                        <div className="flex items-center justify-between gap-4 py-4 px-6 max-w-7xl mx-auto w-full">
                            <div className="flex items-center gap-4">
                                {/* Menu Toggle - ALWAYS VISIBLE now */}
                                <button
                                    className="p-2 bg-white border rounded-xl text-slate-600 shadow-sm hover:bg-slate-50 cursor-pointer"
                                    onClick={() => setIsSidebarOpen(true)}
                                >
                                    <Menu size={20} />
                                </button>

                                <div>
                                    <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{activeTab}</h1>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="relative hide-mobile group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-800 transition-colors">
                                        <Search size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="pl-10 pr-4 h-11 w-64 bg-slate-100 border-0 rounded-full text-sm font-bold text-slate-700 focus:w-80 focus:bg-white focus:ring-2 focus:ring-slate-900 transition-all outline-none placeholder:text-slate-400 shadow-inner"
                                    />
                                </div>

                                <button className="relative w-11 h-11 flex items-center justify-center bg-white border border-slate-100 rounded-full text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-all cursor-pointer shadow-sm hover:shadow-md active:scale-95">
                                    <Bell size={20} />
                                    <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full animate-pulse"></span>
                                </button>

                                <button
                                    onClick={() => handleTabChange('Funding')}
                                    className="h-11 px-6 text-sm font-black flex gap-2 items-center bg-slate-900 text-white rounded-full shadow-lg shadow-slate-900/20 hover:shadow-emerald-500/20 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all cursor-pointer active:scale-95 group"
                                >
                                    <IndianRupee size={18} className="group-hover:rotate-12 transition-transform" />
                                    <span className="hide-mobile tracking-wide uppercase text-xs">Get Funding</span>
                                </button>
                            </div>
                        </div>
                    </header>

                    <div className="dashboard-content fade-in p-6 max-w-7xl mx-auto w-full">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </>
    );
};

export default Dashboard;
