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
    ChevronRight
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
                    <div className="grid grid-3 gap-8">
                        <div className="col-span-2 space-y-8">
                            <DashboardFarm />
                            <DashboardFinancials />
                        </div>
                        <div className="col-span-1 space-y-8">
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
        <div className="dashboard-container flex">
            {/* Professional Sidebar */}
            <aside className="dashboard-sidebar w-300 h-screen bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0 z-50">
                <div className="p-8">
                    <div
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setActiveTab('Overview')}
                    >
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Leaf size={22} color="white" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-slate-800 uppercase">
                            AGR<span className="text-emerald-600">SETU</span>
                        </span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
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
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold transition-all duration-200 border-0 cursor-pointer ${activeTab === item.id
                                ? 'bg-emerald-50 text-emerald-700 shadow-sm'
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

                <div className="p-6 mt-auto border-t border-slate-50">
                    <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-white border border-emerald-500 flex items-center justify-center font-black text-emerald-600 shadow-sm">
                            KK
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-slate-800 truncate leading-none mb-1">Kishan Kumar</p>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-widest" style={{ fontSize: '10px' }}>Verified</span>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-black transition-all shadow-md cursor-pointer border-0"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Premium Main Content Area */}
            <main className="flex-1 ml-300 min-h-screen bg-slate-50 p-10 overflow-x-hidden">
                <header className="flex items-center justify-between gap-6 mb-12 fade-in">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                            Dashboard <ChevronRight size={10} /> {activeTab}
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none m-0">{activeTab}</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden lg:block">
                            <Search className="absolute left-4 top-0 text-slate-400" size={18} style={{ marginTop: '14px' }} />
                            <input
                                type="text"
                                placeholder="Search analytics..."
                                className="px-12 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-medium focus:border-emerald-500 outline-none w-64 transition-all"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button className="relative w-12 h-12 flex items-center justify-center bg-white border border-slate-100 rounded-2xl text-slate-500 hover:bg-slate-50 cursor-pointer">
                                <Bell size={20} />
                                <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
                            </button>
                            <button className="btn-premium flex items-center gap-2 border-0 cursor-pointer shadow-lg hover:shadow-xl">
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
    );
};

export default Dashboard;

