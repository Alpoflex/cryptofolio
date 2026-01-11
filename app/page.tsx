'use client';

import { useState, useEffect } from 'react';
import { PortfolioCoin, Coin } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatCurrency, formatPercent } from '@/lib/utils';
import CoinCard from '@/components/CoinCard';
import AddCoinModal from '@/components/AddCoinModal';
import PriceChart from '@/components/PriceChart';
import LanguageToggle from '@/components/LanguageToggle';
import { Plus, TrendingUp, Wallet, DollarSign } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'cryptofolio-portfolio';

export default function Home() {
  const { t } = useLanguage();
  const [portfolio, setPortfolio] = useState<PortfolioCoin[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPortfolio(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load portfolio', e);
      }
    }
  }, []);

  useEffect(() => {
    if (portfolio.length > 0 || localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
    }
  }, [portfolio]);

  const handleAddCoin = (coin: Coin, amount: number, buyPrice: number) => {
    const newCoin: PortfolioCoin = { coin, amount, buyPrice };
    setPortfolio([...portfolio, newCoin]);
  };

  const handleRemoveCoin = (coinId: string) => {
    setPortfolio(portfolio.filter((pc) => pc.coin.id !== coinId));
  };

  const totalValue = portfolio.reduce(
    (sum, pc) => sum + pc.coin.current_price * pc.amount,
    0
  );

  const totalProfit = portfolio.reduce(
    (sum, pc) => sum + (pc.coin.current_price - pc.buyPrice) * pc.amount,
    0
  );

  const totalProfitPercent = portfolio.reduce((sum, pc) => {
    const invested = pc.buyPrice * pc.amount;
    return invested > 0 ? sum + invested : sum;
  }, 0);

  const profitPercent = totalProfitPercent > 0 ? (totalProfit / totalProfitPercent) * 100 : 0;

  return (
    <main className="min-h-screen p-6 md:p-12">
      <LanguageToggle />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-black text-[var(--primary)] neon-text mb-3 glitch uppercase tracking-tighter">
            {t.title}
          </h1>
          <p className="text-[var(--secondary)] text-lg md:text-xl neon-text-cyan uppercase tracking-widest">
            {t.subtitle}
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="cyber-card rounded-xl p-6 pulse-glow">
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="text-[var(--secondary)]" size={24} />
              <h3 className="text-gray-400 text-sm uppercase tracking-wider">{t.portfolio.totalValue}</h3>
            </div>
            <p className="text-3xl font-black text-white">{formatCurrency(totalValue)}</p>
          </div>

          <div className="cyber-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className={totalProfit >= 0 ? 'text-[var(--primary)]' : 'text-red-500'} size={24} />
              <h3 className="text-gray-400 text-sm uppercase tracking-wider">{t.portfolio.totalProfit}</h3>
            </div>
            <p className={`text-3xl font-black ${totalProfit >= 0 ? 'text-[var(--primary)]' : 'text-red-500'}`}>
              {formatCurrency(totalProfit)}
            </p>
            <p className={`text-sm mt-1 ${totalProfit >= 0 ? 'text-[var(--primary)]' : 'text-red-500'}`}>
              {formatPercent(profitPercent)}
            </p>
          </div>

          <div className="cyber-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="text-[var(--accent)]" size={24} />
              <h3 className="text-gray-400 text-sm uppercase tracking-wider">{t.portfolio.title}</h3>
            </div>
            <p className="text-3xl font-black text-white">{portfolio.length}</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-3 w-full cyber-btn rounded-lg px-4 py-2 text-sm font-bold uppercase tracking-wider"
            >
              <Plus size={16} className="inline mr-2" />
              {t.portfolio.addCoin}
            </button>
          </div>
        </div>

        {/* Portfolio */}
        {portfolio.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <AnimatePresence>
                {portfolio.map((pc) => (
                  <CoinCard
                    key={pc.coin.id}
                    portfolioCoin={pc}
                    onRemove={handleRemoveCoin}
                  />
                ))}
              </AnimatePresence>
            </div>

            {portfolio[0] && <PriceChart coinId={portfolio[0].coin.id} />}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-6">{t.portfolio.empty}</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="cyber-btn rounded-lg px-8 py-4 text-lg font-bold uppercase tracking-wider inline-flex items-center gap-3"
            >
              <Plus size={24} />
              {t.portfolio.addCoin}
            </button>
          </div>
        )}
      </div>

      <AddCoinModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCoin}
      />
    </main>
  );
}
