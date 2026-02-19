import React, { useState, useRef } from 'react';
import { Camera, Search, Filter, TrendingUp, MapPin, CheckCircle, Scale, DollarSign, Upload, X, Loader2, ScanLine } from 'lucide-react';

const DashboardMarketplace = ({ searchQuery = '' }) => {
    const [isScanning, setIsScanning] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [detectedCrop, setDetectedCrop] = useState(null);
    const [processingStep, setProcessingStep] = useState('');
    const fileInputRef = useRef(null);

    // Mock Market Offers Data
    const marketOffers = [
        {
            id: 1,
            buyer: "Reliance Fresh",
            type: "Corporate",
            crop: "Wheat",
            variety: "Sharbati",
            price: 2250,
            unit: "Quintal",
            quantityNeeded: "500 Quintals",
            distance: "12 km",
            rating: 4.8,
            verified: true,
            logo: "R"
        },
        {
            id: 2,
            buyer: "Sohna Mandi View",
            type: "Govt Mandi",
            crop: "Wheat",
            variety: "Lok-1",
            price: 2125, // MSP usually
            unit: "Quintal",
            quantityNeeded: "Unlimited",
            distance: "5 km",
            rating: 4.2,
            verified: true,
            logo: "M"
        },
        {
            id: 3,
            buyer: "Pepsico India",
            type: "Corporate",
            crop: "Potato",
            variety: "Chipsona",
            price: 1850,
            unit: "Quintal",
            quantityNeeded: "200 Quintals",
            distance: "25 km",
            rating: 4.9,
            verified: true,
            logo: "P"
        },
        {
            id: 4,
            buyer: "Local Aggregator (Ramesh)",
            type: "Private Agent",
            crop: "Mustard",
            variety: "Black",
            price: 5400,
            unit: "Quintal",
            quantityNeeded: "50 Quintals",
            distance: "2 km",
            rating: 3.8,
            verified: false,
            logo: "L"
        },
        {
            id: 5,
            buyer: "ITC Agrotech",
            type: "Corporate",
            crop: "Wheat",
            variety: "HD 2967",
            price: 2180,
            unit: "Quintal",
            quantityNeeded: "1000 Quintals",
            distance: "18 km",
            rating: 4.7,
            verified: true,
            logo: "I"
        },
        {
            id: 6,
            buyer: "BigBasket Sourcing",
            type: "Startup",
            crop: "Rice",
            variety: "Basmati 1121",
            price: 3800,
            unit: "Quintal",
            quantityNeeded: "100 Quintals",
            distance: "30 km",
            rating: 4.6,
            verified: true,
            logo: "B"
        }
    ];

    const handleCameraClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            simulateAIDetection();
        }
    };

    const simulateAIDetection = () => {
        setIsScanning(true);
        setDetectedCrop(null);

        // Simulation Sequence
        setTimeout(() => setProcessingStep('Uploading Image...'), 500);
        setTimeout(() => setProcessingStep('Analyzing Texture & Color...'), 1500);
        setTimeout(() => setProcessingStep('Matching with Database...'), 3000);
        setTimeout(() => {
            setIsScanning(false);
            setDetectedCrop('Wheat'); // Simulating Wheat detection for demo
            setProcessingStep('');
        }, 4500);
    };

    const clearScan = () => {
        setSelectedImage(null);
        setDetectedCrop(null);
        setIsScanning(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Filter Logic
    const filteredOffers = marketOffers.filter(offer => {
        // 1. Filter by Search Query (Global)
        const matchesSearch =
            offer.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
            offer.buyer.toLowerCase().includes(searchQuery.toLowerCase());

        // 2. Filter by AI Detected Crop (if active)
        const matchesDetection = detectedCrop
            ? offer.crop.toLowerCase() === detectedCrop.toLowerCase()
            : true;

        return matchesSearch && matchesDetection;
    });

    // Sort by Price (High to Low)
    const sortedOffers = [...filteredOffers].sort((a, b) => b.price - a.price);

    return (
        <div className="space-y-6 fade-in pb-12">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">e-Mandi Marketplace</h2>
                    <p className="text-slate-500 font-medium">Sell directly to the highest bidder in your area</p>
                </div>

                {/* AI Camera Button */}
                <div
                    onClick={handleCameraClick}
                    className="group cursor-pointer bg-slate-900 hover:bg-emerald-600 text-white pl-5 pr-6 py-3 rounded-2xl shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-3 active:scale-95"
                >
                    <div className="relative">
                        <Camera size={24} className="group-hover:scale-110 transition-transform" />
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></span>
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] uppercase font-bold tracking-wider opacity-80">Sell with AI</p>
                        <p className="text-sm font-black leading-none">Scan Your Crop</p>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
            </div>

            {/* AI Scanning Interface (Conditional) */}
            {(selectedImage || isScanning) && (
                <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-4">
                    {/* Close Button */}
                    <button
                        onClick={clearScan}
                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        {/* Image Preview Area */}
                        <div className="relative w-64 h-48 bg-black/50 rounded-2xl overflow-hidden border-2 border-slate-700 shrink-0">
                            {selectedImage && (
                                <img src={selectedImage} alt="Crop Scan" className="w-full h-full object-cover opacity-80" />
                            )}

                            {/* Scanning Overlay Animation */}
                            {isScanning && (
                                <div className="absolute inset-0 z-10">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-scan-line"></div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                        <div className="text-center">
                                            <Loader2 size={32} className="animate-spin text-emerald-400 mx-auto mb-2" />
                                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">{processingStep}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Detection Success Overlay */}
                            {!isScanning && detectedCrop && (
                                <div className="absolute bottom-0 left-0 w-full bg-emerald-600/90 backdrop-blur-md p-2 text-center">
                                    <p className="text-[10px] uppercase font-bold tracking-wider">AI Detected</p>
                                    <p className="text-lg font-black">{detectedCrop}</p>
                                </div>
                            )}
                        </div>

                        {/* Analysis Result Text */}
                        <div className="flex-1 space-y-4">
                            {!isScanning && detectedCrop ? (
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-2">
                                        <CheckCircle size={14} /> Scan Successful
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">We found <span className="text-emerald-400">12 Buyers</span> matching your crop.</h3>
                                    <p className="text-slate-400 text-sm">
                                        Based on your image, we identified the crop as <strong className="text-white">Premium Sharbati Wheat</strong>.
                                        Filtering the marketplace to show you the best rates for this variety.
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-slate-300">Analyzing your harvest...</h3>
                                    <p className="text-slate-500 text-sm">
                                        Our AI engine is checking for crop variety, quality, and estimated yield to find you the perfect buyer match.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Live Mandi Price</p>
                    <p className="text-xl font-black text-slate-800">₹2,125<span className="text-xs font-medium text-slate-400">/q</span></p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 shadow-sm">
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Highest Bid</p>
                    <p className="text-xl font-black text-emerald-700">₹2,250<span className="text-xs font-medium text-emerald-500">/q</span></p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Buyers</p>
                    <p className="text-xl font-black text-slate-800">42 <span className="text-xs font-medium text-slate-400">Near you</span></p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Your Rating</p>
                    <p className="text-xl font-black text-slate-800 flex items-center gap-1">4.8 <span className="text-amber-500">★</span></p>
                </div>
            </div>

            {/* Marketplace Listings */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                        <TrendingUp size={24} className="text-emerald-600" />
                        {detectedCrop ? `Best Offers for ${detectedCrop}` : 'Live Market Offers'}
                    </h3>
                    <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">
                        <Filter size={16} /> Filters
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {sortedOffers.length > 0 ? sortedOffers.map((offer) => (
                        <div key={offer.id} className="group bg-white rounded-3xl border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden">
                            {/* Top Badge */}
                            {offer.price >= 2200 && (
                                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-lg">
                                    High Demand
                                </div>
                            )}

                            {/* Buyer Header */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-md">
                                    {offer.logo}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 leading-tight">{offer.buyer}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${offer.verified ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                                            {offer.type}
                                        </span>
                                        {offer.verified && <CheckCircle size={12} className="text-blue-500" />}
                                    </div>
                                </div>
                            </div>

                            {/* Offer Details */}
                            <div className="bg-slate-50 rounded-2xl p-4 mb-4 border border-slate-100">
                                <div className="flex justify-between items-end mb-2">
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Offered Price</p>
                                        <div className="text-2xl font-black text-emerald-600 flex items-end leading-none translate-y-1">
                                            ₹{offer.price.toLocaleString()}
                                            <span className="text-xs text-slate-400 font-bold ml-1 mb-1">/{offer.unit}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Qty Req.</p>
                                        <p className="text-sm font-black text-slate-700">{offer.quantityNeeded}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Meta Info */}
                            <div className="flex items-center gap-4 mb-6 text-xs font-bold text-slate-500">
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={14} className="text-slate-400" /> {offer.distance}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Scale size={14} className="text-slate-400" /> {offer.crop} ({offer.variety})
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2">
                                    Accept Offer <DollarSign size={16} />
                                </button>
                                <button className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors">
                                    <ScanLine size={20} />
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <Search className="text-slate-300" size={32} />
                            </div>
                            <h4 className="text-slate-900 font-bold mb-1">No offers found</h4>
                            <p className="text-slate-500 text-sm">Try scanning your crop or changing filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardMarketplace;
