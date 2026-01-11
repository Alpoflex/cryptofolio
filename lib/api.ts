import axios from 'axios';
import { Coin, ChartData } from '@/types';

const API_BASE = 'https://api.coingecko.com/api/v3';

export const coinGeckoApi = {
    // Get trending/popular coins
    async getCoins(): Promise<Coin[]> {
        try {
            const response = await axios.get(`${API_BASE}/coins/markets`, {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 50,
                    page: 1,
                    sparkline: false,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching coins:', error);
            return [];
        }
    },

    // Search coins
    async searchCoins(query: string): Promise<Coin[]> {
        try {
            const allCoins = await this.getCoins();
            return allCoins.filter(
                (coin) =>
                    coin.name.toLowerCase().includes(query.toLowerCase()) ||
                    coin.symbol.toLowerCase().includes(query.toLowerCase())
            );
        } catch (error) {
            console.error('Error searching coins:', error);
            return [];
        }
    },

    // Get coin chart data
    async getCoinChart(coinId: string, days: number = 7): Promise<ChartData[]> {
        try {
            const response = await axios.get(`${API_BASE}/coins/${coinId}/market_chart`, {
                params: {
                    vs_currency: 'usd',
                    days,
                },
            });

            return response.data.prices.map((item: [number, number]) => ({
                time: new Date(item[0]).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                }),
                price: item[1],
            }));
        } catch (error) {
            console.error('Error fetching chart data:', error);
            return [];
        }
    },
};
