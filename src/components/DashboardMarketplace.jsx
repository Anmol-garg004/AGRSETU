import React, { useState, useRef } from 'react';
import { Camera, Search, Filter, TrendingUp, MapPin, CheckCircle, Scale, DollarSign, Upload, X, Loader2, ScanLine } from 'lucide-react';

const DashboardMarketplace = ({ searchQuery = '' }) => {
    const [isScanning, setIsScanning] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [detectedCrop, setDetectedCrop] = useState(null);
    const [cropQuality, setCropQuality] = useState(null);
    const [processingStep, setProcessingStep] = useState('');
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);

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

    const startCamera = async () => {
        try {
            setIsCameraOpen(true);
            setSelectedImage(null);
            setDetectedCrop(null);
            setCropQuality(null);
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Camera access denied:", err);
            // Fallback to file upload if camera fails
            fileInputRef.current.click();
            setIsCameraOpen(false);
        }
    };

    const capturePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0);
            const imageUrl = canvas.toDataURL('image/jpeg');

            // Stop stream
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());

            setSelectedImage(imageUrl);
            setIsCameraOpen(false);
            simulateAIDetection();
        }
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
        setCropQuality(null);

        // Simulation Sequence
        setTimeout(() => setProcessingStep('Uploading Image...'), 500);
        setTimeout(() => setProcessingStep('Analyzing Grain Texture...'), 1500);
        setTimeout(() => setProcessingStep('Evaluating Moisture Content...'), 2500);
        setTimeout(() => setProcessingStep('Grading Quality Standards...'), 3500);
        setTimeout(() => {
            setIsScanning(false);
            setDetectedCrop('Wheat'); // Simulating Wheat detection
            setCropQuality({
                grade: 'A+ Premium',
                moisture: '12.5%',
                size: 'Large Uniform',
                score: 96
            });
            setProcessingStep('');
        }, 4500);
    };

    const clearScan = () => {
        setSelectedImage(null);
        setDetectedCrop(null);
        setCropQuality(null);
        setIsScanning(false);
        setIsCameraOpen(false);
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
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
                    onClick={startCamera}
                    className="group cursor-pointer bg-slate-900 hover:bg-emerald-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center active:scale-95 relative"
                    title="Scan Crop with AI"
                >
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <Camera size={24} />
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
            </div>

            {/* AI Scanning Interface & Results */}
            {(isCameraOpen || selectedImage || isScanning) && (
                <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-4">
                    {/* Close Button */}
                    <button
                        onClick={clearScan}
                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
                    >
                        <X size={20} />
                    </button>

                    <div className={`flex flex-col gap-8 items-center ${detectedCrop ? 'justify-center' : 'md:flex-row'}`}>
                        {/* Camera / Image Preview Area - HIDE if analysis is complete */}
                        {!detectedCrop && (
                            <div className="relative w-72 h-56 bg-black rounded-2xl overflow-hidden border-2 border-slate-700 shrink-0 shadow-2xl">
                                {isCameraOpen ? (
                                    <>
                                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                                        <button
                                            onClick={capturePhoto}
                                            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full border-4 border-slate-300 flex items-center justify-center hover:scale-110 transition-transform shadow-lg z-20"
                                        >
                                            <div className="w-10 h-10 bg-rose-500 rounded-full"></div>
                                        </button>
                                    </>
                                ) : selectedImage ? (
                                    <img src={selectedImage} alt="Crop Scan" className="w-full h-full object-cover opacity-80" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-500">
                                        <Camera size={32} />
                                    </div>
                                )}

                                {/* Scanning Overlay Animation */}
                                {isScanning && (
                                    <div className="absolute inset-0 z-10 pointer-events-none">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-scan-line"></div>
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                            <div className="text-center">
                                                <Loader2 size={32} className="animate-spin text-emerald-400 mx-auto mb-2" />
                                                <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">{processingStep}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Analysis Result Text */}
                        <div className={`flex-1 space-y-4 w-full ${detectedCrop ? 'max-w-2xl mx-auto' : ''}`}>
                            {!isScanning && detectedCrop && cropQuality ? (
                                <div className="animate-in zoom-in-50 fade-in duration-500 text-center">
                                    <div className="mb-6 flex justify-center">
                                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center border-4 border-emerald-500/30 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                                            <CheckCircle size={40} />
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-black mb-2 tracking-tight">Analysis Complete</h3>
                                    <p className="text-slate-400 text-sm mb-8">
                                        Successfully identified <strong className="text-white text-lg">{detectedCrop}</strong> with <span className="text-emerald-400 font-bold">98.5% Accuracy</span>.
                                    </p>

                                    <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm grid grid-cols-1 md:grid-cols-3 gap-8 text-left relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600"></div>

                                        <div>
                                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Quality Grade</p>
                                            <p className="text-2xl font-black text-white">{cropQuality.grade}</p>
                                            <p className="text-xs text-emerald-400 font-bold mt-1">Premium Export Quality</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Moisture Content</p>
                                            <p className="text-2xl font-black text-white">{cropQuality.moisture}</p>
                                            <p className="text-xs text-slate-400 font-bold mt-1">Optimal Range</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Avg. Grain Size</p>
                                            <p className="text-2xl font-black text-white">{cropQuality.size}</p>
                                            <p className="text-xs text-slate-400 font-bold mt-1">Uniform Consistency</p>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-400">
                                        <TrendingUp size={16} className="text-emerald-500" />
                                        <span>Matched with <strong className="text-white">12 High-Value Buyers</strong> instantly.</span>
                                    </div>
                                </div>
                            ) : isCameraOpen ? (
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-white">Scan Your Crop</h3>
                                    <p className="text-slate-400 text-sm mb-4">
                                        Center the crop in the frame. Ensure good lighting for accurate AI quality grading.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs bg-white/10 px-2 py-1 rounded text-slate-300">Detects Variety</span>
                                        <span className="text-xs bg-white/10 px-2 py-1 rounded text-slate-300">Analyzes Moisture</span>
                                        <span className="text-xs bg-white/10 px-2 py-1 rounded text-slate-300">Grades Quality</span>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-slate-300">Analyzing...</h3>
                                    <p className="text-slate-500 text-sm">
                                        Calculating quality parameters...
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Overview - Hide when viewing specific crop results */}
            {!detectedCrop && (
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
            )}

            {/* Marketplace Listings */}
            <div className={detectedCrop ? "animate-in slide-in-from-bottom-8 fade-in duration-700" : ""}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                        <TrendingUp size={24} className="text-emerald-600" />
                        {detectedCrop ? (
                            <span>Best <span className="text-emerald-600 underline decoration-4 decoration-emerald-200 underline-offset-4">{detectedCrop}</span> Offers</span>
                        ) : 'Live Market Offers'}
                    </h3>
                    <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">
                        <Filter size={16} /> {detectedCrop ? 'Filtered by AI' : 'Filters'}
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
