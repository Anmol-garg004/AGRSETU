import React, { useState } from 'react';
import { X, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import '../index.css';

import { createPortal } from 'react-dom';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            if (email === 'agrsetu@gmail.com' && password === 'agrsetu@2026') {
                onLogin({ email, name: 'Admin User' });
                onClose();
            } else {
                setError('Invalid credentials. Please try again.');
                setIsLoading(false);
            }
        }, 1000);
    };

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 fade-in" style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(16px)' }}>
            <div className="card p-10 w-full shadow-2xl relative bg-white border border-slate-200" style={{ maxWidth: '440px', maxHeight: '90vh', overflowY: 'auto' }}>
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-xl hover:bg-slate-50 transition-all border-0 bg-transparent text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                    <X size={22} />
                </button>

                <div className="text-center mb-10">
                    <div className="avatar-initials mx-auto mb-6 bg-emerald-600 text-white border-0 shadow-lg w-16 h-16 text-2xl font-black">
                        AS
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Welcome Back</h2>
                    <p className="text-slate-500 font-medium">Elevating rural finance with tech</p>
                </div>

                {error && (
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold mb-8">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Official Email</label>
                        <div className="relative group">
                            <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@agrsetu.com"
                                className="w-full pl-12 h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-emerald-500 focus:outline-none transition-all font-medium text-slate-700"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Secret Key</label>
                            <a href="#" className="text-xs font-bold text-emerald-600 uppercase tracking-widest hover:underline">Forgot?</a>
                        </div>
                        <div className="relative group">
                            <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-12 h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-emerald-500 focus:outline-none transition-all font-medium text-slate-700"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-premium w-full justify-center h-14 text-lg mt-6 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Decrypting Access...' : (
                            <>
                                Authenticate <ArrowRight size={20} className="ml-2" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-400 font-medium">
                        New to AGRSETU? <a href="#" className="text-emerald-600 font-black hover:underline">Partner with us</a>
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default LoginModal;
