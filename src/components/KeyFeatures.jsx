import React from 'react';
import {
    Users,
    LineChart,
    Satellite,
    Leaf,
    Mic,
    LayoutDashboard
} from 'lucide-react';
import '../index.css';

const KeyFeatures = () => {
    const features = [
        {
            icon: <Users size={32} />,
            title: "Digital Farmer Profile",
            desc: "A verified digital identity holding personal, land, and crop records securely."
        },
        {
            icon: <LineChart size={32} />,
            title: "Agri-Trust Score",
            desc: "AI-driven credit scoring model based on real-time farm income and potential."
        },
        {
            icon: <Satellite size={32} />,
            title: "Satellite Validation",
            desc: "Remote sensing data to verify crop health, land usage, and harvest estimation."
        },
        {
            icon: <Leaf size={32} />,
            title: "Crop Health AI",
            desc: "Detect diseases early with image recognition and receive actionable advice."
        },
        {
            icon: <Mic size={32} />,
            title: "Voice Assistant",
            desc: "Interact with the app in local languages (Hindi, etc.) for easy adoption."
        },
        {
            icon: <LayoutDashboard size={32} />,
            title: "Lender Dashboard",
            desc: "Banks get a comprehensive view of farmer risk profiles and portfolio health."
        }
    ];

    return (
        <section className="section bg-light" id="features">
            <div className="container">
                <h2 className="text-center mb-12">Key Features</h2>
                <div className="grid grid-3">
                    {features.map((feature, index) => (
                        <div className="card" key={index}>
                            <div className="icon-box">
                                {feature.icon}
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KeyFeatures;
