'use client';

import { useState, useEffect } from 'react';
import { Coin } from '@/types';
import { coinGeckoApi } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface AddCoinModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (coin: Coin, amount: number, buyPrice: number) => void;
}

export default function AddCoinModal({ isOpen, onClose, onAdd }: AddCoinModalProps) {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [coins, setCoins] = useState<Coin[]>([]);
    const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
    const [amount, setAmount] = useState('');
    const [buyPrice, setBuyPrice] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            loadCoins();
        }
    }, [isOpen]);

    const loadCoins = async () => {
        setLoading(true);
        const data = await coinGeckoApi.getCoins();
        setCoins(data);
        setLoading(false);
    };

    const filteredCoins = searchQuery
        ? coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : coins.slice(0, 10);

    const handleAdd = () => {
        if (selectedCoin && amount && buyPrice) {
            onAdd(selectedCoin, parseFloat(amount), parseFloat(buyPrice));
            setSelectedCoin(null);
            setAmount('');
            setBuyPrice('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="cyber-card rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[var(--primary)] neon-text">{t.portfolio.addCoin}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {!selectedCoin ? (
                    <>
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t.search.placeholder}
                                className="w-full bg-black/50 border-2 border-[var(--primary)]/30 rounded-lg pl-10 pr-4 py-3 text-white focus:border-[var(--primary)] focus:outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            {loading ? (
                                <p className="text-center text-gray-500 py-8">{t.search.loading}</p>
                            ) : filteredCoins.length > 0 ? (
                                filteredCoins.map((coin) => (
                                    <button
                                        key={coin.id}
                                        onClick={() => setSelectedCoin(coin)}
                                        className="w-full flex items-center gap-3 p-3 rounded-lg bg-black/30 hover:bg-[var(--primary)]/10 border border-transparent hover:border-[var(--primary)] transition-all"
                                    >
                                        <Image
                                            src={coin.image}
                                            alt={coin.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                        <div className="flex-1 text-left">
                                            <p className="font-semibold text-white">{coin.name}</p>
                                            <p className="text-sm text-gray-500 uppercase">{coin.symbol}</p>
                                        </div>
                                        <p className="text-[var(--secondary)] font-semibold">${coin.current_price.toFixed(2)}</p>
                                    </button>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 py-8">{t.search.noResults}</p>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 rounded-lg bg-black/30 border border-[var(--primary)]">
                            <Image
                                src={selectedCoin.image}
                                alt={selectedCoin.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <div>
                                <p className="font-bold text-white">{selectedCoin.name}</p>
                                <p className="text-sm text-gray-500 uppercase">{selectedCoin.symbol}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">{t.coin.amount}</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                step="any"
                                className="w-full bg-black/50 border-2 border-[var(--primary)]/30 rounded-lg px-4 py-3 text-white focus:border-[var(--primary)] focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">{t.coin.buyPrice}</label>
                            <input
                                type="number"
                                value={buyPrice}
                                onChange={(e) => setBuyPrice(e.target.value)}
                                placeholder={`$${selectedCoin.current_price.toFixed(2)}`}
                                step="any"
                                className="w-full bg-black/50 border-2 border-[var(--primary)]/30 rounded-lg px-4 py-3 text-white focus:border-[var(--primary)] focus:outline-none"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={handleAdd}
                                disabled={!amount || !buyPrice}
                                className="flex-1 cyber-btn rounded-lg px-6 py-3 font-bold uppercase tracking-wider disabled:opacity-50"
                            >
                                <Plus size={18} className="inline mr-2" />
                                {t.portfolio.addCoin}
                            </button>
                            <button
                                onClick={() => setSelectedCoin(null)}
                                className="px-6 py-3 bg-red-500/20 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500/30 font-bold"
                            >
                                {t.search.noResults}
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
