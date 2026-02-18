import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MapPin, CheckCircle } from 'lucide-react';
import '../index.css';

const Impact = () => {
    const stats = [
        { icon: <Users size={40} />, number: "10,000+", label: "Farmers Onboarded", color: "#2E7D32" },
        { icon: <TrendingUp size={40} />, number: "₹50 Cr+", label: "Loans Facilitated", color: "#1565C0" },
        { icon: <CheckCircle size={40} />, number: "40%", label: "Reduction in Defaults", color: "#F59E0B" },
        { icon: <MapPin size={40} />, number: "15+", label: "Districts Covered", color: "#7C3AED" }
    ];

    return (
        <section className="section bg-light" id="impact">
            <div className="container">
                <h2 className="text-center mb-12">Our Impact</h2>
                <div className="grid grid-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            className="stat-card card"
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="icon-box" style={{ color: stat.color, background: `${stat.color}15`, margin: '0 auto 20px' }}>
                                {stat.icon}
                            </div>
                            <div className="stat-number" style={{ color: stat.color }}>{stat.number}</div>
                            <p>{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Impact;
