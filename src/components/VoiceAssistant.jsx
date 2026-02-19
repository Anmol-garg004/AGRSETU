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

    // --- CENTRALIZED FARMER DATA (Single Source of Truth) ---
    const farmerData = {
        profile: {
            name: "Kishan Kumar",
            id: "UP-VNS-789012",
            location: "Rampur, Varanasi",
            landSize: "5.2 Acres",
            soil: "Alluvial (Loamy)",
            irrigation: "Tube Well (Electric)"
        },
        financials: {
            bank: "State Bank of India",
            accountLast4: "4521",
            kccLimit: "₹3.0 Lakhs",
            kccStatus: "Active",
            savingsBalance: "₹20,700",
            totalEarnings: "₹39,300"
        },
        crops: [
            { name: "Wheat", stage: "Vegetative", health: "Excellent", harvest: "April 2026" },
            { name: "Mustard", stage: "Flowering", health: "Good", harvest: "March 2026" },
            { name: "Potato", stage: "Planting", health: "Excellent", harvest: "Feb 2026" }
        ],
        transactions: [
            { id: "TXN001", source: "Mandi Sale (Wheat)", amount: "₹12,500", date: "Feb 18" },
            { id: "TXN002", source: "PM-Kisan", amount: "₹2,000", date: "Feb 15" }
        ],
        weather: {
            temp: "32°C",
            condition: "Sunny/Clear",
            rainChance: "20%"
        },
        trustScore: {
            score: 840,
            status: "Excellent",
            credit: "High"
        }
    };

    // --- DYNAMIC CONTENT GENERATION ---

    // Helper to select response template based on language
    const getLocalizedTemplate = (lang, key) => {
        const templates = {
            'en-IN': {
                welcome: "Hello Kishan Ji! I am your Agri Assistant. Ask me about your Wheat, Mustard, Potato, loans, or weather.",
                listening: "Listening...",
                error: "Sorry, I didn't understand that. Please try asking about specific crops or your bank balance.",
                identity: `You are Kishan Kumar from Rampur. You farm on ${farmerData.profile.landSize} of land.`,
                farm_info: `You have ${farmerData.profile.landSize} of land with ${farmerData.profile.soil} soil. Irrigation source is ${farmerData.profile.irrigation}.`,
                crop_status: `You are currently growing Wheat (Vegetative), Mustard (Flowering), and Potato (Planting). All crops are healthy.`,
                crop_wheat: `Your Wheat crop is in the Vegetative stage and looks Excellent. Expected harvest is ${farmerData.crops[0].harvest}.`,
                crop_mustard: `Your Mustard crop is currently Flowering with Good health. Harvest is expected by ${farmerData.crops[1].harvest}.`,
                crop_potato: `Your Potato crop is in the Planting phase and is in Excellent condition. Harvest due in ${farmerData.crops[2].harvest}.`,
                financial_summary: `You have an active KCC Loan limit of ${farmerData.financials.kccLimit}. Your total earnings this season are ${farmerData.financials.totalEarnings}.`,
                transaction_last: `Your last transaction was a ${farmerData.transactions[0].source} of ${farmerData.transactions[0].amount} on ${farmerData.transactions[0].date}.`,
                weather_current: `It is currently ${farmerData.weather.temp} and ${farmerData.weather.condition}. Rain chance is ${farmerData.weather.rainChance}.`,
                trust_score: `Your Agri Trust Score is ${farmerData.trustScore.score}, which is ${farmerData.trustScore.status}. Banks are ready to lend.`,
                market_price: "Wheat mandate price is ₹2,125/quintal. Potato is trading at ₹800-900/quintal in local Mandi."
            },
            'hi-IN': {
                welcome: "नमस्ते किशन जी! मैं आपका कृषि सहायक हूँ। आप मुझसे गेहूं, सरसों, आलू, लोन या मौसम के बारे में पूछें।",
                listening: "सुन रहा हूँ...",
                error: "माफ़ कीजिये, मैं समझ नहीं पाया। कृपया फसल या बैंक के बारे में स्पष्ट पूछें।",
                identity: `आप किशन कुमार हैं, रामपुर से। आपके पास ${farmerData.profile.landSize} ज़मीन है।`,
                farm_info: `आपकी ज़मीन ${farmerData.profile.landSize} है और मिट्टी ${farmerData.profile.soil} है। सिंचाई ${farmerData.profile.irrigation} से होती है।`,
                crop_status: `अभी आप गेहूं, सरसों और आलू उगा रहे हैं। तीनों फसलें स्वस्थ हैं।`,
                crop_wheat: `आपका गेहूं अभी बढ़ने की अवस्था (Vegetative) में है और बहुत अच्छा दिख रहा है। कटाई ${farmerData.crops[0].harvest} में होगी।`,
                crop_mustard: `आपकी सरसों में फूल आ रहे हैं (Flowering) और स्थिति अच्छी है। कटाई ${farmerData.crops[1].harvest} तक हो जाएगी।`,
                crop_potato: `आलू की बुवाई (Planting) अभी चल रही है और स्थिति बेहतरीन है। ${farmerData.crops[2].harvest} में तैयार होगा।`,
                financial_summary: `आपका KCC लोन लिमिट ${farmerData.financials.kccLimit} है। इस सीज़न की कुल कमाई ${farmerData.financials.totalEarnings} है।`,
                transaction_last: `आपका पिछला लेन-देन ${farmerData.transactions[0].source} से ${farmerData.transactions[0].amount} का था, ${farmerData.transactions[0].date} को।`,
                weather_current: `अभी तापमान ${farmerData.weather.temp} है और मौसम ${farmerData.weather.condition} है। बारिश की संभावना ${farmerData.weather.rainChance} है।`,
                trust_score: `आपका एग्री ट्रस्ट स्कोर ${farmerData.trustScore.score} है, जो बहुत अच्छा है। बैंक आपको लोन देने को तैयार हैं।`,
                market_price: "गेहूं का मंडी भाव ₹2,125/क्विंटल है। आलू स्थानीय मंडी में ₹800-900/क्विंटल चल रहा है।"
            },
            'pa-IN': {
                welcome: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ਕਿਸ਼ਨ ਜੀ! ਤੁਸੀਂ ਮੇਰੇ ਤੋਂ ਕਣਕ, ਸਰ੍ਹੋਂ, ਆਲੂ, ਲੋਨ ਜਾਂ ਮੌਸਮ ਬਾਰੇ ਪੁੱਛ ਸਕਦੇ ਹੋ।",
                listening: "ਸੁਣ ਰਿਹਾ ਹਾਂ...",
                error: "ਮਾਫ ਕਰਨਾ, ਮੈਨੂੰ ਸਮਝ ਨਹੀਂ ਆਇਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
                identity: `ਤੁਸੀਂ ਰਾਮਪੁਰ ਤੋਂ ਕਿਸ਼ਨ ਕੁਮਾਰ ਹੋ। ਤੁਹਾਡੇ ਕੋਲ ${farmerData.profile.landSize} ਜ਼ਮੀਨ ਹੈ।`,
                farm_info: `ਤੁਹਾਡੀ ਜ਼ਮੀਨ ${farmerData.profile.landSize} ਹੈ। ਮਿੱਟੀ ${farmerData.profile.soil} ਹੈ।`,
                crop_status: `ਤੁਸੀਂ ਕਣਕ, ਸਰ੍ਹੋਂ ਅਤੇ ਆਲੂ ਦੀ ਖੇਤੀ ਕਰ ਰਹੇ ਹੋ। ਸਭ ਠੀਕ ਹੈ।`,
                crop_wheat: `ਤੁਹਾਡੀ ਕਣਕ ਵਧ ਰਹੀ ਹੈ (Vegetative) ਅਤੇ ਬਹੁਤ ਵਧੀਆ ਹੈ। ਵਾਢੀ ${farmerData.crops[0].harvest} ਵਿੱਚ ਹੋਵੇਗੀ।`,
                crop_mustard: `ਸਰ੍ਹੋਂ ਨੂੰ ਫੁੱਲ ਪੈ ਰਹੇ ਹਨ (Flowering)। ਹਾਲਤ ਚੰਗੀ ਹੈ। ${farmerData.crops[1].harvest} ਤੱਕ ਤਿਆਰ ਹੋ ਜਾਵੇਗੀ।`,
                crop_potato: `ਆਲੂ ਦੀ ਬਿਜਾਈ (Planting) ਚੱਲ ਰਹੀ ਹੈ। ${farmerData.crops[2].harvest} ਵਿੱਚ ਪੁਟਾਈ ਹੋਵੇਗੀ।`,
                financial_summary: `ਤੁਹਾਡੀ KCC ਲਿਮਿਟ ${farmerData.financials.kccLimit} ਹੈ। ਕੁੱਲ ਕਮਾਈ ${farmerData.financials.totalEarnings} ਹੈ।`,
                transaction_last: `ਆਖਰੀ ਵਾਰ ਤੁਸੀਂ ${farmerData.transactions[0].source} ਤੋਂ ${farmerData.transactions[0].amount} ਕਮਾਏ (${farmerData.transactions[0].date})।`,
                weather_current: `ਤਾਪਮਾਨ ${farmerData.weather.temp} ਹੈ। ਮੌਸਮ ਸਾਫ ਹੈ। ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ${farmerData.weather.rainChance} ਹੈ।`,
                trust_score: `ਤੁਹਾਡਾ ਟਰੱਸਟ ਸਕੋਰ ${farmerData.trustScore.score} ਹੈ। ਬੈਂਕ ਤੁਹਾਡੇ 'ਤੇ ਭਰੋਸਾ ਕਰਦੇ ਹਨ।`,
                market_price: "ਕਣਕ ਦਾ ਭਾਅ ₹2,125/ਕਵਿੰਟਲ ਹੈ। ਆਲੂ ₹800-900/ਕਵਿੰਟਲ ਵਿਕ ਰਿਹਾ ਹੈ।"
            },
            'gu-IN': {
                welcome: "નમસ્તે કિશન જી! ઘઉં, સરસવ, બટાકા અથવા લોન વિશે પૂછો.",
                listening: "હું સાંભળી રહ્યો છું...",
                crop_status: `તમે ઘઉં, સરસવ અને બટાકા વાવ્યા છે.`,
                crop_wheat: `તમારા ઘઉંનો પાક સારો છે. કાપણી ${farmerData.crops[0].harvest} માં થશે.`,
                crop_mustard: `સરસવમાં ફૂલ આવી રહ્યા છે. કાપણી ${farmerData.crops[1].harvest} માં થશે.`,
                crop_potato: `બટાકાનું વાવેતર ચાલુ છે. ${farmerData.crops[2].harvest} માં તૈયાર થશે.`,
                financial_summary: `તમારી KCC મર્યાદા ${farmerData.financials.kccLimit} છે.`,
                transaction_last: `છેલ્લો વ્યવહાર ${farmerData.transactions[0].amount} નો હતો.`,
                weather_current: `તાપમાન ${farmerData.weather.temp} છે. વરસાદની શક્યતા ${farmerData.weather.rainChance} છે.`,
                trust_score: `તમારો ટ્રસ્ટ સ્કોર ${farmerData.trustScore.score} છે.`
            },
            'mr-IN': {
                welcome: "नमस्कार किशन जी! गहू, मोहरी, बटाटा किंवा हवामानाबद्दल विचारा.",
                listening: "मी ऐकत आहे...",
                crop_status: `तुम्ही गहू, मोहरी आणि बटाटा लावला आहे.`,
                crop_wheat: `गव्हाचे पीक उत्तम आहे. कापणी ${farmerData.crops[0].harvest} मध्ये होईल.`,
                crop_mustard: `मोहरीला फुले येत आहेत. ${farmerData.crops[1].harvest} मध्ये तयार होईल.`,
                crop_potato: `बटाटा लागवड सुरू आहे.`,
                financial_summary: `तुमची KCC मर्यादा ${farmerData.financials.kccLimit} आहे.`,
                weather_current: `तापमान ${farmerData.weather.temp} आहे.`,
                trust_score: `तुमचा ट्रस्ट स्कोर ${farmerData.trustScore.score} आहे.`
            },
            'ta-IN': {
                welcome: "வணக்கம்! கோதுமை, கடுகு அல்லது உருளைக்கிழங்கு பற்றி கேளுங்கள்.",
                crop_status: "நீங்கள் கோதுமை, கடுகு மற்றும் உருளைக்கிழங்கு பயிரிடுகிறீர்கள்.",
                crop_wheat: `கோதுமை நன்றாக வளர்கிறது. அறுவடை ${farmerData.crops[0].harvest}.`,
                crop_mustard: `கடுகு பூக்கும் பருவத்தில் உள்ளது.`,
                crop_potato: `உருளைக்கிழங்கு நடவு நடக்கிறது.`,
                financial_summary: `KCC வரம்பு ${farmerData.financials.kccLimit}. வருமானம் ${farmerData.financials.totalEarnings}.`,
                weather_current: `வெப்பநிலை ${farmerData.weather.temp}. மழை வாய்ப்பு ${farmerData.weather.rainChance}.`
            },
            'te-IN': {
                welcome: "నమస్కారం! గోధుమలు, ఆవాలు లేదా బంగాళాదుంపల గురించి అడగండి.",
                crop_status: "మీరు గోధుమలు, ఆవాలు మరియు బంగాళాదుంపలు పండిస్తున్నారు.",
                crop_wheat: `గోధుమ పంట బాగుంది. ${farmerData.crops[0].harvest}లో కోత వస్తుంది.`,
                crop_mustard: `ఆవాలు పూత దశలో ఉన్నాయి.`,
                crop_potato: `బంగాళాదుంప నాటడం జరుగుతోంది.`,
                financial_summary: `KCC పరిమితి ${farmerData.financials.kccLimit}.`,
                weather_current: `ఉష్ణోగ్రత ${farmerData.weather.temp}.`
            },
            'bn-IN': {
                welcome: "নমস্কার! গম, সরিষা বা আলুর ব্যাপারে জিজ্ঞাসা করুন।",
                crop_status: "আপনি গম, সরিষা এবং আলু চাষ করছেন।",
                crop_wheat: `গম খুব ভালো আছে। ${farmerData.crops[0].harvest}-এ কাটা হবে।`,
                crop_mustard: `সরিষায় ফুল এসেছে।`,
                crop_potato: `আলু বোনা হচ্ছে।`,
                financial_summary: `KCC সীমা ${farmerData.financials.kccLimit}। আয় ${farmerData.financials.totalEarnings}।`,
                weather_current: `তাপমাত্রা ${farmerData.weather.temp}।`
            },
            'kn-IN': {
                welcome: "ನಮಸ್ಕಾರ! ಗೋಧಿ, ಸಾಸಿವೆ ಅಥವಾ ಆಲೂಗಡ್ಡೆ ಬಗ್ಗೆ ಕೇಳಿ.",
                crop_status: "ನೀವು ಗೋಧಿ, ಸಾಸಿವೆ ಮತ್ತು ಆಲೂಗಡ್ಡೆ ಬೆಳೆಯುತ್ತಿದ್ದೀರಿ.",
                crop_wheat: `ಗೋಧಿ ಬೆಳೆ ಚೆನ್ನಾಗಿದೆ. ${farmerData.crops[0].harvest} ರಲ್ಲಿ ಕಟಾವು.`,
                crop_mustard: `ಸಾಸಿವೆ ಹೂ ಬಿಡುತ್ತಿದೆ.`,
                crop_potato: `ಆಲೂಗಡ್ಡೆ ನಾಟಿ ನಡೆಯುತ್ತಿದೆ.`,
                financial_summary: `KCC ಮಿತಿ ${farmerData.financials.kccLimit}.`,
                weather_current: `ತಾಪಮಾನ ${farmerData.weather.temp}.`
            }
        };
        return templates[lang]?.[key] || templates['en-IN'][key] || templates['en-IN']['error'];
    };

    // --- INTENT CLASSIFICATION LOGIC ---
    const identifyIntent = (query, lang) => {
        const q = query.toLowerCase();

        // HELPER LEXICON FOR ROBUST MATCHING
        const terms = {
            crop: /(wheat|gehu|kanak|godhumai|mustard|sarso|rai|potato|aloo|batata|fasal|kheti|crop|yield|harvest)/,
            transaction: /(sold|sale|sell|becha|bechi|beche|bikri|transaction|amount|len|den|byapar|kharch|history|statement|kamai|earnings|income)/,
            price: /(price|rate|bhav|bhaav|dam|daam|kimat|mandi|market|value|paisa|kitne|how much)/,
            money: /(money|rupaye|bank|account|khata|balance|udhaar|financial|loan|kcc|limit|credit)/,
            identity: /(name|naam|who am i|parichay|mera naam|identity|hesaru|peru|profile)/,
            weather: /(weather|mausam|rain|barish|dhup|temp|garmi|sardi|hawaman|forecast|pani)/
        };

        // 0. SPECIFIC CROP STATUS (Priority High - Direct Crop Queries)
        // If user asks "How is wheat?" -> crop_wheat
        // BUT if user asks "How much did wheat sell for?" -> transaction_last (Handled below)

        // 1. TRANSACTION / SALES / EARNINGS (Critical for "Kitne me bechi")
        // Checks for: (Sold/Bechi) OR (Crop + Price words together)
        if (q.match(terms.transaction) || (q.match(terms.crop) && q.match(terms.price)) || q.match(/(sarkar|government|msp|procurement)/)) {
            return 'transaction_last';
        }

        // 2. SPECIFIC CROP HEALTH/STATUS
        if (q.match(/(wheat|gehu|kanak|godhumai|godhuma|gom)/)) return 'crop_wheat';
        if (q.match(/(mustard|sarso|rai|kadugu|aavalu)/)) return 'crop_mustard';
        if (q.match(/(potato|aloo|batata|urulakizhangu|bangaladumpa)/)) return 'crop_potato';

        // 3. MARKET PRICING (If not a past transaction)
        if (q.match(terms.price)) return 'market_price';

        // 4. FINANCIAL / BANKING
        if (q.match(terms.money)) return 'financial_summary';

        // 5. IDENTITY
        if (q.match(terms.identity)) return 'identity';

        // 6. GENERAL CROP STATUS (Fallback)
        if (q.match(terms.crop)) return 'crop_status';

        // 7. LAND INFO
        if (q.match(/(land|jameen|khet|mitti|soil|acre|bigha|zamin|bhumi|nela|jami|area)/)) return 'farm_info';

        // 8. WEATHER
        if (q.match(terms.weather)) return 'weather_current';

        // 9. TRUST SCORE
        if (q.match(/(score|trust|vishwas|rating|grade|level|bharo|credit score)/)) return 'trust_score';

        // 10. GREETING
        if (q.match(/(hello|hi|namaste|sat sri akal|vannakam|kaise|how are you|hey)/)) return 'welcome';

        return 'error';
    };

    const saveApiKey = (key) => {
        setApiKey(key);
        localStorage.setItem('elevenlabs_key', key);
        setShowSettings(false);
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

    const handleAIResponse = (userQuery) => {
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
