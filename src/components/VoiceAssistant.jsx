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
        'ta-IN': {
            welcome: "வணக்கம்! நான் உங்கள் விவசாய உதவியாளர். நான் உங்களுக்கு எப்படி உதவ முடியும்?",
            listening: "கேட்கிறது...",
            error: "மன்னிக்கவும், எனக்கு புரியவில்லை.",
            profile: "உங்கள் பெயர் கிஷன் குமார். நீங்கள் ஒரு முற்போக்கு விவசாயி.",
            sales: "நீங்கள் கடைசியாக 15 குவிண்டால் கடுகை ஒரு குவிண்டால் ₹6,500க்கு விற்றீர்கள்.",
            weather: "அடுத்த 3 நாட்களுக்கு வானிலை தெளிவாக இருக்கும்.",
            loan: "உங்களிடம் ₹3 லட்சம் KCC கடன் உள்ளது. அடுத்த தவணை மார்ச் 15 ஆம் தேதி.",
            crop: "உங்கள் கோதுமை பயிர் நல்ல நிலையில் உள்ளது. இப்போது நீர்ப்பாசனம் பரிந்துரைக்கப்படுகிறது."
        },
        'te-IN': {
            welcome: "నమస్కారం! నేను మీ అగ్రి అసిస్టెంట్. నేను మీకు ఎలా సహాయం చేయగలను?",
            listening: "వింటున్నాను...",
            error: "క్షమించండి, నాకు అర్థం కాలేదు.",
            profile: "మీ పేరు కిషన్ కుమార్. మీరు ప్రగతిశీల రైతు.",
            sales: "మీరు చివరిసారిగా 15 క్వింటాళ్ల ఆవాలు ₹6,500 ధరకు విక్రయించారు.",
            weather: "రానున్న 3 రోజులు వాతావరణం పొడిగా ఉంటుంది.",
            loan: "మీకు ₹3 లక్షల KCC లోన్ యాక్టివ్‌గా ఉంది. తదుపరి EMI మార్చి 15న ఉంది.",
            crop: "మీ గోధుమ పంట మంచి పరిస్థితిలో ఉంది. ఇప్పుడు నీటిపారుదల అవసరం."
        },
        'bn-IN': {
            welcome: "নমস্কার! আমি আপনার কৃষি সহকারী। আমি আপনাকে কিভাবে সাহায্য করতে পারি?",
            listening: "শুনছি...",
            error: "দুঃখিত, আমি বুঝতে পারিনি।",
            profile: "আপনার নাম কিষাণ কুমার। আপনি একজন প্রগতিশীল কৃষক।",
            sales: "আপনি শেষবার প্রতি কুইন্টাল ৬,৫০০ টাকায় ১৫ কুইন্টাল সরিষা বিক্রি করেছিলেন।",
            weather: "আগামী ৩ দিন আবহাওয়া পরিষ্কার থাকবে।",
            loan: "আপনার ৩ লক্ষ টাকার কেসিসি ঋণ সক্রিয় আছে। পরবর্তী কিস্তি ১৫ই মার্চ।",
            crop: "আপনার গমের ফসল ভালো অবস্থায় আছে। এখন সেচ দেওয়া প্রয়োজন।"
        },
        'kn-IN': {
            welcome: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕೃಷಿ ಸಹಾಯಕ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
            listening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ...",
            error: "ಕ್ಷಮಿಸಿ, ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ.",
            profile: "ನಿಮ್ಮ ಹೆಸರು ಕಿಶನ್ ಕುಮಾರ್. ನೀವು ಪ್ರಗತಿಪರ ರೈತರು.",
            sales: "ನೀವು ಕೊನೆಯದಾಗಿ 15 ಕ್ವಿಂಟಾಲ್ ಸಾಸಿವೆಯನ್ನು ₹6,500 ದರದಲ್ಲಿ ಮಾರಾಟ ಮಾಡಿದ್ದೀರಿ.",
            weather: "ಮುಂದಿನ 3 ದಿನಗಳ ಕಾಲ ಹವಾಮಾನ ಸ್ಪಷ್ಟವಾಗಿರುತ್ತದೆ.",
            loan: "ನಿಮ್ಮ ₹3 ಲಕ್ಷ KCC ಸಾಲ ಸಕ್ರಿಯವಾಗಿದೆ. ಮುಂದಿನ ಕಂತು ಮಾರ್ಚ್ 15 ರಂದು.",
            crop: "ನಿಮ್ಮ ಗೋಧಿ ಬೆಳೆ ಉತ್ತಮ ಸ್ಥಿತಿಯಲ್ಲಿದೆ. ಈಗ ನೀರಾವರಿ ಅಗತ್ಯವಿದೆ."
        },
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
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Key size={12} /> ElevenLabs API Key
                    </p>
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => saveApiKey(e.target.value)}
                        placeholder="Enter your API Key..."
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
                            {getResponseText('listening', selectedLang)}
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
                            backgroundColor: isSpeaking ? '#ecfdf5' : '#f8fafc',
                            color: isSpeaking ? '#059669' : '#cbd5e1'
                        }}>
                            {isSpeaking ? <Volume2 size={32} /> : <Mic size={32} />}
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
                /* Hide Scrollbar for language selector */
                div::-webkit-scrollbar {
                    display: none; 
                }
            `}</style>
        </div>
    );
};

export default VoiceAssistant;
