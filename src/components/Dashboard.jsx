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
    ShoppingBag,
    ExternalLink,
    Satellite
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
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    // Mock Notifications Data
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New Market Offer', message: 'Reliance Retail placed a ₹1.2L bid for your Wheat.', time: '2 mins ago', type: 'market', unread: true },
        { id: 2, title: 'Climate Alert', message: 'Heavy rain expected in Sohna region tomorrow.', time: '1 hour ago', type: 'weather', unread: true },
        { id: 3, title: 'Loan Approved!', message: 'SBI KCC application processed successfully.', time: '5 hours ago', type: 'funding', unread: false },
        { id: 4, title: 'Trust Score Sync', message: 'Your Agri-Trust Score was updated to 942.', time: 'Yesterday', type: 'trust', unread: false }
    ]);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        // Always close sidebar after selection
        setIsSidebarOpen(false);
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
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
                className={`mobile-overlay ${isSidebarOpen || isNotificationsOpen ? 'active' : ''}`}
                onClick={() => {
                    setIsSidebarOpen(false);
                    setIsNotificationsOpen(false);
                }}
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

                                {activeTab === 'Farm Data' && (
                                    <button
                                        onClick={() => window.open('https://agrsetumap.vercel.app/', '_blank')}
                                        className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all cursor-pointer shadow-sm active:scale-95 group"
                                    >
                                        <Satellite size={14} className="group-hover:rotate-12 transition-transform" />
                                        LAUNCH LIVE SATELLITE PORTAL
                                        <ExternalLink size={12} className="opacity-50" />
                                    </button>
                                )}
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

                                <div className="relative">
                                    <button
                                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                        className={`relative w-11 h-11 flex items-center justify-center rounded-full transition-all cursor-pointer shadow-sm hover:shadow-md active:scale-95 z-50
                                            ${isNotificationsOpen ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50 hover:text-emerald-600'}
                                        `}
                                    >
                                        <Bell size={20} />
                                        {notifications.some(n => n.unread) && (
                                            <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full animate-pulse"></span>
                                        )}
                                    </button>

                                    {/* Notification Dropdown */}
                                    {isNotificationsOpen && (
                                        <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200 z-[100]">
                                            <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                                                <h3 className="font-black text-sm text-slate-900 tracking-tight">Notifications</h3>
                                                <button
                                                    onClick={markAllAsRead}
                                                    className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700 cursor-pointer bg-transparent border-0"
                                                >
                                                    Mark Read
                                                </button>
                                            </div>
                                            <div className="max-h-[400px] overflow-y-auto">
                                                {notifications.length > 0 ? (
                                                    notifications.map((n) => (
                                                        <div key={n.id} className={`p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors relative cursor-pointer group`}>
                                                            {n.unread && <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-500 rounded-full"></div>}
                                                            <div className="flex gap-3">
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                                                                    ${n.type === 'market' ? 'bg-orange-100 text-orange-600' :
                                                                        n.type === 'weather' ? 'bg-blue-100 text-blue-600' :
                                                                            n.type === 'funding' ? 'bg-emerald-100 text-emerald-600' : 'bg-purple-100 text-purple-600'}
                                                                `}>
                                                                    {n.type === 'market' ? <ShoppingBag size={14} /> :
                                                                        n.type === 'weather' ? <MapPin size={14} /> :
                                                                            n.type === 'funding' ? <Landmark size={14} /> : <Award size={14} />}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-xs font-black text-slate-900 mb-0.5">{n.title}</p>
                                                                    <p className="text-[11px] font-medium text-slate-500 leading-tight mb-1">{n.message}</p>
                                                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{n.time}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-10 text-center text-slate-400">
                                                        <Bell size={24} className="mx-auto mb-2 opacity-20" />
                                                        <p className="text-xs font-bold">No new notifications</p>
                                                    </div>
                                                )}
                                            </div>
                                            <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] transition-colors border-0 cursor-pointer">
                                                View All History
                                            </button>
                                        </div>
                                    )}
                                </div>

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
