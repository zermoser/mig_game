import React, { useEffect, useState } from 'react';

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
        }, 500);
    };

    useEffect(() => {
        selectRandomEvent();
    }, []);

    const formatAmount = (amount?: number): string => {
        if (amount === undefined) return '';
        const sign = amount > 0 ? '+' : '';
        return `${sign}${(amount / 1000).toFixed(0)}K บาท`;
    };

    const getAmountColor = (amount?: number): string => {
        if (amount === undefined) return '';
        return amount > 0 ? 'text-emerald-600' : 'text-red-600';
    };

    const getCardTheme = (amount?: number) => {
        if (amount === undefined) {
            return {
                bg: 'bg-gradient-to-br from-slate-50 to-gray-100',
                border: 'border-gray-200',
                shadow: 'shadow-gray-200/50'
            };
        }

        if (amount > 0) {
            return {
                bg: 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50',
                border: 'border-emerald-200',
                shadow: 'shadow-emerald-200/50'
            };
        } else {
            return {
                bg: 'bg-gradient-to-br from-red-50 via-rose-50 to-pink-50',
                border: 'border-red-200',
                shadow: 'shadow-red-200/50'
            };
        }
    };

    const getBgTheme = (amount?: number): string => {
        if (amount === undefined) {
            return 'bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-200';
        }

        if (amount > 0) {
            return 'bg-gradient-to-br from-emerald-100 via-green-100 to-teal-200';
        } else {
            return 'bg-gradient-to-br from-red-100 via-rose-100 to-pink-200';
        }
    };

    const cardTheme = getCardTheme(event?.amount);

    return (
        <div className={`min-h-screen ${getBgTheme(event?.amount)} flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-all duration-1000 ease-in-out`}>
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
                <div className={`${cardTheme.bg} ${cardTheme.border} border-2 rounded-3xl sm:rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl ${cardTheme.shadow} p-6 sm:p-8 lg:p-10 text-center backdrop-blur-sm relative overflow-hidden transition-all duration-700 ease-out transform ${isAnimating ? 'scale-95 rotate-1' : 'scale-100 rotate-0'}`}>

                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-white/20 rounded-full -translate-x-10 -translate-y-10"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/20 rounded-full translate-x-8 translate-y-8"></div>

                    <div className="relative z-10">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-6 sm:mb-8 tracking-tight">
                            <span className="inline-block animate-pulse">⚡</span>
                            <span className="mx-2 sm:mx-3">เหตุการณ์สุ่ม</span>
                            <span className="inline-block animate-pulse">⚡</span>
                        </h1>

                        {event && !isAnimating ? (
                            <div className="space-y-4 sm:space-y-6 animate-fade-in">
                                <div className={`text-6xl sm:text-7xl lg:text-8xl transform transition-all duration-500 ${isAnimating ? 'scale-75 rotate-180' : 'scale-100 rotate-0'}`}>
                                    {event.icon}
                                </div>

                                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 leading-relaxed px-2">
                                    {event.title}
                                </div>

                                {event.description && (
                                    <div className="text-sm sm:text-base text-gray-600 bg-white/50 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                                        {event.description}
                                    </div>
                                )}

                                {event.amount !== undefined && (
                                    <div className={`text-2xl sm:text-3xl lg:text-4xl font-black ${getAmountColor(event.amount)} bg-white/70 rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-inner border border-white/50 transform transition-all duration-300 hover:scale-105`}>
                                        {formatAmount(event.amount)}
                                    </div>
                                )}

                                {event.note && (
                                    <div className="text-xs sm:text-sm text-amber-700 bg-amber-50/80 border border-amber-200 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                                        <span className="font-semibold">📝 หมายเหตุ:</span> {event.note}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-6 sm:space-y-8">
                                <div className="text-6xl sm:text-7xl animate-spin">🎲</div>
                                <div className="text-lg sm:text-xl text-gray-600 font-medium">
                                    กำลังสุ่มเหตุการณ์...
                                </div>
                                <div className="flex justify-center space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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