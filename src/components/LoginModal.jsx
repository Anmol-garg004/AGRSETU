import React, { useState } from 'react';
import { X, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import '../index.css';

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

    return (
        <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            backdropFilter: 'blur(5px)'
        }}>
            <div className="modal-content" style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '400px',
                position: 'relative',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#64748B'
                    }}
                >
                    <X size={24} />
                </button>

                <div className="text-center mb-8">
                    <h2 style={{ color: '#2E7D32', marginBottom: '0.5rem' }}>Welcome Back</h2>
                    <p style={{ color: '#64748B' }}>Login to access your dashboard</p>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: '#FEE2E2',
                        color: '#991B1B',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.875rem'
                    }}>
                        <AlertCircle size={18} style={{ marginRight: '8px' }} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1E293B', fontWeight: '500' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    borderRadius: '12px',
                                    border: '1px solid #E2E8F0',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1E293B', fontWeight: '500' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    borderRadius: '12px',
                                    border: '1px solid #E2E8F0',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center' }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : (
                            <>
                                Login <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                            </>
                        )}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#64748B' }}>
                    Don't have an account? <a href="#" style={{ color: '#2E7D32', fontWeight: '600' }}>Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
