import React, { useEffect, useState } from 'react';
import previewSiteImg from '../public/images/previewSiteImg.jpg';

interface Event {
    title: string;
    description?: string;
    amount?: number;
    icon: string;
    note?: string;
}

interface EventCategory {
    name: string;
    events: Event[];
    loadingIcon: string;
    loadingText: string;
    bgGradient: string;
}

const eventCategories: Record<string, EventCategory> = {
    'angpao': {
        name: 'อั่งเปา',
        loadingIcon: '🧧',
        loadingText: 'แจกอั่งเปา...',
        bgGradient: 'from-red-800 via-yellow-700 to-orange-800',
        events: [
            { title: 'ได้อั่งเปาจากพ่อแม่', description: 'เงินรับช่วงตรุษจีน', amount: +2000, icon: '👨‍👩‍👧' },
            { title: 'ญาติให้ซองแดง', description: 'ได้รับอั่งเปาเพิ่ม', amount: +1500, icon: '🧑‍🦳' },
            { title: 'ได้อั่งเปาจากที่ทำงาน', description: 'โบนัสพิเศษตรุษจีน', amount: +3000, icon: '💼' },
            { title: 'เด็กๆมาขออั่งเปา แต่คืนเงินให้', description: 'ได้ใจเด็กและเงินคืน', amount: +1000, icon: '👧🧧' },
            { title: 'เปิดซองแล้วมีแบงค์พัน', description: 'โชคดีมาก', amount: +1000, icon: '💵' },
            { title: 'ได้อั่งเปาจากคนแปลกหน้า', description: 'งงแต่ก็ดีใจ', amount: +500, icon: '🤷🧧' },
        ]
    },
    'earthquake': {
        name: 'แผ่นดินไหว',
        loadingIcon: '🏢',
        loadingText: 'เกิดแผ่นดินไหว...',
        bgGradient: 'from-orange-900 via-red-900 to-yellow-950',
        events: [
            { title: 'บ้านพัง ต้องซ่อม', description: 'เสียค่าซ่อมแซม', amount: -50000, icon: '🏠' },
            { title: 'แผ่นดินไหวแรง 7.2', description: 'ความเสียหายรุนแรง', amount: -120000, icon: '🌋' },
            { title: 'รอดตาย แต่เจ็บเล็กน้อย', description: 'เสียค่ารักษา', amount: -8000, icon: '🤕' },
            { title: 'ได้ช่วยคนติดซากอาคาร', description: 'รางวัลจากรัฐบาล', amount: +15000, icon: '🏆' },
            { title: 'อาคารทรุด หนีไว', note: 'พัก 2 ตา เพื่อรักษาตัว', icon: '💨' },
            { title: 'เก็บของมีค่าได้ทัน', description: 'ขายทรัพย์สินได้', amount: +25000, icon: '💎' },
        ]
    },
    'flood': {
        name: 'น้ำท่วม',
        loadingIcon: '🌊',
        loadingText: 'น้ำกำลังท่วม...',
        bgGradient: 'from-blue-900 via-cyan-900 to-teal-950',
        events: [
            { title: 'รถจมน้ำ', description: 'ค่าซ่อมรถยนต์', amount: -45000, icon: '🚗' },
            { title: 'บ้านท่วมสูง 2 เมตร', description: 'ความเสียหายครั้งใหญ่', amount: -80000, icon: '🏘️' },
            { title: 'ช่วยคนจมน้ำได้', description: 'รางวัลผู้กล้าหาญ', amount: +12000, icon: '🏊' },
            { title: 'ขายเรือยางได้ดี', description: 'ธุรกิจขายดีในช่วงน้ำท่วม', amount: +35000, icon: '🛟' },
            { title: 'ติดน้ำท่วม', note: 'พัก 1 ตา รอน้ำลด', icon: '⛵' },
            { title: 'ปลาลอยท้องเก็บได้เยอะ', description: 'ขายปลาสด', amount: +8000, icon: '🐟' },
        ]
    },
    'robbery': {
        name: 'โจรปล้น',
        loadingIcon: '🕵️',
        loadingText: 'มีโจรปรากฏตัว...',
        bgGradient: 'from-gray-900 via-slate-900 to-zinc-950',
        events: [
            { title: 'โดนปล้นเงินในกระเป๋า', description: 'เสียเงินสด', amount: -15000, icon: '💰' },
            { title: 'โจรปล้นธนาคาร', description: 'ได้รับบาดเจ็บ', amount: -25000, icon: '🏦' },
            { title: 'จับโจรได้', description: 'รางวัลจากตำรวจ', amount: +20000, icon: '👮' },
            { title: 'โดนปล้นแต่ของปลอม', description: 'แอบขำได้', amount: +0, icon: '😏' },
            { title: 'หลบโจรได้ทัน', note: 'รอดชีวิต พัก 1 ตา', icon: '🏃' },
            { title: 'ทำตัวเป็นโจร', description: 'ได้เงินมาผิดกฎหมาย', amount: +30000, icon: '🥷' },
        ]
    },
    'accident': {
        name: 'อุบัติเหตุ',
        loadingIcon: '🚑',
        loadingText: 'เกิดอุบัติเหตุ...',
        bgGradient: 'from-red-900 via-orange-900 to-pink-950',
        events: [
            { title: 'ล้มหัวแตก', description: 'เสียค่ารักษา', amount: -5000, icon: '🤕' },
            { title: 'ช็อกเส้นเลือดในสมองแตง', description: 'เสียค่ารักษา', amount: -80000, icon: '💥' },
            { title: 'วิ่งตกบันไดขาหัก', description: 'เสียค่ารักษา', amount: -10000, icon: '🦴' },
            { title: 'รถชนแต่ได้เงินประกัน', description: 'ประกันจ่ายเต็ม', amount: +50000, icon: '🚗' },
            { title: 'วิ่งจนเหนื่อย', note: 'พัก 1 ตา', icon: '🥵' },
            { title: 'ช่วยคนเกิดอุบัติเหตุ', description: 'ได้บุญและเงินรางวัล', amount: +18000, icon: '🚑' },
        ]
    },
    'lottery': {
        name: 'การพนัน/หวย',
        loadingIcon: '🎰',
        loadingText: 'กำลังออกผล...',
        bgGradient: 'from-purple-900 via-indigo-900 to-blue-950',
        events: [
            { title: 'ถูกหวยรางวัลที่ 1', description: 'โชคดีครั้งใหญ่!', amount: +600000, icon: '🎊' },
            { title: 'เสียเงินซื้อหวย', description: 'ไม่ถูกสักใบ', amount: -5000, icon: '🎫' },
            { title: 'ถูกหวยท้าย 2 ตัว', description: 'โชคดีเล็กน้อย', amount: +6000, icon: '🎉' },
            { title: 'เล่นการพนันออนไลน์', description: 'เสียเงินจนหมดตัว', amount: -100000, icon: '💸' },
            { title: 'เลิกเล่นการพนัน', note: 'พัก 1 ตา เพื่อฟื้นฟู', icon: '🧘' },
            { title: 'ฝันเลขแม่น', description: 'ซื้อหวยถูก', amount: +12000, icon: '💭' },
        ]
    },
    'fire': {
        name: 'ไฟไหม้',
        loadingIcon: '🔥',
        loadingText: 'ไฟกำลังลุกลาม...',
        bgGradient: 'from-red-800 via-yellow-800 to-orange-900',
        events: [
            { title: 'ไฟไหม้บ้าน', description: 'เสียหายหนักมาก', amount: -150000, icon: '🏚️' },
            { title: 'ของมีค่าเสียหาย', description: 'เสียทองคำและของสะสม', amount: -50000, icon: '📦' },
            { title: 'รอดชีวิตแต่ต้องย้ายออก', description: 'เสียค่าที่พักชั่วคราว', amount: -20000, icon: '🛏️' },
            { title: 'ประกันไฟไหม้ช่วยไว้', description: 'ได้เงินชดเชย', amount: +80000, icon: '🧾' },
            { title: 'ช่วยดับไฟทัน', description: 'ลดความเสียหาย', amount: -10000, icon: '🧯' },
            { title: 'สัตว์เลี้ยงหนีรอด', description: 'ยังดีที่ไม่สูญเสียทุกอย่าง', amount: 0, icon: '🐶' },
        ]
    },
    'sickness': {
        name: 'เจ็บป่วยหนัก',
        loadingIcon: '🦠',
        loadingText: 'มีอาการป่วย...',
        bgGradient: 'from-purple-800 via-rose-900 to-indigo-950',
        events: [
            { title: 'ป่วยโรคร้ายแรง', description: 'ค่ารักษามหาศาล', amount: -120000, icon: '🏥' },
            { title: 'ต้องผ่าตัดด่วน', description: 'จ่ายค่าผ่าตัด', amount: -60000, icon: '🔪' },
            { title: 'ลาป่วยไม่ได้ทำงาน', description: 'รายได้หายไป', amount: -20000, icon: '🛌' },
            { title: 'ประกันสุขภาพจ่ายให้บางส่วน', description: 'ช่วยลดภาระ', amount: +30000, icon: '📄' },
            { title: 'ญาติช่วยออกค่ารักษา', description: 'น้ำใจมีค่ามาก', amount: +10000, icon: '🤝' },
            { title: 'หายดีแล้ว', description: 'กลับมาใช้ชีวิตได้', amount: 0, icon: '😊' },
        ]
    },
    'travelIssue': {
        name: 'ปัญหาระหว่างเดินทาง',
        loadingIcon: '✈️',
        loadingText: 'กำลังเดินทาง...',
        bgGradient: 'from-cyan-900 via-blue-800 to-slate-950',
        events: [
            { title: 'เที่ยวบินยกเลิก', description: 'จ่ายค่าโรงแรมเพิ่ม', amount: -10000, icon: '🛬' },
            { title: 'กระเป๋าหาย', description: 'ของหายหมด', amount: -25000, icon: '🎒' },
            { title: 'เจ็บป่วยต่างแดน', description: 'ค่ารักษาแพงมาก', amount: -40000, icon: '🌍' },
            { title: 'ประกันการเดินทางช่วยไว้', description: 'ได้เงินคืนค่าตั๋ว', amount: +15000, icon: '🧾' },
            { title: 'เจอพายุ ต้องยกเลิกทริป', description: 'ค่าทัวร์สูญเปล่า', amount: -20000, icon: '⛈️' },
            { title: 'พาสปอร์ตหาย แต่ได้ทำใหม่ทัน', description: 'เสียค่าทำใหม่', amount: -3000, icon: '🛂' },
        ]
    },
    'lawsuit': {
        name: 'คดีความ',
        loadingIcon: '⚖️',
        loadingText: 'กำลังเข้าสู่กระบวนการยุติธรรม...',
        bgGradient: 'from-gray-900 via-indigo-900 to-purple-950',
        events: [
            { title: 'โดนฟ้องละเมิดลิขสิทธิ์', description: 'เสียค่าปรับ', amount: -30000, icon: '📄' },
            { title: 'ต้องจ้างทนาย', description: 'ค่าทนายความ', amount: -20000, icon: '👨‍⚖️' },
            { title: 'แพ้คดีในศาล', description: 'เสียค่าชดเชย', amount: -50000, icon: '⚖️' },
            { title: 'มีประกันคุ้มครองทางกฎหมาย', description: 'จ่ายค่าทนายให้บางส่วน', amount: +20000, icon: '📜' },
            { title: 'เจรจานอกรอบสำเร็จ', description: 'ลดค่าเสียหาย', amount: -5000, icon: '🤝' },
            { title: 'ชนะคดี', description: 'ได้รับค่าชดเชยคืนบางส่วน', amount: +10000, icon: '🏅' },
        ]
    }
};

