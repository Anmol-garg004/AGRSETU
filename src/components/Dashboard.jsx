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
    Landmark,
    ShoppingBag
} from 'lucide-react';
import DashboardProfile from './DashboardProfile';
import DashboardFarm from './DashboardFarm';

import DashboardTransactions from './DashboardTransactions';
import AgriTrustScore from './AgriTrustScore';
import DashboardFunding from './DashboardFunding';
import DashboardMarketplace from './DashboardMarketplace';
import '../index.css';

const Dashboard = ({ user, onLogout }) => {
    // Default Sidebar: CLOSED (as requested)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Profile');
    const [searchQuery, setSearchQuery] = useState('');

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        // Always close sidebar after selection
        setIsSidebarOpen(false);
    };

    const renderContent = () => {
        switch (activeTab) {

            case 'Profile':
                return <DashboardProfile user={user} />;
            case 'Farm Data':
                return <DashboardFarm searchQuery={searchQuery} />;
            case 'Marketplace':
                return <DashboardMarketplace searchQuery={searchQuery} />;
            case 'Trust Score':
                return <div className="flex justify-center"><AgriTrustScore /></div>;
            case 'Transactions':
                return <DashboardTransactions searchQuery={searchQuery} />;
            case 'Funding':
                return <DashboardFunding searchQuery={searchQuery} />;
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
                            onClick={() => handleTabChange('Profile')}
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

                            { id: 'Profile', icon: Users },
                            { id: 'Farm Data', icon: MapPin },
                            { id: 'Marketplace', icon: ShoppingBag },
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
                                <div className="hide-mobile group relative z-50">
                                    <div className="flex items-center bg-white border border-slate-200 rounded-full px-4 h-12 w-72 focus-within:w-96 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all shadow-sm hover:shadow-md hover:border-emerald-300">
                                        <Search size={20} className="text-slate-400 group-focus-within:text-emerald-500 transition-colors flex-shrink-0 mr-3" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search for crops, loans, schemes..."
                                            className="bg-transparent border-none outline-none text-sm font-bold text-slate-700 placeholder:text-slate-400 w-full h-full"
                                        />
                                    </div>
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
