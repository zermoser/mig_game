import React, { useEffect, useState } from 'react';
import previewSiteImg from '../public/images/previewSiteImg.jpg';

interface Event {
    title: string;
    description?: string;
    amount?: number;
    icon: string;
    note?: string;
}

const events: Event[] = [
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

    const selectRandomEvent = () => {
        setIsAnimating(true);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * events.length);
            setEvent(events[randomIndex]);
            setIsAnimating(false);
        }, 4000);
    };

    useEffect(() => {
        selectRandomEvent();
    }, []);

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
                bg: 'bg-gradient-to-br from-slate-800/90 via-gray-800/90 to-zinc-900/90',
                border: 'border-slate-600/50',
                shadow: 'shadow-2xl shadow-slate-900/50'
            };
        }

        if (amount > 0) {
            return {
                bg: 'bg-gradient-to-br from-emerald-800/95 via-green-800/95 to-teal-900/95',
                border: 'border-emerald-500/30',
                shadow: 'shadow-2xl shadow-emerald-900/50'
            };
        } else {
            return {
                bg: 'bg-gradient-to-br from-red-800/95 via-rose-800/95 to-pink-900/95',
                border: 'border-red-500/30',
                shadow: 'shadow-2xl shadow-red-900/50'
            };
        }
    };

    const getBgTheme = (amount?: number): string => {
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
        <div className={`min-h-screen ${getBgTheme(event?.amount)} flex items-center justify-center transition-all duration-1000 ease-in-out relative overflow-hidden`}>
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
                <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white/10 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg relative z-10">
                <div className={`${cardTheme.bg} ${cardTheme.border} border-2 rounded-3xl sm:rounded-[2rem] lg:rounded-[3rem] ${cardTheme.shadow} p-8 sm:p-10 lg:p-12 text-center backdrop-blur-xl relative overflow-hidden transition-all duration-700 ease-out transform ${isAnimating ? 'scale-95 rotate-2' : 'scale-100 rotate-0 hover:scale-105'}`}>

                    {/* Enhanced decorative elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-x-16 -translate-y-16 blur-xl"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-white/15 to-transparent rounded-full translate-x-12 translate-y-12 blur-lg"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

                    {/* Animated border glow */}
                    <div className="absolute inset-0 rounded-3xl sm:rounded-[2rem] lg:rounded-[3rem] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 animate-pulse"></div>

                    <div className="relative z-10">
                        <div className="mb-8">
                            <div className="relative inline-block">
                                <img src={previewSiteImg} alt="Logo" className="w-20 h-20 sm:w-24 sm:h-24 mx-auto border-4 border-white/30 shadow-2xl backdrop-blur-sm" />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                            </div>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-8 sm:mb-10 tracking-tight flex justify-center items-center gap-3 drop-shadow-2xl">
                            <span className="inline-block animate-pulse text-yellow-300">⚡</span>
                            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">Unexpected</span>
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
                                    <div className="text-base sm:text-lg text-gray-200 bg-black/30 border border-white/20 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-inner">
                                        {event.description}
                                    </div>
                                )}

                                {event.amount !== undefined && (
                                    <div className={`text-3xl sm:text-4xl lg:text-5xl font-black ${getAmountColor(event.amount)} bg-black/40 border-2 ${event.amount > 0 ? 'border-emerald-400/50' : 'border-red-400/50'} rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl transform transition-all duration-300 hover:scale-110 hover:rotate-1 cursor-pointer group`}>
                                        <div className="group-hover:animate-pulse">
                                            {formatAmount(event.amount)}
                                        </div>
                                    </div>
                                )}

                                {event.note && (
                                    <div className="text-sm sm:text-base text-yellow-100 bg-yellow-900/40 border border-yellow-500/30 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-inner">
                                        <span className="font-bold text-yellow-300"> หมายเหตุ:</span> {event.note}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-8 sm:space-y-10">
                                <div className="text-8xl sm:text-9xl animate-tilt drop-shadow-2xl">🏢</div>
                                <div className="text-xl sm:text-2xl text-gray-200 font-bold drop-shadow-lg">
                                    เกิดแผ่นดินไหว...
                                </div>
                                <div className="flex justify-center space-x-3">
                                    <div className="w-4 h-4 bg-white/60 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-4 h-4 bg-white/60 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '200ms' }}></div>
                                    <div className="w-4 h-4 bg-white/60 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '400ms' }}></div>
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