// Default events สำหรับกรณีไม่มี query param
const defaultEvents: Event[] = [
    { title: 'ล้มหัวแตก', description: 'เสียค่ารักษา', amount: -5000, icon: '🤕' },
    { title: 'ช็อกเส้นเลือดในสมองแตก', description: 'เสียค่ารักษา', amount: -80000, icon: '💥' },
    { title: 'วิ่งตกบันไดขาหัก', description: 'เสียค่ารักษา', amount: -10000, icon: '🦴' },
    { title: 'ฟาดเคราะห์ ไปซื้อหวย', description: 'ถูกหวย', amount: +8000, icon: '🎉' },
    { title: 'เสียค่าเหมารถ', amount: -3000, icon: '🚕' },
    { title: 'วิ่งจนเหนื่อย', note: 'พัก 1 ตา', icon: '🥵' },
];

const EventRandom: React.FC = () => {
    const [event, setEvent] = useState<Event | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<EventCategory | null>(null);
    const [currentEvents, setCurrentEvents] = useState<Event[]>(defaultEvents);

    // useEffect(() => {
    //     // เตือนผู้ใช้หากพยายาม refresh หรือออกจากหน้า
    //     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    //         event.preventDefault();
    //         event.returnValue = '';
    //     };

    //     window.addEventListener('beforeunload', handleBeforeUnload);
    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, []);

    // อ่าน query parameters
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const eventType = urlParams.get('type');

        if (eventType && eventCategories[eventType]) {
            const category = eventCategories[eventType];
            setCurrentCategory(category);
            setCurrentEvents(category.events);
        } else {
            setCurrentCategory(null);
            setCurrentEvents(defaultEvents);
        }
    }, []);

    const selectRandomEvent = () => {
        setIsAnimating(true);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * currentEvents.length);
            setEvent(currentEvents[randomIndex]);
            setIsAnimating(false);
        }, 4000);
    };

    useEffect(() => {
        if (currentEvents.length > 0) {
            selectRandomEvent();
        }
    }, [currentEvents]);

    const formatAmount = (amount?: number): string => {
        if (amount === undefined) return '';
        const sign = amount > 0 ? '+' : '';
        return `${sign}${(amount / 1000).toFixed(0)}K`;
    };

    const getAmountColor = (amount?: number): string => {
        if (amount === undefined) return '';
        return amount > 0 ? 'text-emerald-50' : 'text-red-50';
    };

    const getCardTheme = (amount?: number) => {
        if (amount === undefined) {
            return {
                bg: 'bg-gradient-to-br from-slate-800/95 via-gray-800/95 to-zinc-900/95',
                border: 'border-slate-500/40',
                shadow: 'shadow-2xl shadow-slate-900/60'
            };
        }

        if (amount > 0) {
            return {
                bg: 'bg-gradient-to-br from-emerald-800/95 via-green-800/95 to-teal-900/95',
                border: 'border-emerald-400/40',
                shadow: 'shadow-2xl shadow-emerald-900/60'
            };
        } else {
            return {
                bg: 'bg-gradient-to-br from-red-800/95 via-rose-800/95 to-pink-900/95',
                border: 'border-red-400/40',
                shadow: 'shadow-2xl shadow-red-900/60'
            };
        }
    };

    const getBgTheme = (amount?: number): string => {
        if (currentCategory) {
            return `bg-gradient-to-br ${currentCategory.bgGradient}`;
        }

        if (amount === undefined) {
            return 'bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-950';
        }

        if (amount > 0) {
            return 'bg-gradient-to-br from-emerald-900 via-green-900 to-teal-950';
        } else {
            return 'bg-gradient-to-br from-red-900 via-rose-900 to-pink-950';
        }
    };

    const cardTheme = getCardTheme(event?.amount);

    return (
        <div className={`min-h-screen ${getBgTheme(event?.amount)} flex items-start pt-8 justify-center transition-all duration-1000 ease-in-out relative overflow-hidden`}>
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white/25 rounded-full animate-ping"></div>
                <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-white/35 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-white/15 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/6 right-2/3 w-2 h-2 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-1/3 right-1/2 w-3 h-3 bg-white/25 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
            </div>

            {/* Background pattern overlay */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            </div>

            {/* Card Container */}
            <div className="w-full px-10 lg:max-w-lg relative z-10">
                <div className={`${cardTheme.bg} ${cardTheme.border} border-2 rounded-3xl sm:rounded-[2rem] lg:rounded-[3rem] ${cardTheme.shadow} p-8 sm:p-10 lg:p-12 text-center backdrop-blur-xl relative overflow-hidden transition-all duration-700 ease-out transform ${isAnimating ? 'scale-95 rotate-1' : 'scale-100 rotate-0 hover:scale-105'}`}>

                    {/* Enhanced decorative elements */}
                    <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-white/15 to-transparent rounded-full -translate-x-20 -translate-y-20 blur-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/20 to-transparent rounded-full translate-x-16 translate-y-16 blur-xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/8 rounded-full blur-3xl"></div>

                    {/* Animated border glow */}
                    <div className="absolute inset-0 rounded-3xl sm:rounded-[2rem] lg:rounded-[3rem] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 animate-pulse"></div>

                    <div className="relative z-10">
                        {/* Category badge */}
                        {currentCategory && (
                            <div className="mb-6">
                                <div className="inline-flex items-center gap-2 bg-black/40 border border-white/30 rounded-full px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                                    <span className="text-lg">{currentCategory.loadingIcon}</span>
                                    <span>{currentCategory.name}</span>
                                </div>
                            </div>
                        )}

                        <div className="mb-8">
                            <div className="relative inline-block">
                                <img src={previewSiteImg} alt="Logo" className="w-20 h-20 sm:w-24 sm:h-24 mx-auto border-4 border-white/40 rounded-2xl shadow-2xl backdrop-blur-sm" />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                            </div>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-8 sm:mb-10 tracking-tight flex justify-center items-center gap-3 drop-shadow-2xl">
                            <span className="inline-block animate-pulse text-yellow-300">⚡</span>
                            <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">Unexpected</span>
                            <span className="inline-block animate-pulse text-yellow-300">⚡</span>
                        </h1>

                        {event && !isAnimating ? (
                            <div className="space-y-6 sm:space-y-8 animate-fade-in">
                                <div className={`text-8xl sm:text-9xl lg:text-[10rem] transform transition-all duration-700 hover:scale-110 ${isAnimating ? 'scale-50 rotate-180 opacity-0' : 'scale-100 rotate-0 opacity-100'} drop-shadow-2xl`}>
                                    {event.icon}
                                </div>

                                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-relaxed px-4 drop-shadow-lg">
                                    {event.title}
                                </div>

                                {event.description && (
                                    <div className="text-base sm:text-lg text-gray-100 bg-black/40 border border-white/30 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-inner">
                                        {event.description}
                                    </div>
                                )}

                                {event.amount !== undefined && (
                                    <div className={`text-3xl sm:text-4xl lg:text-5xl font-black ${getAmountColor(event.amount)} bg-black/50 border-2 ${event.amount > 0 ? 'border-emerald-400/60' : 'border-red-400/60'} rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl transform transition-all duration-300 hover:scale-110 hover:rotate-1 cursor-pointer group relative overflow-hidden`}>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="relative z-10 group-hover:animate-pulse">
                                            {formatAmount(event.amount)}
                                        </div>
                                    </div>
                                )}

                                {event.note && (
                                    <div className="text-sm sm:text-base text-yellow-100 bg-yellow-900/50 border border-yellow-400/40 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-inner">
                                        <span className="font-bold text-yellow-300">📝 หมายเหตุ:</span> {event.note}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-8 sm:space-y-10">
                                <div className="text-8xl sm:text-9xl animate-pulse drop-shadow-2xl animate-tilt">
                                    {currentCategory ? currentCategory.loadingIcon : '🏢'}
                                </div>
                                <div className="text-xl sm:text-2xl text-gray-100 font-bold drop-shadow-lg">
                                    {currentCategory ? currentCategory.loadingText : 'เกิดแผ่นดินไหว...'}
                                </div>
                                <div className="flex justify-center space-x-3">
                                    <div className="w-4 h-4 bg-white/70 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-4 h-4 bg-white/70 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '200ms' }}></div>
                                    <div className="w-4 h-4 bg-white/70 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '400ms' }}></div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventRandom;