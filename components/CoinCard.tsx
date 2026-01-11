'use client';

import { PortfolioCoin } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CoinCardProps {
    portfolioCoin: PortfolioCoin;
    onRemove: (coinId: string) => void;
}

export default function CoinCard({ portfolioCoin, onRemove }: CoinCardProps) {
    const { t } = useLanguage();
    const { coin, amount, buyPrice } = portfolioCoin;

    const currentValue = coin.current_price * amount;
    const profit = currentValue - (buyPrice * amount);
    const profitPercent = ((currentValue - (buyPrice * amount)) / (buyPrice * amount)) * 100;

    const isPositive = coin.price_change_percentage_24h >= 0;
    const isProfitable = profit >= 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="cyber-card rounded-xl p-6 hover:scale-[1.02] transition-transform"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Image
                        src={coin.image}
                        alt={coin.name}
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-[var(--primary)]"
                    />
                    <div>
                        <h3 className="text-lg font-bold text-[var(--primary)] neon-text">
                            {coin.name}
                        </h3>
                        <p className="text-sm text-gray-400 uppercase">{coin.symbol}</p>
                    </div>
                </div>

                <button
                    onClick={() => onRemove(coin.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title={t.coin.remove}
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-xs text-gray-500 mb-1">{t.coin.price}</p>
                    <p className="text-lg font-bold text-white">{formatCurrency(coin.current_price)}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">{t.coin.change24h}</p>
                    <div className={`flex items-center gap-1 text-lg font-bold ${isPositive ? 'text-[var(--primary)]' : 'text-red-500'}`}>
                        {isPositive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                        {formatPercent(coin.price_change_percentage_24h)}
                    </div>
                </div>
            </div>

            <div className="border-t border-[var(--primary)]/30 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{t.coin.holdings}</span>
                    <span className="text-white font-semibold">{amount.toFixed(8)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{t.coin.value}</span>
                    <span className="text-[var(--secondary)] font-semibold neon-text-cyan">{formatCurrency(currentValue)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{t.coin.profit}</span>
                    <span className={`font-bold ${isProfitable ? 'text-[var(--primary)]' : 'text-red-500'}`}>
                        {formatCurrency(profit)} ({formatPercent(profitPercent)})
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
