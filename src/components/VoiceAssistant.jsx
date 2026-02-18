import React, { useState, useEffect, useRef } from 'react';
import { Mic, X, Volume2, Send, StopCircle, RefreshCw } from 'lucide-react';
import '../index.css';

const VoiceAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [text, setText] = useState("नमस्ते! मैं आपका कृषि सहायक हूँ। (Hello! I am your Agri Assistant.)");
    const [transcript, setTranscript] = useState("");

    // Refs for speech synthesis and recognition
    const recognitionRef = useRef(null);
    const synthesisRef = useRef(null);

    useEffect(() => {
        // Initialize Speech Synthesis
        synthesisRef.current = window.speechSynthesis;

        // Initialize Speech Recognition
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'hi-IN'; // Default to Hindi/Indian context

            recognitionRef.current.onstart = () => {
                setIsListening(true);
                setText("सुन रहा हूँ... (Listening...)");
            };

            recognitionRef.current.onresult = (event) => {
                const transcriptText = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');
                setTranscript(transcriptText);

                // If final result, handle it immediately
                if (event.results[0].isFinal) {
                    handleAIResponse(transcriptText);
                    stopListening();
                }
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
                // We rely on isFinal check above to trigger response, 
                // or manual stop. 
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
                if (event.error !== 'no-speech') {
                    setText("कोई त्रुटि हुई। कृपया पुन: प्रयास करें। (Error occurred)");
                }
            };
        }

        return () => {
            if (synthesisRef.current) {
                synthesisRef.current.cancel();
            }
            if (recognitionRef.current) {
                // recognitionRef.current.stop(); // Don't aggressive stop on unmount to avoid errors if already stopped
            }
        };
    }, []); // Empty dependency array to run only once!

    const startListening = () => {
        if (synthesisRef.current.speaking) synthesisRef.current.cancel();
        setTranscript("");
        setText("बोलिये, आपकी क्या समस्या है? (Speak now...)");
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
            } catch (e) {
                // If already started
                console.log("Recognition active");
            }
        } else {
            alert("Voice recognition not supported in this browser.");
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    const speakText = (content) => {
        if (!synthesisRef.current) return;

        // Cancel previous utterances
        synthesisRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(content);
        utterance.lang = 'hi-IN'; // Try to match Hindi
        utterance.pitch = 1;
        utterance.rate = 0.9; // Slightly slower for clarity

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        synthesisRef.current.speak(utterance);
    };

    // Mock Data for Voice Assistant to access
    // Massively Expanded Mock Data for Voice Assistant
    const farmerData = {
        name: "Kishan Kumar",
        age: "42 Years",
        village: "Sonepat, Haryana",
        family: "Savitri Devi (Wife), 2 Children (Son in 8th standard, Daughter in 6th)",
        landSize: "5 Acres",
        soilType: "Alluvial (Doamat)",
        currentCrop: "Wheat (Gehu)",
        yieldHistory: "Last year we harvested 45 quintals of Wheat and 60 quintals of Paddy.",
        livestock: "3 Buffaloes (Murrah breed) and 2 Sahiwal Cows. Milk production is 20 Liters daily.",
        machinery: "Mahindra Tractor, Electric Pump, and Thresher",
        income: "₹8,50,000 per year",
        loanStatus: "Active - KCC Loan of ₹3 Lakhs from SBI, ₹2 Lakhs remaining",
        creditScore: "750 (Excellent)",
        nextEmi: "15th March 2026",
        governmentSchemes: "Active in PM-Kisan (₹2,000 installment received in January) and Fasal Bima Yojana.",
        advisory: "Urgent: Light irrigation recommended in 2 days as temperatures might rise. Avoid urea application right now."
    };

    const handleAIResponse = (userQuery) => {
        // MOCK AI LOGIC - In production, this would go to an LLM API
        console.log("User Query:", userQuery); // Debugging

        // Normalize: lowercase and remove trailing punctuation/spaces
        const lowerQuery = userQuery.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");

        let answer = "माफ़ कीजिये, मैं ठीक से सुन नहीं पाया। क्या आप एग्री-सेतु से अपनी लोन, फसल या योजना की जानकारी चाहते हैं?";

        // 1. PERSONAL & FAMILY (Naam/Family/Bache)
        if (lowerQuery.match(/(profile|name|naam|nam|parichay|identity|who am i|mera|identity|kaun hu|family|pariwar|wi|husband|bac|girl|boy|son|daughter|savitri)/i)) {
            answer = `आपका नाम ${farmerData.name} है। आपका परिवार में आपकी पत्नी ${farmerData.family} हैं।`;
        }
        // 2. FARM & SOIL (Kheti/Zameen/Mitti)
        else if (lowerQuery.match(/(farm|land|zameen|jameen|kheti|soil|mitti|acre|bigha|killa|het|field)/i)) {
            answer = `आपके पास ${farmerData.landSize} उपजाऊ जमीन है, जिसकी मिट्टी ${farmerData.soilType} है।`;
        }
        // 3. CROP & YIELD HISTORY (Fasal/Yie/Pida/Harvest)
        else if (lowerQuery.match(/(crop|fasal|gehu|wheat|dhan|paddy|harvest|yield|paida|cut|pichli|last year|kitni)/i)) {
            answer = `अभी खेत में ${farmerData.currentCrop} है। ${farmerData.yieldHistory}`;
        }
        // 4. LIVESTOCK (Cow/Buffalo/Pashu/Doodh/Milk)
        else if (lowerQuery.match(/(cow|buffalo|gaay|bhains|pashu|animal|milk|doodh|dairy|litre|animal)/i)) {
            answer = `आपके पास ${farmerData.livestock}`;
        }
        // 5. MACHINERY (Tractor/Pump/Machine)
        else if (lowerQuery.match(/(tractor|pump|machine|auzar|tool|thresher|mahindra|bijli)/i)) {
            answer = `आपके पास ${farmerData.machinery} उपलब्ध है।`;
        }
        // 6. FINANCIALS & LOAN (Loan/Karz/Income/EMI)
        else if (lowerQuery.match(/(loan|karz|udhar|paisa|money|income|kamai|emi|debt|kcc|bank|sbi|rin|byaj|balance)/i)) {
            answer = `आपकी सालाना कमाई ${farmerData.income} है। ${farmerData.loanStatus}। अगली किश्त ${farmerData.nextEmi} को देनी है।`;
        }
        // 7. CREDIT SCORE (Score/Trust/Credit)
        else if (lowerQuery.match(/(score|trust|credit|bharo|rating|number|ank|point|cibil)/i)) {
            answer = `आपका एग्री-ट्रस्ट स्कोर ${farmerData.creditScore} है। आपकी साख बहुत अच्छी है!`;
        }
        // 8. GOVERNMENT SCHEMES (Yojana/Sarkari/Scheme/PM Kisan)
        else if (lowerQuery.match(/(yojana|scheme|sarkari|pm|kisan|bima|insurance|paisa|benefit|subsidy|labh)/i)) {
            answer = `सरकारी योजना: ${farmerData.governmentSchemes}`;
        }
        // 9. ADVISORY & WEATHER (Salah/Weather/Barish)
        else if (lowerQuery.match(/(advisory|salah|upay|sujhav|tips|weather|mausam|barish|rain|dhup)/i)) {
            answer = `मेरी सलाह: ${farmerData.advisory} मौसम: अगले 3 दिन साफ़ रहेंगे।`;
        }
        // 10. MARKET & PRICE (Mandi/Price/Rate)
        else if (lowerQuery.match(/(price|rate|bhav|mandi|market|bazar|cost|dam|kimat)/i)) {
            answer = "सोनीपत मंडी में गेहूं ₹2125 और धान ₹3500 प्रति क्विंटल है। आप अपना सामान मंडी ले जा सकते हैं।";
        }
        // 11. GREETINGS
        else if (lowerQuery.match(/(hello|hi|namaste|pranam|ram|hallo|hey)/i)) {
            answer = `राम राम ${farmerData.name} जी! मैं एग्री-सेतु का आवाज़ सहायक हूँ। आपकी खेती, पशु या लोन की क्या जानकारी दूँ?`;
        }
        // 12. CONTACT
        else if (lowerQuery.match(/(support|call|phone|number|sampark|contact|baat)/i)) {
            answer = "सहायता के लिए +91 98765 43210 पर कॉल करें।";
        }

        console.log("Response Sent:", answer);
        setText(answer);
        speakText(answer);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => { setIsOpen(true); speakText("नमस्ते किसान भाई, मैं आपकी क्या सेवा कर सकता हूँ?"); }}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', // Google-like Blue
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 8px 30px rgba(37, 99, 235, 0.4)',
                    cursor: 'pointer',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
            >
                {/* Pulse Animation Ring */}
                <div style={{
                    position: 'absolute',
                    inset: '-5px',
                    borderRadius: '50%',
                    border: '2px solid rgba(37, 99, 235, 0.3)',
                    animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
                }}></div>
                <Mic size={32} />
            </button>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '350px',
            background: 'white',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            zIndex: 9999,
            overflow: 'hidden',
            fontFamily: "'Outfit', sans-serif",
            animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
            {/* Header */}
            <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: 'white', padding: '6px', borderRadius: '50%' }}>
                        <Mic size={18} color="#2563EB" />
                    </div>
                    <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>Agri Assistant</span>
                </div>
                <button onClick={() => { setIsOpen(false); stopListening(); synthesisRef.current.cancel(); }} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                    <X size={24} />
                </button>
            </div>

            {/* Chat Area */}
            <div style={{ padding: '24px', minHeight: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>

                {isListening ? (
                    <div style={{ marginBottom: '20px' }}>
                        {/* Google Assistant-like Dots Animation */}
                        <div className="voice-wave" style={{ display: 'flex', gap: '6px', height: '30px', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ width: '6px', height: '10px', background: '#4285F4', borderRadius: '4px', animation: 'wave 1s infinite 0.1s' }}></span>
                            <span style={{ width: '6px', height: '20px', background: '#EA4335', borderRadius: '4px', animation: 'wave 1s infinite 0.2s' }}></span>
                            <span style={{ width: '6px', height: '15px', background: '#FBBC05', borderRadius: '4px', animation: 'wave 1s infinite 0.3s' }}></span>
                            <span style={{ width: '6px', height: '25px', background: '#34A853', borderRadius: '4px', animation: 'wave 1s infinite 0.4s' }}></span>
                        </div>
                        <p style={{ marginTop: '16px', color: '#64748B', fontWeight: '500' }}>सुन रहा हूँ...<br /><span style={{ fontSize: '0.8rem', opacity: 0.7 }}>(Listening...)</span></p>
                    </div>
                ) : (
                    <div style={{ marginBottom: '10px' }}>
                        {isSpeaking ? (
                            <Volume2 size={48} color="#2563EB" style={{ animation: 'pulse 1s infinite' }} />
                        ) : (
                            <Mic size={48} color="#CBD5E1" />
                        )}
                    </div>
                )}

                <p style={{
                    fontSize: '1.1rem',
                    color: '#1E293B',
                    marginBottom: '8px',
                    fontWeight: '500',
                    lineHeight: '1.5'
                }}>
                    {transcript || text}
                </p>
            </div>

            {/* Controls */}
            <div style={{ padding: '20px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'center', gap: '16px', background: '#FAFAFA' }}>
                <button
                    onClick={isListening ? stopListening : startListening}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: isListening ? '#EF4444' : '#2563EB',
                        border: 'none',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}
                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {isListening ? <StopCircle size={28} /> : <Mic size={28} />}
                </button>

                {(!isListening && transcript) && (
                    <button
                        onClick={() => { setTranscript(""); startListening(); }}
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: 'white',
                            border: '1px solid #E2E8F0',
                            color: '#64748B',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
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
                @keyframes ping {
                    75%, 100% { transform: scale(1.5); opacity: 0; }
                }
                @keyframes wave {
                    0%, 100% { height: 10px; }
                    50% { height: 30px; }
                }
            `}</style>
        </div>
    );
};

export default VoiceAssistant;
