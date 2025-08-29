import React, { useMemo } from 'react';

const currencies = [
    '₹', '$', '€', '₣', '£', '¥', '₽', '₩', '฿', '₿', '¢', '₢', '₵', '₫', '₯',
    '₰', '₲', '₴', '₭', '₺', '₾', '₼', '₥', '₦', '₱', '〒', '₮', '₩', '₴', '₸',
    '₳', '₠', '₡', '₋', '₧', '₤', '₶', '₷', '₻', '₼', '元', '圓', '﷼', '៛', '₪'
];
const totalSymbols = 100;

interface SymbolStyle {
    char: string;
    style: React.CSSProperties;
}

const generateSymbols = (): SymbolStyle[] => {
    const symbols: SymbolStyle[] = [];
    for (let i = 0; i < totalSymbols; i++) {
        const char = currencies[i % currencies.length];
        const animationName = `float-anim-${(i % 5) + 1}`;
        symbols.push({
            char,
            style: {
                top: `${-10 + Math.random() * 120}%`,
                left: `${-10 + Math.random() * 120}%`,
                fontSize: `${1.5 + Math.random() * 2.5}rem`,
                fontWeight: '600',
                opacity: 0.1 + Math.random() * 0.3,
                animationName,
                animationDuration: `${30 + Math.random() * 30}s`,
            },
        });
    }
    return symbols;
};

const FloatingCurrencies: React.FC = () => {
    const symbols = useMemo(() => generateSymbols(), []);

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div className="relative w-full h-full">
                {symbols.map(({ char, style }, index) => (
                    <span
                        key={index}
                        className="floating-currency text-slate-700"
                        style={style}
                    >
                        {char}
                    </span>
                ))}
            </div>
            <style>{`
                .floating-currency {
                    position: absolute;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    animation-direction: alternate;
                    will-change: transform;
                }
                @keyframes float-anim-1 {
                    0% { transform: translate(0, 0) rotate(0deg) scale(1); }
                    100% { transform: translate(-20vw, 25vh) rotate(180deg) scale(1.2); }
                }
                @keyframes float-anim-2 {
                    0% { transform: translate(0, 0) rotate(-20deg) scale(1); }
                    100% { transform: translate(22vw, -20vh) rotate(-120deg) scale(0.8); }
                }
                @keyframes float-anim-3 {
                    0% { transform: translate(0, 0) rotate(20deg) scale(1.1); }
                    100% { transform: translate(18vw, 18vh) rotate(90deg) scale(1); }
                }
                @keyframes float-anim-4 {
                    0% { transform: translate(0, 0) rotate(-10deg) scale(0.9); }
                    100% { transform: translate(-25vw, -22vh) rotate(-180deg) scale(1.1); }
                }
                @keyframes float-anim-5 {
                    0% { transform: translate(0, 0) rotate(10deg) scale(1); }
                    100% { transform: translate(20vw, -25vh) rotate(150deg) scale(0.9); }
                }
            `}</style>
        </div>
    );
};

export default FloatingCurrencies;
