import React, { useState } from 'react';
import { X, Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import '../index.css';

import { createPortal } from 'react-dom';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // Debugging: Log when modal renders
    console.log("LoginModal Rendered. isOpen:", isOpen);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            // BYPASS LOGIN: Allow empty credentials for demo
            const userData = {
                email: email || 'demo@agrsetu.com',
                name: name || (email === 'agrsetu@gmail.com' ? 'Admin User' : 'Kishan Kumar')
            };

            onLogin(userData, rememberMe);
            onClose();
        }, 800);
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setError('');
        setName('');
        setEmail('');
        setPassword('');
    };

    return createPortal(
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(16px)',
            animation: 'none' // Disable potential broken animations
        }}>
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '440px',
                maxHeight: '90vh',
                overflowY: 'auto',
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '40px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: '1px solid #e2e8f0'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        padding: '8px',
                        borderRadius: '9999px',
                        border: 'none',
                        background: 'transparent',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.2s',
                        zIndex: 10
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#0f172a'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}
                >
                    <X size={24} />
                </button>

                <div className="text-center mb-10">
                    <div className="avatar-initials mx-auto mb-6 bg-emerald-600 text-white border-0 shadow-lg w-16 h-16 text-2xl font-black">
                        AS
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-slate-500 font-medium">Elevating rural finance with tech</p>
                </div>

                {error && (
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold mb-8">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {isSignUp && (
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1">Full Name</label>
                            <div className="group flex items-center w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl focus-within:bg-white focus-within:border-emerald-500 focus-within:scale-[1.01] transition-all px-4 shadow-sm">
                                <Mail size={20} className="text-slate-400 group-focus-within:text-emerald-500 transition-colors mr-3 flex-shrink-0" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Kishan Kumar"
                                    className="flex-1 bg-transparent border-0 outline-none font-medium text-slate-700 placeholder:text-slate-400 h-full w-full shadow-none focus:ring-0"
                                    style={{ border: 'none', outline: 'none', boxShadow: 'none', background: 'transparent' }}
                                    required={isSignUp}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1">Official Email</label>
                        <div className="group flex items-center w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl focus-within:bg-white focus-within:border-emerald-500 focus-within:scale-[1.01] transition-all px-4 shadow-sm">
                            <Mail size={20} className="text-slate-400 group-focus-within:text-emerald-500 transition-colors mr-3 flex-shrink-0" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@agrsetu.com"
                                className="flex-1 bg-transparent border-0 outline-none font-medium text-slate-700 placeholder:text-slate-400 h-full w-full shadow-none focus:ring-0"
                                style={{ border: 'none', outline: 'none', boxShadow: 'none', background: 'transparent' }}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1 mb-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Secret Key</label>
                            {!isSignUp && <a href="#" className="text-xs font-bold text-emerald-600 uppercase tracking-widest hover:underline tab-index-0">Forgot?</a>}
                        </div>
                        <div className="group flex items-center w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl focus-within:bg-white focus-within:border-emerald-500 focus-within:scale-[1.01] transition-all px-4 shadow-sm">
                            <Lock size={20} className="text-slate-400 group-focus-within:text-emerald-500 transition-colors mr-3 flex-shrink-0" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="flex-1 bg-transparent border-0 outline-none font-medium text-slate-700 placeholder:text-slate-400 h-full w-full shadow-none focus:ring-0"
                                style={{ border: 'none', outline: 'none', boxShadow: 'none', background: 'transparent' }}
                            />
                        </div>
                    </div>

                    {!isSignUp && (
                        <div className="flex items-center justify-between mt-4">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${rememberMe ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-slate-300 group-hover:border-emerald-400'}`}>
                                    {rememberMe && <CheckCircle size={14} className="text-white" />}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="hidden"
                                />
                                <span className="text-sm font-bold text-slate-500 group-hover:text-emerald-700 transition-colors">Remember Me</span>
                            </label>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn-premium w-full flex items-center justify-center h-14 text-lg mt-8 hover:scale-[1.02] active:scale-[0.98] transition-all bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-lg border-0 cursor-pointer font-bold relative overflow-hidden"
                        disabled={isLoading}
                    >
                        {isLoading ? (isSignUp ? 'Creating Account...' : 'Decrypting Access...') : (
                            <>
                                {isSignUp ? 'Sign Up' : 'Authenticate'} <ArrowRight size={20} className="ml-2" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-400 font-medium">
                        {isSignUp ? 'Already have an account? ' : 'New to AGRSETU? '}
                        <button
                            onClick={toggleMode}
                            style={{ background: 'transparent', border: 'none', padding: 0, textDecoration: 'underline' }}
                            className="text-emerald-600 font-black hover:underline cursor-pointer"
                        >
                            {isSignUp ? 'Login' : 'Sign Up'}
                        </button>
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default LoginModal;
