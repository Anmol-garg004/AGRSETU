import React, { useState, useEffect, useRef } from 'react';
import { Mic, X, Volume2, Send, StopCircle, RefreshCw, Globe, Settings, Key } from 'lucide-react';
import '../index.css';

const VoiceAssistant = ({ user }) => { // Accept user prop
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [text, setText] = useState("नमस्ते! मैं आपका कृषि सहायक हूँ। (Hello!)");
    const [transcript, setTranscript] = useState("");
    const [selectedLang, setSelectedLang] = useState('hi-IN');
    const [apiKey, setApiKey] = useState(localStorage.getItem('elevenlabs_key') || '');
    const [geminiKey, setGeminiKey] = useState(localStorage.getItem('gemini_key') || '');
    const [showSettings, setShowSettings] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Refs
    const recognitionRef = useRef(null);
    const audioRef = useRef(new Audio());

    const languages = [
        { code: 'hi-IN', name: 'Hindi', label: 'हिंदी' },
        { code: 'en-IN', name: 'English', label: 'English' },
        { code: 'pa-IN', name: 'Punjabi', label: 'ਪੰਜਾਬੀ' },
        { code: 'mr-IN', name: 'Marathi', label: 'मराठी' },
        { code: 'gu-IN', name: 'Gujarati', label: 'ગુજરાતી' },
        { code: 'ta-IN', name: 'Tamil', label: 'தமிழ்' },
        { code: 'te-IN', name: 'Telugu', label: 'తెలుగు' },
        { code: 'bn-IN', name: 'Bengali', label: 'বাংলা' },
        { code: 'kn-IN', name: 'Kannada', label: 'कन्नड' }
    ];

    // --- CENTRALIZED FARMER DATA (Single Source of Truth) ---
    // Use user data if available, fallback to defaults
    // --- CENTRALIZED FARMER DATA (Single Source of Truth) ---
    // Use user data if available, fallback to defaults
    const farmerData = {
        profile: {
            name: user?.name || "Kishan Kumar",
            location: "Sohna, Gurugram", // Could be dynamic if user has location
            landSize: "28 Acres", // Could come from user profile
            soil: "Alluvial (Loamy)",
            irrigation: "Tube Well (Electric)"
        },
        financials: {
            kccLimit: "₹5.0 Lakhs",
            totalEarnings: "₹39,300"
        },
        crops: [
            { name: "Wheat", harvest: "April 2026" },
            { name: "Mustard", harvest: "March 2026" },
            { name: "Potato", harvest: "Feb 2026" }
        ],
        transactions: [
            { id: "TXN001", source: "Mandi Sale (Wheat)", amount: "₹12,500", date: "Feb 18" }
        ],
        weather: {
            temp: "32°C",
            condition: "Sunny",
            rainChance: "20%"
        },
        trustScore: {
            score: 942,
            status: "Excellent"
        }
    };

    // --- DYNAMIC CONTENT GENERATION ---

    // Helper to select response template based on language
    const getLocalizedTemplate = (lang, key) => {
        const templates = {
            'en-IN': {
                welcome: `Hello ${farmerData.profile.name}! Ask me about your crops, last sale, or trust score.`,
                listening: "Listening...",
                error: "Sorry, I didn't get that. Try asking 'What was my last crop sale?' or 'My Trust Score?'",
                identity: `You are ${farmerData.profile.name}. You farm on ${farmerData.profile.landSize} in ${farmerData.profile.location}.`,
                farm_info: `You own ${farmerData.profile.landSize} of land. Soil type is ${farmerData.profile.soil}.`,
                financial_summary: `Your KCC Loan limit is ${farmerData.financials.kccLimit}. Total earnings: ${farmerData.financials.totalEarnings}.`,
                transaction_last: `Your last crop (Wheat) was sold for ${farmerData.transactions[0].amount} on ${farmerData.transactions[0].date}.`,
                weather_current: `It's ${farmerData.weather.temp} and ${farmerData.weather.condition}. Rain chance: ${farmerData.weather.rainChance}.`,
                trust_score: `Your AI Trust Score is ${farmerData.trustScore.score} (${farmerData.trustScore.status}). This is excellent!`,
                crop_advice: "Based on your soil, Wheat and Mustard are best for this season. Check the Market tab for rates.",
                crop_status: `Your crops are healthy. Wheat harvest is in ${farmerData.crops[0].harvest}.`
            },
            'hi-IN': {
                welcome: `नमस्ते ${farmerData.profile.name} जी! मैं आपकी क्या सहायता कर सकता हूँ?`,
                listening: "सुन रहा हूँ...",
                error: "माफ़ कीजिये, दोबारा बोलें। आप पूछ सकते हैं 'मेरी आखिरी फसल कितने की बिकी?' या 'मेरा ट्रस्ट स्कोर क्या है?'",
                identity: `आपका नाम ${farmerData.profile.name} है। आप ${farmerData.profile.location} में खेती करते हैं।`,
                farm_info: `आपके पास ${farmerData.profile.landSize} ज़मीन है।`,
                financial_summary: `आपकी कुल कमाई ${farmerData.financials.totalEarnings} है। लोन लिमिट ${farmerData.financials.kccLimit} है।`,
                transaction_last: `आपकी आखिरी फसल (गेहूँ) ${farmerData.transactions[0].amount} में बिकी थी (${farmerData.transactions[0].date} को)।`,
                weather_current: `अभी तापमान ${farmerData.weather.temp} है। मौसम साफ़ है।`,
                trust_score: `आपका ट्रस्ट स्कोर ${farmerData.trustScore.score} है (${farmerData.trustScore.status})। बैंक आपको आसानी से लोन देंगे।`,
                crop_advice: "आपकी मिट्टी के लिए गेहूँ और सरसों सबसे अच्छे हैं। मंडी भाव अच्छे चल रहे हैं।",
                crop_status: `आपकी फसलें स्वस्थ हैं। गेहूं की कटाई ${farmerData.crops[0].harvest} में होगी।`
            }
        };
        return templates[lang]?.[key] || templates['hi-IN'][key] || templates['en-IN'][key];
    };

    // --- INTENT CLASSIFICATION LOGIC ---
    const identifyIntent = (query, lang) => {
        const q = query.toLowerCase();

        // 1. TRANSACTIONS / SALES
        if (q.match(/(biki|bechi|becha|sold|sell|sale|aakhri fasal|pichli fasal|last crop|transaction|kimat|bhaav|rate|बिकी|बेची|बेचा|आखिरी फसल|पिछली फसल|भाव|रेट)/)) return 'transaction_last';

        // 2. IDENTITY (Stricter matching to avoid "kaun si" returning identity)
        if (q.match(/(mera naam|my name|who am i|parichay|identity|kaun hun|meri pehchan|main kaun|नाम क्या|परिचय|पहचान)/)) return 'identity';

        // 3. LAND / FARM INFO
        if (q.match(/(jameen|zameen|land|aked|acre|bigha|khet|area|size|jgah|जमीन|ज़मीन|खेत|एकड़|एकर|बीघा|रकबा)/)) return 'farm_info';

        // 4. LOAN / FINANCIAL
        if (q.match(/(loan|udhaar|kcc|limit|credit|bank|paisa|money|rupaye|karz|kamai|earnings|income|लोन|उधार|बैंक|पैसे|केसीसी|रुपये|कर्ज|क्रेडिट|कमाई|आमदनी)/)) return 'financial_summary';

        // 5. WEATHER
        if (q.match(/(mausam|weather|barish|rain|dhup|temp|garmi|sardi|pani|forecast|humid|मौसम|बारिश|धूप|तापमान|गर्मी|सर्दी|पाए|वर्षा)/)) return 'weather_current';

        // 6. TRUST SCORE
        if (q.match(/(score|trust|vishwas|rating|grade|level|bharo|credit score|स्कोर|विश्वास|रेटिंग|क्रेडिट)/)) return 'trust_score';

        // 7. CROP ADVICE / RECOMMENDATION (Questions about what to grow)
        if (q.match(/(grow|uga|laga|best crop|suggest|advice|ugana|fayda|kaunsi|kyu|गायें|उगाएं|लगाएं|सलाह|सुझाव|कौनसी)/)) return 'crop_advice';

        // 8. CROP STATUS / GENERAL CROP INFO (Questions about current crops)
        if (q.match(/(wheat|gehu|kanak|mustard|sarso|potato|aloo|crop|fasal|upjau|status|condition|swasth|health|kaise|गेहूं|कनक|सरसों|आलू|फसल|खेती|उपजाऊ|स्थिति|कैसी)/)) return 'crop_status';

        // 9. GREETING
        if (q.match(/(hello|hi|namaste|hey|नमस्ते|हेलो|नमस्कार|pranam|ram ram|राम राम|sat sri akal)/)) return 'welcome';

        return 'error';
    };

    const saveKeys = (keyType, value) => {
        if (keyType === 'elevenlabs') {
            setApiKey(value);
            localStorage.setItem('elevenlabs_key', value);
        } else if (keyType === 'gemini') {
            setGeminiKey(value);
            localStorage.setItem('gemini_key', value);
        }
    };

    const startListening = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        window.speechSynthesis.cancel();

        setTranscript("");
        setText(getLocalizedTemplate(selectedLang, 'listening'));
        setIsListening(true);

        if (recognitionRef.current) {
            recognitionRef.current.lang = selectedLang;
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.log("Recognition restart");
            }
        } else {
            alert("Voice recognition not supported.");
            setIsListening(false);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsListening(false);
    };

    const speakText = async (content) => {
        setIsSpeaking(true);

        // Tier 1: Try ElevenLabs if API Key exists
        if (apiKey) {
            try {
                // Rachel Voice ID: 21m00Tcm4TlvDq8ikWAM
                const voiceId = "21m00Tcm4TlvDq8ikWAM";
                const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                    method: 'POST',
                    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        text: content,
                        model_id: "eleven_multilingual_v2",
                        voice_settings: { stability: 0.5, similarity_boost: 0.75 }
                    })
                });

                if (!response.ok) throw new Error('ElevenLabs API Error');

                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                audioRef.current.src = url;
                audioRef.current.onended = () => setIsSpeaking(false);
                audioRef.current.play();
                return;

            } catch (error) {
                console.error("ElevenLabs Failed, switching to browser TTS:", error);
            }
        }

        // Tier 2: Fallback to Browser Native TTS
        const utterance = new SpeechSynthesisUtterance(content);
        utterance.lang = selectedLang;
        utterance.pitch = 1;
        utterance.rate = 0.9;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    const handleAIResponse = async (userQuery) => {
        // TIER 1: ADVANCED AI (Google Gemini)
        if (geminiKey) {
            setIsProcessing(true);
            try {
                const prompt = `
                You are an expert AI Agricultural Assistant for a farmer named Kishan Kumar.
                
                CTX: USER DATA (JSON):
                ${JSON.stringify(farmerData)}

                INSTRUCTIONS:
                1. Answer the user's query mainly based on the provided JSON data.
                2. If the query is about general farming advise, use your general knowledge.
                3. Keep the response SHORT (max 2-3 sentences) and spoken-friendly.
                4. REPLY IN THE SAME LANGUAGE AS THE USER QUERY (or the selected language: ${selectedLang}).
                5. Be polite and respectful (Use "Ji" for respect in Hindi/Indian languages).
                
                USER QUERY: "${userQuery}"
                
                RESPONSE:`;

                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                });

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error.message || 'Gemini API Error');
                }

                if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                    const aiText = data.candidates[0].content.parts[0].text;
                    setText(aiText);
                    speakText(aiText);
                } else {
                    throw new Error('No content in response');
                }
                setIsProcessing(false);
                return;

            } catch (error) {
                console.error("Gemini API Error:", error);
                setText(`Error: ${error.message}. Switching to basic mode.`);
                // Fallback to basic mode
            }
            setIsProcessing(false);
        }

        // TIER 2: RULES BASED (Regex Fallback)
        const intent = identifyIntent(userQuery, selectedLang);
        const answer = getLocalizedTemplate(selectedLang, intent);
        setText(answer);
        speakText(answer);
    };

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onstart = () => setIsListening(true);
            recognitionRef.current.onend = () => setIsListening(false);

            recognitionRef.current.onresult = (event) => {
                const results = event.results;
                const transcriptText = Array.from(results).map(r => r[0].transcript).join('');
                setTranscript(transcriptText);

                if (results[results.length - 1].isFinal) {
                    handleAIResponse(transcriptText);
                    stopListening();
                }
            };
        }
        return () => {
            window.speechSynthesis.cancel();
            audioRef.current.pause();
        };
    }, [selectedLang]);

    if (!isOpen) {
        return (
            <button
                onClick={() => { setIsOpen(true); setText(getLocalizedTemplate(selectedLang, 'welcome')); speakText(getLocalizedTemplate(selectedLang, 'welcome')); }}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.5)',
                    cursor: 'pointer',
                    zIndex: 9999,
                    border: '4px solid white',
                    transition: 'transform 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid rgba(16, 185, 129, 0.3)', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
                <Mic size={32} />
                <style>{`@keyframes ping { 75%, 100% { transform: scale(1.5); opacity: 0; } }`}</style>
            </button>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '360px',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)',
            zIndex: 9999,
            overflow: 'hidden',
            fontFamily: "'Outfit', sans-serif",
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
            {/* Header */}
            <div style={{
                backgroundColor: '#0f172a', /* slate-900 */
                color: 'white',
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', padding: '6px', borderRadius: '50%' }}>
                        <Mic size={16} color="#34d399" />
                    </div>
                    <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Agri Assistant</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        style={{ color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                        onMouseEnter={(e) => e.target.style.color = 'white'}
                        onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                    >
                        <Settings size={18} />
                    </button>
                    <button
                        onClick={() => { setIsOpen(false); stopListening(); window.speechSynthesis.cancel(); audioRef.current.pause(); }}
                        style={{ color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                        onMouseEnter={(e) => e.target.style.color = 'white'}
                        onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>

                    {/* Gemini Key Input */}
                    <div style={{ marginBottom: '12px' }}>
                        <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#10b981', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '14px' }}>✨</span> Enable Advanced AI (Gemini)
                        </p>
                        <input
                            type="password"
                            value={geminiKey}
                            onChange={(e) => saveKeys('gemini', e.target.value)}
                            placeholder="Paste Google Gemini API Key..."
                            style={{
                                width: '100%',
                                fontSize: '0.75rem',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #10b981',
                                outline: 'none',
                                marginBottom: '4px',
                                backgroundColor: '#ecfdf5'
                            }}
                        />
                        <p style={{ fontSize: '10px', color: '#64748b', margin: 0 }}>
                            Get a free key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: '#10b981', textDecoration: 'underline' }}>Google AI Studio</a>.
                        </p>
                    </div>

                    {/* ElevenLabs Key Input */}
                    <div>
                        <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Volume2 size={12} /> ElevenLabs Voice API (Optional)
                        </p>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => saveKeys('elevenlabs', e.target.value)}
                            placeholder="ElevenLabs API Key..."
                            style={{
                                width: '100%',
                                fontSize: '0.75rem',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #e2e8f0',
                                outline: 'none',
                                marginBottom: '4px'
                            }}
                        />
                        <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>Required for generic high-quality multilingual voice. Without this, browser default voice is used.</p>
                    </div>
                </div>
            )}

            {/* Language Selector */}
            <div style={{
                padding: '8px 16px',
                backgroundColor: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                scrollbarWidth: 'none'
            }}>
                <Globe size={14} color="#94a3b8" style={{ flexShrink: 0 }} />
                {languages.map(lang => (
                    <button
                        key={lang.code}
                        onClick={() => { setSelectedLang(lang.code); }}
                        style={{
                            fontSize: '0.75rem',
                            padding: '4px 12px',
                            borderRadius: '999px',
                            transition: 'all 0.2s',
                            cursor: 'pointer',
                            border: selectedLang === lang.code ? 'none' : '1px solid #e2e8f0',
                            backgroundColor: selectedLang === lang.code ? '#059669' : 'white',
                            color: selectedLang === lang.code ? 'white' : '#475569',
                            boxShadow: selectedLang === lang.code ? '0 2px 5px rgba(5,150,105,0.2)' : 'none',
                            fontWeight: '500'
                        }}
                    >
                        {lang.label}
                    </button>
                ))}
            </div>

            {/* Chat Area */}
            <div style={{
                padding: '24px',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                backgroundColor: 'white',
                position: 'relative'
            }}>
                {isListening ? (
                    <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', gap: '6px', height: '32px', alignItems: 'center', justifyContent: 'center' }}>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="animate-voice-wave" style={{
                                    width: '6px',
                                    borderRadius: '999px',
                                    backgroundColor: '#10b981',
                                    animationDelay: `${i * 0.1}s`,
                                    height: '10px'
                                }}></div>
                            ))}
                        </div>
                        <p style={{ marginTop: '16px', color: '#059669', fontWeight: '700', fontSize: '0.875rem' }}>
                            {getLocalizedTemplate(selectedLang, 'listening')}
                        </p>
                    </div>
                ) : (
                    <div style={{ marginBottom: '16px', position: 'relative' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (isSpeaking || isProcessing) ? '#ecfdf5' : '#f8fafc',
                            color: (isSpeaking || isProcessing) ? '#059669' : '#cbd5e1'
                        }}>
                            {isProcessing ? (
                                <div style={{ width: '24px', height: '24px', border: '2px solid #059669', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                            ) : (
                                isSpeaking ? <Volume2 size={32} /> : <Mic size={32} />
                            )}
                        </div>
                        {isSpeaking && <div style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            border: '2px solid rgba(16, 185, 129, 0.3)',
                            animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                        }}></div>}
                    </div>
                )}

                <p style={{
                    color: '#1e293b',
                    fontWeight: '500',
                    fontSize: '1.125rem',
                    lineHeight: '1.6',
                    margin: 0
                }}>
                    {transcript || text}
                </p>
            </div>

            {/* Controls */}
            <div style={{
                padding: '16px',
                borderTop: '1px solid #f1f5f9',
                backgroundColor: '#f8fafc',
                display: 'flex',
                justifyContent: 'center',
                gap: '16px'
            }}>
                <button
                    onClick={isListening ? stopListening : startListening}
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.1s',
                        cursor: 'pointer',
                        border: 'none',
                        backgroundColor: isListening ? '#f43f5e' : '#059669',
                        color: 'white'
                    }}
                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {isListening ? <StopCircle size={24} /> : <Mic size={24} />}
                </button>

                {(!isListening && transcript) && (
                    <button
                        onClick={() => { setTranscript(""); startListening(); }}
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            color: '#64748b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                    >
                        <RefreshCw size={20} />
                    </button>
                )}
            </div>

            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes voice-wave {
                    0%, 100% { height: 10px; }
                    50% { height: 24px; }
                }
                .animate-voice-wave {
                    animation: voice-wave 1s ease-in-out infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                /* Hide Scrollbar for language selector */
                div::-webkit-scrollbar {
                    display: none; 
                }
            `}</style>
        </div>
    );
};

export default VoiceAssistant;
