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
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
                if (transcript) {
                    handleAIResponse(transcript);
                } else {
                    setText("कुछ सुनाई नहीं दिया। कृपया फिर से बोलें। (Use the mic to speak)");
                }
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
                setText("कोई त्रुटि हुई। कृपया पुन: प्रयास करें। (Error occurred)");
            };
        }

        // Initialize Speech Synthesis
        synthesisRef.current = window.speechSynthesis;

        return () => {
            if (synthesisRef.current) {
                synthesisRef.current.cancel();
            }
        };
    }, [transcript]);

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

    const handleAIResponse = (userQuery) => {
        // MOCK AI LOGIC - In production, this would go to an LLM API
        const lowerQuery = userQuery.toLowerCase();
        let answer = "माफ़ कीजिये, मैं समझ नहीं पाया। क्या आप दोबारा बोल सकते हैं?"; // Default fallback

        if (lowerQuery.includes("loan") || lowerQuery.includes("loan") || lowerQuery.includes("पैसे") || lowerQuery.includes("लोन")) {
            answer = "लोन के लिए आवेदन करने के लिए, कृपया 'डैशबोर्ड' पर जाएं और अपनी जमीन के दस्तावेज अपलोड करें। हम 24 घंटे में आपकी पात्रता बता देंगे।";
        } else if (lowerQuery.includes("weather") || lowerQuery.includes("मौसम") || lowerQuery.includes("barish")) {
            answer = "अगले 3 दिनों में अच्छी बारिश होने की संभावना है। कृपया अपनी फसल की कटाई रोक कर रखें।";
        } else if (lowerQuery.includes("register") || lowerQuery.includes("khata") || lowerQuery.includes("account")) {
            answer = "खाता खोलने के लिए 'Get Started' बटन दबाएं और अपना मोबाइल नंबर दर्ज करें।";
        } else if (lowerQuery.includes("hello") || lowerQuery.includes("namaste")) {
            answer = "नमस्ते! मैं एग्री-सेतु का वॉइस असिस्टेंट हूँ। मैं आपकी कैसे मदद कर सकता हूँ?";
        }

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
