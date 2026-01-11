'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { coinGeckoApi } from '@/lib/api';
import { ChartData } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface PriceChartProps {
    coinId: string;
}

export default function PriceChart({ coinId }: PriceChartProps) {
    const { t } = useLanguage();
    const [data, setData] = useState<ChartData[]>([]);
    const [days, setDays] = useState(7);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadChart();
    }, [coinId, days]);

    const loadChart = async () => {
        setLoading(true);
        const chartData = await coinGeckoApi.getCoinChart(coinId, days);
        setData(chartData);
        setLoading(false);
    };

    return (
        <div className="cyber-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[var(--secondary)] neon-text-cyan">Price Chart</h3>
                <div className="flex gap-2">
                    {[
                        { label: t.chart.day, value: 1 },
                        { label: t.chart.week, value: 7 },
                        { label: t.chart.month, value: 30 },
                    ].map((period) => (
                        <button
                            key={period.value}
                            onClick={() => setDays(period.value)}
                            className={`px-3 py-1 rounded text-sm font-semibold transition-all ${days === period.value
                                    ? 'bg-[var(--primary)] text-black'
                                    : 'bg-black/30 text-gray-400 hover:text-white'
                                }`}
                        >
                            {period.label}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="h-64 flex items-center justify-center text-gray-500">
                    Loading chart...
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <XAxis
                            dataKey="time"
                            stroke="#666"
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis
                            stroke="#666"
                            style={{ fontSize: '12px' }}
                            tickFormatter={(value) => `$${value.toFixed(0)}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0a0e1a',
                                border: '2px solid var(--primary)',
                                borderRadius: '8px',
                                boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)',
                            }}
                            labelStyle={{ color: '#e0e7ff' }}
                            itemStyle={{ color: 'var(--primary)' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="var(--primary)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
