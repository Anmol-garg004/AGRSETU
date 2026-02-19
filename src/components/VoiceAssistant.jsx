import React, { useState, useEffect, useRef } from 'react';
import { Mic, X, Volume2, Send, StopCircle, RefreshCw, Globe, Settings, Key } from 'lucide-react';
import '../index.css';

const VoiceAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [text, setText] = useState("नमस्ते! मैं आपका कृषि सहायक हूँ। (Hello!)");
    const [transcript, setTranscript] = useState("");
    const [selectedLang, setSelectedLang] = useState('hi-IN');
    const [apiKey, setApiKey] = useState(localStorage.getItem('elevenlabs_key') || '');
    const [showSettings, setShowSettings] = useState(false);

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

    // Response Dictionary for Multilingual Support
    const responses = {
        'hi-IN': {
            welcome: "नमस्ते! मैं आपका कृषि सहायक हूँ। पूछिये, मैं कैसे मदद कर सकता हूँ?",
            listening: "सुन रहा हूँ...",
            error: "माफ़ कीजिये, मैं समझ नहीं पाया।",
            profile: "आपका नाम किशन कुमार है। आप एक प्रगतिशील किसान हैं।",
            sales: "आपने पिछली बार 15 क्विंटल सरसों ₹6,500 के भाव पर बेची थी।",
            weather: "अगले 3 दिन मौसम साफ़ रहेगा, हल्की धूप रहेगी।",
            loan: "आपका ₹3 लाख का KCC लोन सक्रिय है। अगली किश्त 15 मार्च को है।",
            crop: "गेहूं की फसल अच्छी स्थिति में है। अभी सिंचाई की आवश्यकता है।"
        },
        'en-IN': {
            welcome: "Hello! I am your Agri Assistant. How can I help you?",
            listening: "Listening...",
            error: "Sorry, I didn't catch that.",
            profile: "You are Kishan Kumar, a verified progressive farmer.",
            sales: "You last sold 15 Quintals of Mustard at ₹6,500/quintal.",
            weather: "Weather will remain clear for next 3 days.",
            loan: "You have an active KCC Loan of ₹3 Lakhs. Next EMI is on 15th March.",
            crop: "Your Wheat crop is in good condition. Irrigation is recommended now."
        },
        'pa-IN': {
            welcome: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਖੇਤੀ ਸਹਾਇਕ ਹਾਂ। ਦੱਸੋ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
            listening: "ਸੁਣ ਰਿਹਾ ਹਾਂ...",
            error: "ਮਾਫ ਕਰਨਾ, ਮੈਂ ਸਮਝ ਨਹੀਂ ਸਕਿਆ।",
            profile: "ਤੁਹਾਡਾ ਨਾਮ ਕਿਸ਼ਨ ਕੁਮਾਰ ਹੈ। ਤੁਸੀਂ ਇੱਕ ਅਗਾਂਹਵਧੂ ਕਿਸਾਨ ਹੋ।",
            sales: "ਤੁਸੀਂ ਪਿਛਲੀ ਵਾਰ 15 ਕੁਇੰਟਲ ਸਰ੍ਹੋਂ ₹6,500 ਦੇ ਭਾਅ 'ਤੇ ਵੇਚੀ ਸੀ।",
            weather: "ਅਗਲੇ 3 ਦਿਨ ਮੌਸਮ ਸਾਫ ਰਹੇਗਾ।",
            loan: "ਤੁਹਾਡਾ ₹3 ਲੱਖ ਦਾ KCC ਲੋਨ ਚੱਲ ਰਿਹਾ ਹੈ।",
            crop: "ਕਣਕ ਦੀ ਫਸਲ ਵਧੀਆ ਹੈ। ਪਾਣੀ ਲਗਾਉਣ ਦੀ ਲੋੜ ਹੈ।"
        },
        'mr-IN': {
            welcome: "नमस्कार! मी तुमचा कृषी सहाय्यक आहे. बोला, काय मदत करू?",
            listening: "मी ऐकत आहे...",
            error: "क्षमस्व, मला समजले नाही.",
            profile: "तुमचे नाव किशन कुमार आहे.",
            sales: "तुम्ही शेवटची 15 क्विंटल मोहरी ₹6,500 दराने विकली.",
            weather: "पुढील 3 दिवस हवामान स्वच्छ राहील.",
            loan: "तुमचे ₹3 लाखांचे KCC कर्ज चालू आहे.",
            crop: "गव्हाचे पीक चांगले आहे. आता पाणी देण्याची गरज आहे."
        },
        // Fallback for others to English (simplified for this demo)
        default: {
            welcome: "Welcome! Please speak in your language.",
            listening: "Listening...",
            error: "Sorry, I didn't understand.",
            profile: "Name: Kishan Kumar.",
            sales: "Last Sale: Mustard at ₹6,500.",
            weather: "Clear weather expected.",
            loan: "Active Loan: ₹3 Lakhs.",
            crop: "Crop status: Good."
        }
    };

    const getResponseText = (key, lang) => {
        const langData = responses[lang] || responses['default'];
        return langData[key] || responses['en-IN'][key];
    };

    const saveApiKey = (key) => {
        setApiKey(key);
        localStorage.setItem('elevenlabs_key', key);
        setShowSettings(false);
    };

    const startListening = () => {
        // Stop any playing audio
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        window.speechSynthesis.cancel();

        setTranscript("");
        setText(getResponseText('listening', selectedLang));

        if (recognitionRef.current) {
            recognitionRef.current.lang = selectedLang;
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.log("Recognition active");
            }
        } else {
            alert("Voice recognition not supported.");
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    const speakText = async (content) => {
        setIsSpeaking(true);

        // Tier 1: Try ElevenLabs if API Key exists
        if (apiKey) {
            try {
                console.log("Calling ElevenLabs API...");
                // Rachel Voice ID: 21m00Tcm4TlvDq8ikWAM (Standard)
                // Use 'eleven_multilingual_v2' model for regional languages
                const voiceId = "21m00Tcm4TlvDq8ikWAM";
                const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                    method: 'POST',
                    headers: {
                        'xi-api-key': apiKey,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text: content,
                        model_id: "eleven_multilingual_v2",
                        voice_settings: {
                            stability: 0.5,
                            similarity_boost: 0.75
                        }
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
                // Fallback continues below
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

    const handleAIResponse = (userQuery) => {
        const lowerQuery = userQuery.toLowerCase();
        let key = 'error';

        // Simple Intent Classification
        if (lowerQuery.match(/(name|naam|who|parichay|नाम|परिचय)/)) key = 'profile';
        else if (lowerQuery.match(/(sold|sale|bechi|rate|price|बिक्री|बेचा|भाव)/)) key = 'sales';
        else if (lowerQuery.match(/(weather|mausam|rain|barish|मौसम|बारिश)/)) key = 'weather';
        else if (lowerQuery.match(/(loan|money|bank|karz|paisa|लोन|कर्ज|बैंक)/)) key = 'loan';
        else if (lowerQuery.match(/(crop|fasal|wheat|gehu|फसल|गेहूं)/)) key = 'crop';
        else if (lowerQuery.match(/(hello|hi|namaste|नमस्ते)/)) key = 'welcome';

        const answer = getResponseText(key, selectedLang);
        setText(answer);
        speakText(answer);
    };

    useEffect(() => {
        // Init Speech Recognition
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
    }, [selectedLang]); // Re-init if needed, but primarily reliance on ref.lang update

    if (!isOpen) {
        return (
            <button
                onClick={() => { setIsOpen(true); setText(getResponseText('welcome', selectedLang)); speakText(getResponseText('welcome', selectedLang)); }}
                className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-2xl flex items-center justify-center z-[9999] hover:scale-110 transition-transform group"
            >
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-ping"></div>
                <Mic size={32} />
            </button>
        );
    }

    return (
        <div className="fixed bottom-8 right-8 w-[360px] bg-white rounded-3xl shadow-2xl z-[9999] overflow-hidden font-sans border border-slate-100 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-emerald-500/20 p-1.5 rounded-full">
                        <Mic size={16} className="text-emerald-400" />
                    </div>
                    <span className="font-bold">Agri Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setShowSettings(!showSettings)} className="text-slate-400 hover:text-white transition-colors">
                        <Settings size={18} />
                    </button>
                    <button onClick={() => { setIsOpen(false); stopListening(); window.speechSynthesis.cancel(); audioRef.current.pause(); }} className="text-slate-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div className="p-4 bg-slate-50 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1"><Key size={12} /> ElevenLabs API Key</p>
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => saveApiKey(e.target.value)}
                        placeholder="Enter your API Key..."
                        className="w-full text-xs p-2 rounded border border-slate-200 focus:outline-none focus:border-emerald-500 mb-2"
                    />
                    <p className="text-[10px] text-slate-400">Required for generic high-quality multilingual voice. Without this, browser default voice is used.</p>
                </div>
            )}

            {/* Language Selector */}
            <div className="px-4 py-2 bg-slate-50 border-b flex items-center gap-2 overflow-x-auto no-scrollbar">
                <Globe size={14} className="text-slate-400 shrink-0" />
                {languages.map(lang => (
                    <button
                        key={lang.code}
                        onClick={() => { setSelectedLang(lang.code); }}
                        className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-all font-medium ${selectedLang === lang.code ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border text-slate-600 hover:bg-slate-100'}`}
                    >
                        {lang.label}
                    </button>
                ))}
            </div>

            {/* Chat Area */}
            <div className="p-6 min-h-[200px] flex flex-col items-center justify-center text-center bg-white relative">
                {isListening ? (
                    <div className="mb-4">
                        <div className="flex gap-1.5 h-8 items-center justify-center">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-1.5 bg-emerald-500 rounded-full animate-voice-wave" style={{ animationDelay: `${i * 0.1}s`, height: '10px' }}></div>
                            ))}
                        </div>
                        <p className="mt-4 text-emerald-600 font-bold text-sm animate-pulse">{getResponseText('listening', selectedLang)}</p>
                    </div>
                ) : (
                    <div className="mb-4 relative">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isSpeaking ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-300'}`}>
                            {isSpeaking ? <Volume2 size={32} className="animate-pulse" /> : <Mic size={32} />}
                        </div>
                        {isSpeaking && <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-ping"></div>}
                    </div>
                )}

                <p className="text-slate-800 font-medium text-lg leading-relaxed">
                    {transcript || text}
                </p>
            </div>

            {/* Controls */}
            <div className="p-4 border-t bg-slate-50 flex justify-center gap-4">
                <button
                    onClick={isListening ? stopListening : startListening}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${isListening ? 'bg-rose-500 text-white' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
                >
                    {isListening ? <StopCircle size={24} /> : <Mic size={24} />}
                </button>

                {(!isListening && transcript) && (
                    <button onClick={() => { setTranscript(""); startListening(); }} className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100 transition-colors">
                        <RefreshCw size={20} />
                    </button>
                )}
            </div>

            <style>{`
                @keyframes voice-wave {
                    0%, 100% { height: 10px; }
                    50% { height: 24px; }
                }
                .animate-voice-wave {
                    animation: voice-wave 1s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default VoiceAssistant;
